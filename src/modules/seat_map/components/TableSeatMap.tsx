import { IconButton } from "@mui/material";
import { SeatMapData } from "../types/SeatMapData";
import { Delete, Mode } from "@mui/icons-material";

interface TableSeatMapProps {
    headers: string[];
    data: SeatMapData[];
    onEdit: (seatMap: SeatMapData) => void;
    onDelete: (id: number) => void;
}
const TableSeatMap: React.FC<TableSeatMapProps> = ({ headers, data, onEdit, onDelete }) => {
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
                    data.map((seatMap, index) => (
                        <tr key={seatMap.id}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{seatMap.seatMapName}</td>
                            <td className="border border-gray-300 px-4 py-2">{seatMap.floor} tầng</td>

                            <td className="border border-gray-300 px-4 py-2">
                                <IconButton color="info" aria-label="Edit" title="Chỉnh sửa thông tin" onClick={() => onEdit(seatMap)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="error" aria-label="Delete" title="Xóa sơ đồ ghế" onClick={() => onDelete(seatMap.id)}>
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
export default TableSeatMap;