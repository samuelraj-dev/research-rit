import { axiosInstance } from "../utils/axiosInstance";

export const createUserResearchPaperApi = async () => {
    return (await axiosInstance.post("research-papers/research-paper")).data;
};

export const getUserResearchPapersCountByTypeApi = async () => {
    return (await axiosInstance.get("research-papers/research-paper/count-by-type")).data;
};

export const deleteUserResearchPaperApi = async ({ id }) => {
    return (await axiosInstance.delete(`research-papers/research-paper/${id}`)).data;
};

export const getUserResearchPapersByTypeApi = async ({ type }) => {
    return (await axiosInstance.get(`research-papers/research-paper/${type}`)).data;
};

export const getResearchPapersCountByTypeApi = async () => {
    return (await axiosInstance.get("research-papers/count-by-type")).data;
};

export const getResearchPapersByTypeApi = async ({ type }) => {
    return (await axiosInstance.get(`research-papers/${type}`)).data;
};

export const setResearchPaperStatusApi = async ({ id, type }) => {
    return (await axiosInstance.patch(`research-papers/set-status/${id}/${type}`)).data;
};
