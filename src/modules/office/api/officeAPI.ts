import apiClient from "@/config/api";
import { OfficeData } from "../types/OfficeData";

export const getListOfficeByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/office/offices/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getListOfficeDetailByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/office/offices-details/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteOfficeById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/office/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createOffice = async (companyId: number | undefined, data: OfficeData): Promise<OfficeData> => {
    try {
        if (!companyId) {
            throw new Error("Company ID is required.");
        }
        const officeData = { ...data, companyId };
        const response = await apiClient.post('/bms/office/create', officeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateOffice = async (id: number, data: OfficeData): Promise<OfficeData> => {
    try {
        const response = await apiClient.put(`/bms/office/update/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};