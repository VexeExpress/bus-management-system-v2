'use client';
import { Button} from '@mui/material';
import * as React from 'react';
import styles from '@/styles/module/UserPage.module.css';
import { Add } from '@mui/icons-material';
import UserTable from '@/components/v5.1_user/UserTable';
import UserModal from '@/components/v5.1_user/UserModal';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import Toast from '@/lib/toast';
import { changePassUser, createUser, deleteUser, fetchUsers, lockUser, updateUser } from '@/services/user/_v1';
import { AxiosError } from 'axios';


export default function UserPage() {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editUser, setEditUser] = useState<User | null>(null);
    const companyId = Number(sessionStorage.getItem('company_id'));
    const handleOpen = () => setOpen(true);

    const handleAddUser = async (newUserData: User) => {
        try {
            console.log("Data: " + JSON.stringify(newUserData));

            const newUser = await createUser(newUserData);
            Toast.success("Thêm nhân viên thành công");
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    Toast.error("Tên tài khoản đã tồn tại. Vui lòng chọn tên khác.");
                } else if (err.response?.status === 404) {
                    Toast.error("Công ty không tồn tại. Vui lòng kiểm tra lại.");
                } else {
                    const errorMessage = err.response?.data?.message || "Đã xảy ra lỗi không xác định.";
                    console.log(errorMessage);
                    Toast.error(errorMessage);
                }
            } else if (err instanceof Error) {
                console.log(err.message);
                Toast.error("Lỗi: " + err.message);
            } else {
                console.log("Đã xảy ra lỗi không xác định.");
                Toast.error("Đã xảy ra lỗi không xác định.");
            }
        }
    };
    const handleLockUser = async (userId: number) => {
        try {
            const updatedUser = await lockUser(userId);
            setUsers((prevUsers) =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, status: updatedUser.status } : user
                )
            );
            Toast.success('Khóa tài khoản thành công');
        } catch (err) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    }
    const handleChangePass = async (userId: number) => {
        try {
            const updatedUser = await changePassUser(userId);
            setUsers((prevUsers) =>
                prevUsers.map(user =>
                    user.id === userId? {...user, password: updatedUser.password } : user
                )
            );
            Toast.success('Đổi mật khẩu thành công');
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error? err.message : 'Unknown error');
            Toast.error(message);
        }
    }
    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
            Toast.success('Xóa nhân viên thành công');
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    };
    const handleEditUser = (user: User) => {
        setEditUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditUser(null);
    };
    const handleUpdateUser = async (updatedUserData: User) => {
        try {
            await updateUser(updatedUserData);
            setUsers((prevUsers) =>
                prevUsers.map(user => (user.id === updatedUserData.id ? updatedUserData : user))
            );
            Toast.info('Cập nhật thành công');
            handleClose();
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        };
    }
    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchUsers(companyId);
                setUsers(data);
                console.log(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (companyId) {
            loadUsers();
        }
    }, [companyId]);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: 10 }}>
                <h3 style={{ margin: 0 }}>DANH SÁCH NHÂN VIÊN</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm nhân viên
                </Button>
            </div>
            <UserTable users={users} loading={loading} error={error} onDelete={handleDeleteUser} onEdit={handleEditUser} onLock={handleLockUser} onChangePass={handleChangePass}/>
            <UserModal open={open} onClose={handleClose} companyId={companyId} onAddUser={handleAddUser} onUpdateUser={handleUpdateUser} editUser={editUser} />
        </div>

    );
}