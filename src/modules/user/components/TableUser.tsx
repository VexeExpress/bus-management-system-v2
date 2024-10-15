import { IconButton } from "@mui/material";
import { UserData } from "../types/UserData";
import { Delete, Mode, Lock, SyncLock } from "@mui/icons-material";


interface TableUserProps {
    headers: string[];
    data: UserData[];
    onEdit: (user: UserData) => void;
    onDelete: (id: number) => void;
    onLock: (id: number, status: boolean) => Promise<void>;
    onChangePass: (id: number) => Promise<void>;
}
const TableUser: React.FC<TableUserProps> = ({ headers, data, onEdit, onDelete, onLock, onChangePass }) => {
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
                        <td className="border border-gray-300 px-4 py-2">
                            {user.gender === 1 ? 'Nam' : user.gender === 2 ? 'Nữ' : user.gender === 3 ? 'Khác' : 'Không xác định'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            {user.role === 1 ? 'Tài xế' : user.role === 2 ? 'Nhân viên hành chính' : user.role === 3 ? 'Quản trị viên' : 'Không xác định'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{user.status ? 'Kích hoạt' : 'Ngưng kích hoạt'}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <IconButton color="success" title="Đặt lại mật khẩu mặc định '12345678'" onClick={() => onChangePass(user.id)}>
                                <SyncLock />
                            </IconButton>
                            <IconButton color="warning" title="Khóa tài khoản" onClick={() => onLock(user.id, !user.status)}>
                                <Lock />
                            </IconButton>
                            <IconButton color="info" aria-label="Edit office" title="Chỉnh sửa thông tin" onClick={() => onEdit(user)}>
                                <Mode />
                            </IconButton>
                            <IconButton color="error" aria-label="Delete office" title="Xóa nhân viên" onClick={() => onDelete(user.id)}>
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