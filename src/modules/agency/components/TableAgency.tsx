import { IconButton } from "@mui/material";
import { AgencyData } from "../types/AgencyData";
import { Delete, Mode } from "@mui/icons-material";

interface TableAgencyProps {
    headers: string[];
    data: AgencyData[];
    onEdit: (vehicle: AgencyData) => void;
    onDelete: (id: number) => void;
}
const TableAgency: React.FC<TableAgencyProps> = ({ headers, data, onEdit, onDelete }) => {
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
                            <td className="border border-gray-300 px-4 py-2">
                                
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                
                            </td>


                            <td className="border border-gray-300 px-4 py-2">
                                <IconButton color="info" aria-label="Edit" title="Chỉnh sửa thông tin" onClick={() => onEdit(levelAgency)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="error" aria-label="Delete" title="Xóa đại lý" onClick={() => onDelete(levelAgency.id)}>
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
export default TableAgency;