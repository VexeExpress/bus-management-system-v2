import apiClient from "@/config/api";

export const getListOfficeByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/office/offices/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};