import { Route } from "@/types/Route";
import apiClient from "../api";
export const createRoute = async (routeData: Route) => {
    try {
        const response = await apiClient.post('/bms/router/create-router', routeData);
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
                    throw new Error('Thêm tuyến thất bại.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
}
export const fetchRouter = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/router/get-router/${companyId}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 404:
                    throw new Error('Công ty không tồn tại.');
                case 500:
                    throw new Error('Lỗi hệ thống, vui lòng thử lại sau.');
                default:
                    throw new Error('Lỗi hệ thống.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
}
export const fetchActiveRouters = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/router/get-router-active/${companyId}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 404:
                    throw new Error('Công ty không tồn tại.');
                case 500:
                    throw new Error('Lỗi hệ thống, vui lòng thử lại sau.');
                default:
                    throw new Error('Lỗi hệ thống.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
}

export const deleteRouter = async (routerId: number) => {
    try {
        const response = await apiClient.delete(`/bms/router/delete-router/${routerId}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 404:
                    throw new Error('Tuyến không tồn tại.');
                case 500:
                    throw new Error('Lỗi hệ thống, vui lòng thử lại sau.');
                default:
                    throw new Error('Xóa tuyến thất bại.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
};
export const updatedRouter = async (updatedData: { id: any }) => {
    try {
        const response = await apiClient.put(`/bms/router/update-router/${updatedData.id}`, updatedData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 400:
                    throw new Error('Dữ liệu không hợp lệ.');
                case 404:
                    throw new Error('Tuyến không tồn tại.');
                case 500:
                    throw new Error('Lỗi hệ thống, vui lòng thử lại sau.');
                default:
                    throw new Error('Cập nhật tuyến thất bại.');
            }
        } else {
            throw new Error('Lỗi hệ thống.');
        }
    }
}
