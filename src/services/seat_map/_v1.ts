import { SeatMapData } from "@/types/SeatMap";
import apiClient from "../api";


export const createSeatMap = async (seatMapData: SeatMapData) => {
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
export const fetchSeatMap = async (companyId: number) => {
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
export const fetchListSeatMapName = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/seat-map/seat-maps-name/${companyId}`);
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
const handleError = (error: any): never => {
    let errorMessage = 'Lỗi hệ thống.';

    if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
            case 404:
                errorMessage = 'Dữ liệu không tồn tại.';
                break;
            case 500:
                errorMessage = 'Lỗi máy chủ, vui lòng thử lại sau.';
                break;
            default:
                errorMessage = 'Yêu cầu thất bại.';
                break;
        }
    } else if (error.request) {
        errorMessage = 'Không thể kết nối tới máy chủ, vui lòng kiểm tra kết nối mạng.';
    }

    throw new Error(errorMessage);
};

export const fetchSeatMapById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/seat-map/seat-map-by-id/${id}`);
        return response.data;
    } catch (error: any) {
        handleError(error);
    }
};

export const fetchSeatMapId = async (tripId: number): Promise<number> => {
    try {
        const response = await apiClient.get(`/bms/seat-map/seat-map-id-by-trip-id/${tripId}`);
        return response.data;
    } catch (error: any) {
        handleError(error);
        throw new Error('Unreachable');
    }
};
