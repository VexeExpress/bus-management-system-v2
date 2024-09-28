import axios from "axios";
import apiClient from "../api";
import { Office } from "@/types/Office";
export const createOffice = async (data: Office) => {
    try {
        const response = await apiClient.post('/bms/office/create-office', data); 
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.status);

            // Thông báo lỗi dựa trên mã trạng thái
            switch (error.response?.status) {
                case 400:
                    throw new Error('Yêu cầu không hợp lệ. Vui lòng kiểm tra các trường dữ liệu.');
                case 404:
                    throw new Error('Công ty không tồn tại.');
                case 409:
                    throw new Error('Văn phòng đã tồn tại.');
                case 500:
                    throw new Error('Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.');
                default:
                    throw new Error(`Lỗi không xác định: ${error.response?.status}`);
            }
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Lỗi không xác định');
        }
    }
};

// services/officeService.ts
export const fetchOffices = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/office/offices/${companyId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw new Error(error.response?.data?.message || 'Lỗi không xác định');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Lỗi không xác định');
        }
    }
};
