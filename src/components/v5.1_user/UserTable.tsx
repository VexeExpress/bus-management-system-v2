'use client';

import { User } from "@/types/User";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from '@/styles/module/UserPage.module.css';
import LoadingIndicator from "@/lib/loading";
import { Delete, Mode, SyncLock, Lock } from "@mui/icons-material";
const UserTable: React.FC<{
    users: User[];
    loading: boolean;
    error: string | null;
    onDelete: (id: number) => void;
    onEdit: (office: User) => void;
    onLock: (id: number) => void;
    onChangePass: (id: number) => void;
}> = ({ users, loading, error, onDelete, onEdit, onLock, onChangePass }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
            onDelete(id);
        }
    };
    const handleLock = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn khóa tài khoản này?')) {
            onLock(id);
        }
    };
    const changePass = (id: number) => {
        if (window.confirm('Đặt lại mật khẩu mặc định: 12345678')) {
            onChangePass(id);
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell ><span className={styles.tileTable}>STT</span></TableCell>
                        <TableCell ><span className={styles.tileTable}>Tên nhân viên</span></TableCell>
                        <TableCell ><span className={styles.tileTable}>Số điện thoại</span></TableCell>
                        <TableCell ><span className={styles.tileTable}>Giới tính</span></TableCell>
                        <TableCell ><span className={styles.tileTable}>Tài khoản</span></TableCell>
                        <TableCell ><span className={styles.tileTable}>Chức vụ</span></TableCell>
                        <TableCell ><span className={styles.tileTable}>Trạng thái</span></TableCell>
                        <TableCell ><span className={styles.tileTable}>Tùy chọn</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={8}><LoadingIndicator /></TableCell></TableRow>}
                    {error && <TableRow><TableCell colSpan={8}>Error: {error}</TableCell></TableRow>}
                    {!loading && !error && users.map((user, index) => (
                        <TableRow

                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{index + 1}</TableCell>

                            <TableCell >{user.name}</TableCell>
                            <TableCell >{user.phone}</TableCell>
                            <TableCell>{user.gender === 1 ? 'Nam' : 'Nữ'}</TableCell>
                            <TableCell >{user.username}</TableCell>
                            <TableCell>
                                {user.role === 1
                                    ? 'Tài xế'
                                    : user.role === 2
                                        ? 'Nhân viên hành chính'
                                        : user.role === 3
                                            ? 'Quản trị viên'
                                            : 'Vai trò không xác định'}
                            </TableCell>

                            <TableCell>{user.status ? 'Hoạt động' : 'Ngưng hoạt động'}</TableCell>
                            <TableCell >
                                <IconButton color="success" title="Đặt lại mật khẩu mặc định '12345678'" onClick={() => changePass(user.id)}>
                                    <SyncLock  />
                                </IconButton>
                                
                                <IconButton color="info" title="Chỉnh sửa" onClick={() => onEdit(user)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="warning" title="Khóa tài khoản" onClick={() => handleLock(user.id)}>
                                    <Lock   />
                                </IconButton>
                                <IconButton color="error" title="Xóa" onClick={() => handleDelete(user.id)}>
                                    <Delete />
                                </IconButton>

                            </TableCell>
                        </TableRow>
                    ))}


                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default UserTable;