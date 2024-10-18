import apiClient from "@/config/api";
import { RouteData } from "../types/RouteData";

export const getListRouteDetailByCompanyId = async (companyId: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/bms/router/list-router/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createRoute = async (companyId: number | undefined, data: RouteData): Promise<RouteData> => {
    try {
        if (!companyId) {
            throw new Error("Company ID is required.");
        }
        const routeData = { ...data, companyId };
        const response = await apiClient.post('/bms/router/create', routeData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateRoute = async (id: number, data: RouteData, companyId: number | undefined): Promise<RouteData> => {
    try {
        const routeData = { ...data, companyId };
        const response = await apiClient.put(`/bms/router/update/${id}`, routeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteRouteById = async (id: number): Promise<any> => {
    try {
        const response = await apiClient.delete(`/bms/router/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};