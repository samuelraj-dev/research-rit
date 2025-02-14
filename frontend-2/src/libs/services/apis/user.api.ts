import { axiosInstance } from "@/libs/utils/axios";

export const getUserDataApi = async () => {
    return (await axiosInstance.get("users/user/data")).data;
};

export const getAllUsersApi = async () => {
    return (await axiosInstance.get("users")).data;
};

export const createUserApi = async (data: any) => {
    return (await axiosInstance.post("users", data)).data;
};