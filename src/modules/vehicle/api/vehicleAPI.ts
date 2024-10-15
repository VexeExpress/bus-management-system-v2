import apiClient from "@/config/api";
import { VehicleData } from "../types/VehicleData";

export const getListVehicleDetailByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/vehicle/vehicles/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createVehicle = async (companyId: number | undefined, data: VehicleData): Promise<VehicleData> => {
    try {
        if (!companyId) {
            throw new Error("Company ID is required.");
        }
        const vehicleData = { ...data, companyId };
        const response = await apiClient.post('/bms/vehicle/create', vehicleData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateVehicle = async (id: number, data: VehicleData, companyId: number | undefined): Promise<VehicleData> => {
    try {
        const vehicleData = { ...data, companyId };
        const response = await apiClient.put(`/bms/vehicle/update/${id}`, vehicleData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteVehicleById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/vehicle/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};