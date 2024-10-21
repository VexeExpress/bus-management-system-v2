import apiClient from "@/config/api";
export const fetchTicketData = async (tripId: number): Promise<number> => {
    try {
        const response = await apiClient.get(`/bms/ticket/get-ticket-data/${tripId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
