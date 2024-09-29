import apiClient from "../api";

export const fetchCompanyIdByUserId = async (userId: number) => {
    try {
        const response = await apiClient.get(`/bms/user/getCompanyIdByUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching company ID:", error);
        throw error;
    }
};
export const fetchNameUserById = async (userId: number) => {
    try {
        const response = await apiClient.get(`/bms/user/get-name-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching name user:", error);
        throw error;
    }
}