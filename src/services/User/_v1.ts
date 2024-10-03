import { User } from "@/types/User";
import apiClient from "../api";
import { AxiosError } from "axios";

export const fetchCompanyIdByUserId = async (userId: number) => {
    try {
        const response = await apiClient.get(`/bms/user/getCompanyIdByUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching company ID:", error);
        throw error;
    }
};
export const fetchNameUserById = async (userId: number) => {
    try {
        const response = await apiClient.get(`/bms/user/get-name-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching name user:", error);
        throw error;
    }
}
export const createUser = async (userData: User) => {
    try {
        const response = await apiClient.post('/bms/user/create-user', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const fetchUsers = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/user/get-users/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteUser = async (userId: number) => {
    try {
        const response = await apiClient.delete(`/bms/user/delete/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateUser = async (updatedUserData: { id: any; }) => {
    try {
        const response = await apiClient.put(`/bms/user/update-user/${updatedUserData.id}`, updatedUserData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 400:
                    throw new Error('Dữ liệu không hợp lệ.');
                case 404:
                    throw new Error('Công ty không tồn tại.');
                case 409:
                    throw new Error('Tên tài khoản đã tồn tại.');
                case 500:
                    throw new Error('Lỗi máy chủ, vui lòng thử lại sau.');
                default:
                    throw new Error('Cập nhật thất bại.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
}
export const lockUser = async (userId: number) => {
    try {
        const response = await apiClient.post(`/bms/user/lock-user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const changePassUser = async (userId: number) => {
    try {
        const response = await apiClient.post(`/bms/user/change-pass-user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const fetchListNameUser = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/user/get-list-name-user/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

