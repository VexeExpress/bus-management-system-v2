import apiClient from "../api";

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
export const fetchTicketData = async (tripId: number): Promise<number> => {
    try {
        const response = await apiClient.get(`/bms/ticket/get-ticket-data/${tripId}`);
        return response.data;
    } catch (error: any) {
        handleError(error);
        throw new Error('Unreachable');
    }
};
