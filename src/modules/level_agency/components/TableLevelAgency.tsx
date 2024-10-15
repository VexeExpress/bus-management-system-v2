import { Delete, Mode } from "@mui/icons-material";
import { LevelAgencyData } from "../types/LevelAgencyData";
import { IconButton } from "@mui/material";

interface TableLevelAgencyProps {
    headers: string[];
    data: LevelAgencyData[];
    onEdit: (vehicle: LevelAgencyData) => void;
    onDelete: (id: number) => void;
}
const TableLevelAgency: React.FC<TableLevelAgencyProps> = ({ headers, data, onEdit, onDelete }) => {
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
                    data.map((levelAgency, index) => (
                        <tr key={levelAgency.id}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{levelAgency.levelName}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(levelAgency.quota)}
                            </td>


                            <td className="border border-gray-300 px-4 py-2">
                                <IconButton color="info" aria-label="Edit" title="Chỉnh sửa thông tin" onClick={() => onEdit(levelAgency)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="error" aria-label="Delete" title="Xóa cấp đại lý" onClick={() => onDelete(levelAgency.id)}>
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
export default TableLevelAgency;