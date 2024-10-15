'use client';
import { Button } from '@mui/material';
import * as React from 'react';
import { Add } from '@mui/icons-material';
import TableUser from '@/modules/user/components/TableUser';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { UserData } from '@/modules/user/types/UserData';
import { useState } from 'react';
import LoadingIndicator from '@/lib/loading';
import useUsers from '@/modules/user/hook/useUsers';
import { useDeleteUser } from '@/modules/user/hook/useDeleteUser';
import ModalUser from '@/modules/user/components/ModalUser';
import useManageUsers from '@/modules/user/hook/useManageUsers';
import useLockUser from '@/modules/user/hook/useLockUser';
import useChangePassword from '@/modules/user/hook/useChangePassword ';




export default function UserPage() {
    const headers = ['STT', 'Tên nhân viên', 'Điện thoại', 'Giới tính', 'Tài khoản', 'Chức vụ', 'Trạng thái', 'Tùy chọn'];
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [initialData, setInitialData] = useState<UserData | null>(null);
    const [open, setOpen] = useState(false);
    const { users, loading, error, setUsers } = useUsers(companyId);
    const { handleSubmit } = useManageUsers();
    const { handleLockUser } = useLockUser();

    const handleOpen = () => {
        setInitialData(null);
        setOpen(true);
    };
    const handleEdit = (user: UserData) => {
        setInitialData(user);
        setOpen(true);
    };
    const { handleDeleteUser } = useDeleteUser();
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
            const success = await handleDeleteUser(id);
            if (success) {
                setUsers((prevData) => prevData.filter(user => user.id !== id));
            }
        }
    };
    const handleFormSubmit = async (data: UserData) => {
        await handleSubmit(data, initialData ?? undefined, (user: UserData) => {
            if (initialData) {
                setUsers((prevData) =>
                    prevData.map((o) => (o.id === user.id ? user : o))
                );
            } else {
                setUsers((prevData) => [...prevData, user]);
            }
        });
    };
    const handleLock = async (id: number, status: boolean) => {
        await handleLockUser({ id, status }, undefined, (updatedUser: UserData) => {
            setUsers((prevData) =>
                prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
            );
        });
    };
    const { handleChangePassword } = useChangePassword();
    if (loading) return <><LoadingIndicator /></>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2 p-2">
                <span className="m-0 font-rounded font-semibold text-[20px]">DANH SÁCH NHÂN VIÊN</span>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm nhân viên
                </Button>
            </div>
            <TableUser headers={headers} data={users} onEdit={handleEdit} onDelete={handleDelete} onLock={handleLock} onChangePass={handleChangePassword}/>
            <ModalUser open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} initialData={initialData} />
        </div>

    );
}