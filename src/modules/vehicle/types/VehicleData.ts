export interface VehicleData {
    id: number;
    licensePlate: string; // Biển số xe
    phone: string; // Số điện thoại xe
    brand: string; // Hãng xe
    color: string; // Màu xe
    category: number; // Loại xe
    chassisNumber: string; // Số khung
    machineNumber: string; // Số máy
    registrationDeadline: Date; // Hạn đăng kiểm
    insuranceTerm: Date; // Hạn bảo hiểm
    companyId: number; //
}