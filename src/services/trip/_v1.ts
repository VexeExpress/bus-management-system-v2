import { Trip } from "@/types/Trip";
import apiClient from "../api";

export const createTrip = async (tripData: Trip) => {
    try {
        const response = await apiClient.post('/bms/trip/create-trip', tripData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data || 'Tạo chuyến đi thất bại');
    }
}