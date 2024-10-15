import apiClient from "@/config/api";
import { AgencyData } from "../types/AgencyData";

export const getListAgencyDetailByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/agency/list-agency/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createAgency = async (companyId: number | undefined, data: AgencyData): Promise<AgencyData> => {
    try {
        if (!companyId) {
            throw new Error("Company ID is required.");
        }
        const agencyData = { ...data, companyId };
        const response = await apiClient.post('/bms/agency/create', agencyData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateAgency = async (id: number, data: AgencyData, companyId: number | undefined): Promise<AgencyData> => {
    try {
        const agencyData = { ...data, companyId };
        const response = await apiClient.put(`/bms/agency/update/${id}`, agencyData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteAgencyById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/agency/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};