import { LevelAgency } from "@/types/LevelAgency";
import apiClient from "../api";

export const createLevelAgency = async (newData: LevelAgency): Promise<LevelAgency> => {
    console.log('Sending data:', newData);
    try {
        const response = await apiClient.post('/bms/level-agency/create', newData)
        return response.data;
    } catch (error) {
        console.error('Error creating level agency:', error);
        throw error;
    }
}
export const fetchLevelAgency = async (companyId: number): Promise<LevelAgency[]> => {
    console.log('Fetching data for company ID:', companyId);
    try {
        const response = await apiClient.get(`/bms/level-agency/get-list-level-agency/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching level agency:', error);
        throw error;
    }
}
export const updateLevelAgency = async (updatedData: LevelAgency): Promise<LevelAgency> => {
    console.log('Updating level agency:', updatedData);
    try {
        const response = await apiClient.put(`/bms/level-agency/update/${updatedData.id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating level agency:', error);
        throw error;
    }
};
export const deleteLevelAgency = async (levelAgencyId: number): Promise<void> => {
    console.log('Deleting level agency with ID:', levelAgencyId);
    try {
        await apiClient.delete(`/bms/level-agency/delete/${levelAgencyId}`);
    } catch (error) {
        console.error('Error deleting level agency:', error);
        throw error;
    }
};