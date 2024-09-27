import apiClient from "../api";

// Hàm đăng nhập
export const login = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/bms/auth/login', { username, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data || 'Đăng nhập thất bại');
    }
};