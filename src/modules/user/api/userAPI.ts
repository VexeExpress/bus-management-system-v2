import apiClient from "@/config/api";
import { UserData } from "../types/UserData";

export const getListUserByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/user/users/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteUserById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/user/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createUser = async (companyId: number | undefined, data: UserData): Promise<UserData> => {
    try {
        if (!companyId) {
            throw new Error("Company ID is required.");
        }
        const userData = { ...data, companyId };
        const response = await apiClient.post('/bms/user/create', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateUser = async (id: number, data: UserData, companyId: number | undefined): Promise<UserData> => {
    try {
        const userData = { ...data, companyId };
        const response = await apiClient.put(`/bms/user/update/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const lockUser = async (userId: number): Promise<any>  => {
    try {
        const response = await apiClient.post(`/bms/user/lock-user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const changePassUser = async (userId: number): Promise<any> => {
    try {
        const response = await apiClient.post(`/bms/user/change-pass-user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}