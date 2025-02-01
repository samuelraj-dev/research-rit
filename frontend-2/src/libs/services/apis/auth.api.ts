import { axiosInstance } from "@/libs/utils/axios";

export const checkUserActivationApi = async ({ workEmail }: { workEmail: string }) => {
    return (await axiosInstance.post("users/check-activation", { workEmail })).data;
};

export const checkUserOtpApi = async ({ workEmail, otp }: { workEmail: string, otp: string }) => {
    return (await axiosInstance.post("users/check-otp", { workEmail, otp })).data;
};

export const setUserPasswordApi = async ({ workEmail, password }: { workEmail: string, password: string }) => {
    return (await axiosInstance.post("users/activate", { workEmail, password })).data;
};

export const loginUserApi = async ({ workEmail, password }: { workEmail: string, password: string }) => {
    return (await axiosInstance.post("users/login", { workEmail, password })).data;
};

export const logoutUserApi = async () => {
    return (await axiosInstance.delete("users/logout")).data;
};
