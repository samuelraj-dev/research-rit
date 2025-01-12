import { CreateUserBody, LoginBody } from "./users.schemas";
import { SYSTEM_ROLES } from "../../config/permissions";
import { getRoleByName } from "../roles/roles.services";
import { activateUser, createUser, getUserByEmail, getUserByEmailAndApplication, getUsersByApplication, getUsersCountByDept, setUserVerification, sendUserOtp } from "./users.services";
import { Request, Response } from "express";
import argon2 from "argon2";

export async function createUserHandler(
    request: Request<{}, {}, CreateUserBody>,
    response: Response
) {

    if (!request.session.user || !request.session.user.applicationId) {
        response.status(401).json({
            error: "unauthorized"
        })
        return
    }

    const { ...data } = request.body;
    const applicationId = request.session.user?.applicationId

    const role = await getRoleByName({
        name: SYSTEM_ROLES.FACULTY,
        applicationId
    })

    if (!role) {
        response.status(404).json({
            message: "role not found",
        });
        return;
    }

    try {
        const user = await createUser({ data, applicationId, roleId: role.id });
        response.status(201).json({ user });
    } catch (error) {
        response.status(500).json({ error });
    }
}

export async function getUsersHandler(
    request: Request,
    response: Response
) {

    if (!request.session.user) {
        response.status(401).json({
            error: "unauthorized"
        })
        return
    }

    const { applicationId, roleId } = request.session.user

    try {
        const users = await getUsersByApplication({ applicationId, roleId  });
        response.status(200).json({ users });
    } catch (error) {
        response.status(500).json({ error });
    }
}

export async function getUsersCountByDeptHandler(
    request: Request,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    const { applicationId, roleId } = request.session.user

    try {
        const result = await getUsersCountByDept({ applicationId, roleId  });

        response.status(200).json({
            usersCount: result
        })

    } catch (error) {
        response.status(500).json({ error });
    }
}


export async function getUserDataHandler(
    request: Request,
    response: Response
) {

    const data = request.body;

    if (!request.session.user) {
        response.status(403).json({
            error: "unauthorized"
        })
        return
    }

    const result = await getUserByEmailAndApplication({
        workEmail: request.session.user.workEmail,
        applicationId: request.session.user.applicationId,
    })

    if (!result) {
        response.status(404).json({
            message: "user not found",
        });
        return;
    }

    response.status(200).json({
        ...result.user,
        permissions: result.role?.permissions,
        password: null,
        activationStatus: null,
    })
}

export async function checkActivationHandler(
    request: Request<{}, {}, LoginBody>,
    response: Response
) {

    const { workEmail } = request.body;

    const data = await getUserByEmail({ workEmail });

    if (!data) {
        response.status(400).json({
            message: "Invalid email or password",
        });
        return;
    }

    if (!data.user) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (!data.role) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (data.user.activationStatus && data.user.verificationStatus) {
        response.status(200).json({
            message: "ACTIVATED"
        })
        return;
    }

    const sendOtpResult = await sendUserOtp({ workEmail, fullName: data.user?.fullName ? data.user.fullName : null })

    if (!sendOtpResult) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    response.status(200).json({
        message: "OTP_SENT"
    })
    return;
}

export async function checkOtpHandler(
    request: Request<{}, {}, { workEmail: string, otp: string }>,
    response: Response
) {

    const { workEmail, otp } = request.body;

    const data = await getUserByEmail({ workEmail });

    if (!data) {
        response.status(400).json({
            message: "Invalid email or password",
        });
        return;
    }

    if (!data.user) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (!data.role) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (data.user.activationStatus || data.user.password) {
        response.status(400).json({
            message: "Invalid access"
        })
        return;
    }

    if (!data.user.verificationCodeExpiration || !data.user.verificationCode) {
        response.status(400).json({
            message: "Invalid access"
        })
        return;
    }

    const expiration = new Date(data.user.verificationCodeExpiration)
    const now = new Date()
    const isExpired = expiration < now;

    if (isExpired) {
        response.status(400).json({
            message: "Invalid access"
        })
        return;
    }
    
    if (data.user.verificationCode == otp) {
        const setVerificationResult = await setUserVerification({ workEmail });
        if (!setVerificationResult) {
            response.status(500).json({
                error: "internal server error"
            })
            return;
        }
        response.status(200).json({
            message: "OTP_VERIFIED"
        })
        return
    }

    response.status(500).json({
        error: "internal server error"
    })
}

export async function activateHandler(
    request: Request<{}, {}, LoginBody>,
    response: Response
) {

    const { workEmail, password } = request.body;

    const data = await getUserByEmail({ workEmail });

    if (!data) {
        response.status(400).json({
            message: "Invalid email or password",
        });
        return;
    }

    if (!data.user) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (!data.role) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (data.user.activationStatus || data.user.password) {
        response.status(400).json({
            message: "Invalid email or password"
        })
        return;
    }

    if (!data.user.verificationStatus) {
        response.status(400).json({
            message: "Invalid email or password"
        })
        return;
    }

    if (!data.user.verificationCodeExpiration || !data.user.verificationCode) {
        response.status(400).json({
            message: "Invalid access"
        })
        return;
    }

    const expiration = new Date(data.user.verificationCodeExpiration)
    const now = new Date()
    const isExpired = expiration < now;

    if (isExpired) {
        response.status(400).json({
            message: "Invalid access"
        })
        return;
    }

    const result = await activateUser({ workEmail, password });

    if (result != true) {
        response.status(500).json({
            error: "Internal Server Error"
        });
        return;
    }

    response.status(200).json({
        message: "ACTIVATED"
    })
}

export async function loginHandler(
    request: Request<{}, {}, LoginBody>,
    response: Response
) {
    const { workEmail, password } = request.body;

    const data = await getUserByEmail({ workEmail });

    if (!data) {
        response.status(400).json({
            message: "Invalid email or password",
        });
        return;
    }

    if (!data.user) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (!data.role) {
        response.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    if (!data.user.activationStatus || !data.user.verificationStatus || !data.user.password || data.user.verificationCode || data.user.verificationCodeExpiration) {
        response.status(400).json({
            message: "Invalid email or password"
        })
        return;
    }

    const isPasswordValid = await argon2.verify(data.user.password, password)

    if (!isPasswordValid) {
        response.status(400).json({
            message: "Invalid email or password"
        })
        return;
    }

    request.session.user = {
        id: data.user.id,
        workEmail: data.user.workEmail,
        applicationId: data.user.applicationId,
        roleId: data.user.roleId,
        role: data.role.name,
        permissions: data.role?.permissions ? data.role?.permissions : [],
    };

    response.status(200).json({session: request.session.user});
}