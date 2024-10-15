import apiClient from "@/config/api";
import { LevelAgencyData } from "../types/LevelAgencyData";
export const getListLevelAgencyDetailByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/level-agency/list-level-agency/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createLevelAgency = async (companyId: number | undefined, data: LevelAgencyData): Promise<LevelAgencyData> => {
    try {
        if (!companyId) {
            throw new Error("Company ID is required.");
        }
        const levelAgencyData = { ...data, companyId };
        const response = await apiClient.post('/bms/level-agency/create', levelAgencyData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateLevelAgency = async (id: number, data: LevelAgencyData, companyId: number | undefined): Promise<LevelAgencyData> => {
    try {
        const levelAgencyData = { ...data, companyId };
        const response = await apiClient.put(`/bms/level-agency/update/${id}`, levelAgencyData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteLevelAgencyById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/level-agency/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};