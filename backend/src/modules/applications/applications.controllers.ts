import { CreateApplicationBody } from "./applications.schemas";
import { createApplication, getApplications } from "./applications.services";
import { createRole } from "../roles/roles.services";
import { FACULTY_PERMISSIONS, HOD_PERMISSIONS, SUPER_ADMIN_PERMISSIONS, SYSTEM_ROLES } from "../../config/permissions";
import { Request, Response } from "express";
import { createSuperAdminUser } from "../users/users.services";

export async function createApplicationHandler(
    request: Request<{}, {}, CreateApplicationBody>,
    response: Response
) {
    const { name, workEmail } = request.body;

    if (!name || !workEmail) {
        response.status(400).json({ error: "invalid access" });
    }

    const application = await createApplication({
        name,
    });

    const superAdminRole = await createRole({
        name: SYSTEM_ROLES.SUPER_ADMIN,
        applicationId: application.id,
        permissions: SUPER_ADMIN_PERMISSIONS,
    });

    const hodRole = await createRole({
        name: SYSTEM_ROLES.HOD,
        applicationId: application.id,
        permissions: HOD_PERMISSIONS,
    });

    const facultyRole = await createRole({
        name: SYSTEM_ROLES.FACULTY,
        applicationId: application.id,
        permissions: FACULTY_PERMISSIONS,
    });

    const superAdminUser = await createSuperAdminUser({
        applicationId: application.id,
        roleId: superAdminRole.id,
        workEmail,
    })

    // const [superAdminRole, applicationUserRole] = await Promise.allSettled([
    //     superAdminRolePromise,
    //     applicationUserRolePromise,
    // ])

    // if (superAdminRole.status == "rejected") throw new Error("Error creating super admin role");
    // if (applicationUserRole.status == "rejected") throw new Error("Error creating application user role");

    response.status(201).json({
        application,
        superAdminRole,
        hodRole,
        facultyRole,
    });
}

export async function getApplicationsHandler(request: Request, response: Response) {
    response.status(200).json({ applications: await getApplications() });
}