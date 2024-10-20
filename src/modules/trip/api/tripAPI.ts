import apiClient from "@/config/api";
import { TripData } from "../types/TripData";

export const createTrip = async (tripData: TripData): Promise<TripData> => {
    try {
        const response = await apiClient.post('/bms/trip/create-trip', tripData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getListTrip = async (companyId: number, dateTrip: string, routerId: number): Promise<any> => {
    try {
        const response = await apiClient.get('/bms/trip/search', {
            params: {
                companyId,
                dateTrip,
                routerId
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const fetchTripDetails = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/trip/detail/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};