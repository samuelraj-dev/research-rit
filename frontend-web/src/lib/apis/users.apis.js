import { axiosInstance } from "../utils/axiosInstance";

export const createUserApi = async () => {
    return (await axiosInstance.post("users")).data;
};

export const getUsersApi = async () => {
    return (await axiosInstance.get("users")).data;
}

export const checkUserActivationApi = async () => {
    return (await axiosInstance.post("users/check-activation")).data
}

export const checkUserOtpApi = async () => {
    return (await axiosInstance.post("users/check-otp")).data
}

export const activateUserApi = async () => {
    return (await axiosInstance.post("users/activate")).data
}

export const loginUserApi = async () => {
    return (await axiosInstance.post("users/login")).data
}

export const logoutUserApi = async () => {
    return (await axiosInstance.delete("users/logout")).data
}

export const getUsersCountByDeptApi = async () => {
    return (await axiosInstance.get("users/count-by-dept")).data
}

export const getUserDataApi = async () => {
    return (await axiosInstance.get("users/data")).data
}