import { axiosInstance } from "@/libs/utils/axios";

export const getUserDataApi = async () => {
    return (await axiosInstance.get("users/user/data")).data;
};

export const getAllUsersApi = async () => {
    return (await axiosInstance.get("users")).data;
};