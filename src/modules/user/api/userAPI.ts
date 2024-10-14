import apiClient from "@/config/api";

export const getListUserByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/user/users/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteUserById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/user/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};