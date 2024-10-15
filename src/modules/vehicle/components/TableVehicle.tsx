import { IconButton } from "@mui/material";
import { VehicleData } from "../types/VehicleData";
import { Delete, Mode } from "@mui/icons-material";
import dayjs from "dayjs";

interface TableVehicleProps {
    headers: string[];
    data: VehicleData[];
    onEdit: (vehicle: VehicleData) => void;
    onDelete: (id: number) => void;
}
const TableVehicle: React.FC<TableVehicleProps> = ({ headers, data, onEdit, onDelete }) => {
    return (
        <table className="min-w-full ">
            <thead>
                <tr className="bg-gray-200">
                    {headers.map((header, index) => (
                        <th key={index} className="border border-gray-300 px-4 py-2 text-left">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((vehicle, index) => (
                        <tr key={vehicle.id}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.licensePlate}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {vehicle.category === 1 ? 'Ghế ngồi' : vehicle.category === 2 ? 'Ghế ngồi limousine' : vehicle.category === 3 ? 'Giường nằm' : vehicle.category === 4 ? 'Giường nằm limousine' : vehicle.category === 5 ? 'Phòng VIP (Cabin)' : 'Không xác định'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {vehicle.registrationDeadline && dayjs(vehicle.registrationDeadline).format('DD/MM/YYYY')}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.brand}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.color}</td>

                            <td className="border border-gray-300 px-4 py-2">
                                <IconButton color="info" aria-label="Edit" title="Chỉnh sửa thông tin" onClick={() => onEdit(vehicle)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="error" aria-label="Delete" title="Xóa phương tiện" onClick={() => onDelete(vehicle.id)}>
                                    <Delete />
                                </IconButton>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={headers.length} className="text-center p-4">
                            Không có dữ liệu
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
export default TableVehicle;