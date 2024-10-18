import apiClient from "@/config/api";
import { SeatMapData } from "../types/SeatMapData";

export const getListSeatMapDetailByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/seat-map/list-seat-map/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createSeatMap = async (companyId: number | undefined, data: SeatMapData): Promise<SeatMapData> => {
    try {
        if (!companyId) {
            throw new Error("Company ID is required.");
        }
        const seatMapData = { ...data, companyId };
        const response = await apiClient.post('/bms/seat-map/create', seatMapData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateSeatMap = async (id: number, data: SeatMapData, companyId: number | undefined): Promise<SeatMapData> => {
    try {
        const seatMapData = { ...data, companyId };
        const response = await apiClient.put(`/bms/seat-map/update/${id}`, seatMapData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteSeatMapById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/seat-map/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};