import apiClient from "../api";
export const fetchVehicle = async (companyId: number) => {
    try {
        const response = await apiClient.get(`/bms/vehicle/get-vehicle-by-company-id/${companyId}`);
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