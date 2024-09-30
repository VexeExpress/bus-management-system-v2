import { SeatMapData } from "@/types/SeatMap";
import apiClient from "../api";

export const createSeatMap = async(seatMapData: SeatMapData) => {
    try {
        const response = await apiClient.post('/bms/seat-map/create-seat-map', seatMapData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 400:
                    throw new Error('Dữ liệu không hợp lệ.');
                case 404:
                    throw new Error('Công ty không tồn tại.');
                case 500:
                    throw new Error('Lỗi máy chủ, vui lòng thử lại sau.');
                default:
                    throw new Error('Tạo sơ đồ ghế thất bại.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
}
export const fetchSeatMap = async(companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/seat-map/seat-maps/${companyId}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 404:
                    throw new Error('Công ty không tồn tại.');
                case 500:
                    throw new Error('Lỗi máy chủ, vui lòng thử lại sau.');
                default:
                    throw new Error('Lấy sơ đồ ghế thất bại.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
}