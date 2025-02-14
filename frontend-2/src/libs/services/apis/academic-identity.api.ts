import { axiosInstance } from "@/libs/utils/axios";

export const getAcademicIdentityApi = async () => {
    return (await axiosInstance.get(`academic-identity`)).data;
};

export const setAcademicIdentityApi = async (data: { scopusId: string, vidhwanId: string, orcidId: string, wosId: string, googleScholarLink: string }) => {
    return (await axiosInstance.post(`academic-identity`, data)).data;
};