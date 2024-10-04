import { Trip, TripItem } from "@/types/Trip";
import apiClient from "../api";


export const createTrip = async (tripData: Trip) => {
    try {
        const response = await apiClient.post('/bms/trip/create-trip', tripData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data || 'Tạo chuyến đi thất bại');
    }
}
export const fetchTrip = async (companyId: number, dateTrip: string, routerId: number): Promise<any> => {
    try {
        const response = await apiClient.get('bms/trip/search', {
            params: {
                companyId,
                dateTrip,
                routerId
            },
        });
        // console.log(response.data)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data || 'Lấy thông tin chuyến thất bại');
    }
};