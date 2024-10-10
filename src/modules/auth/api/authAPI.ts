import apiClient from "@/config/api";

export const login = async (data: { username: string, password: string }) => {
    try {
        const response = await apiClient.post("/bms/auth/login-2", data);
        return response.data;
    } catch (error) {
        throw error;
    }
}