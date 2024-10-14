import { IconButton } from "@mui/material";
import { OfficeData } from "../types/OfficeData";
import { Delete, Mode } from "@mui/icons-material";

interface TableOfficeProps {
    headers: string[];
    data: OfficeData[];
    onEdit: (office: OfficeData) => void;
    onDelete: (id: number) => void;
}
const TableOffice: React.FC<TableOfficeProps> = ({ headers, data, onEdit, onDelete  }) => {
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
                {data.map((office, index) => (
                    <tr key={office.id}>
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{office.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{office.code}</td>
                        <td className="border border-gray-300 px-4 py-2">{office.phone}</td>
                        <td className="border border-gray-300 px-4 py-2">{office.address}</td>
                        <td className="border border-gray-300 px-4 py-2">{office.note}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <IconButton color="info" aria-label="Edit office" onClick={() => onEdit(office)}>
                                <Mode />
                            </IconButton>
                            <IconButton color="error" aria-label="Delete office" onClick={() => onDelete(office.id)}>
                                <Delete />
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default TableOffice;