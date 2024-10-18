import { IconButton } from "@mui/material";
import { AgencyData } from "../types/AgencyData";
import { Delete, Mode } from "@mui/icons-material";
import dayjs from "dayjs";

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
                    data.map((agency, index) => (
                        <tr key={agency.id}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{agency.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{agency.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{agency.address}</td>
                            <td className="border border-gray-300 px-4 py-2">{agency.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{agency.levelAgencyName}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {dayjs(agency.createdAt).format('DD/MM/YYYY')}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{agency.note}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <IconButton color="info" aria-label="Edit" title="Chỉnh sửa thông tin" onClick={() => onEdit(agency)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="error" aria-label="Delete" title="Xóa đại lý" onClick={() => onDelete(agency.id)}>
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