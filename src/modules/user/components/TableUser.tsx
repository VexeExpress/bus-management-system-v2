import { IconButton } from "@mui/material";
import { UserData } from "../types/UserData";
import { Delete, Mode } from "@mui/icons-material";


interface TableUserProps {
    headers: string[];
    data: UserData[];
    onEdit: (user: UserData) => void;
    onDelete: (id: number) => void;
}
const TableUser: React.FC<TableUserProps> = ({ headers, data, onEdit, onDelete  }) => {
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
                {data.map((user, index) => (
                    <tr key={user.id}>
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.gender}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <IconButton color="info" aria-label="Edit office" onClick={() => onEdit(user)}>
                                <Mode />
                            </IconButton>
                            <IconButton color="error" aria-label="Delete office" onClick={() => onDelete(user.id)}>
                                <Delete />
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default TableUser;