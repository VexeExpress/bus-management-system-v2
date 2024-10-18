import { IconButton } from "@mui/material";
import { RouteData } from "../types/RouteData";
import { Delete, Mode } from "@mui/icons-material";

interface TableRouteProps {
    headers: string[];
    data: RouteData[];
    onEdit: (vehicle: RouteData) => void;
    onDelete: (id: number) => void;
}
const TableRoute: React.FC<TableRouteProps> = ({ headers, data, onEdit, onDelete }) => {
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
                    data.map((route, index) => (
                        <tr key={route.id}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{route.routeName}</td>
                            <td className="border border-gray-300 px-4 py-2">{route.routeNameShort}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(route.displayPrice)}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{route.note}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {route.status ? 'Kích hoạt' : 'Ngưng kích hoạt'}
                            </td>


                            <td className="border border-gray-300 px-4 py-2">
                                <IconButton color="info" aria-label="Edit" title="Chỉnh sửa thông tin" onClick={() => onEdit(route)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="error" aria-label="Delete" title="Xóa tuyến" onClick={() => onDelete(route.id)}>
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
export default TableRoute;