'use client';
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import TableOffice from "@/modules/office/components/TableOffice";
import useOffices from "@/modules/office/hook/useOffices";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoadingIndicator from "@/lib/loading";
import ModalOffice from "@/modules/office/components/ModalOffice";
import { OfficeData } from "@/modules/office/types/OfficeData";
import { useDeleteOffice } from "@/modules/office/hook/useDeleteOffice";
import useManageOffices from "@/modules/office/hook/useManageOffices";


export default function OfficePage() {
    const headers = ['STT', 'Tên văn phòng', 'Mã văn phòng', 'Điện thoại', 'Địa chỉ', 'Ghi chú', 'Tùy chọn'];
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const { offices, loading, error, setOffices } = useOffices(companyId);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<OfficeData | null>(null);
    const { handleSubmit } = useManageOffices();

    const handleOpen = () => {
        setInitialData(null);
        setOpen(true);
    };

    const handleEdit = (office: OfficeData) => {
        setInitialData(office);
        setOpen(true);
    };

    const { handleDeleteOffice } = useDeleteOffice();
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa văn phòng này không?")) {
            const success = await handleDeleteOffice(id);
            if (success) {
                setOffices((prevData) => prevData.filter(office => office.id !== id));
            }
        }
    };

    const handleFormSubmit = async (data: OfficeData) => {
        await handleSubmit(data, initialData ?? undefined, (office: OfficeData) => {
            if (initialData) {
                setOffices((prevOffices) =>
                    prevOffices.map((o) => (o.id === office.id ? office : o))
                );
            } else {
                setOffices((prevOffices) => [...prevOffices, office]);
            }
        });
    };


    if (loading) return <><LoadingIndicator /></>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2 p-2">
                <span className="m-0 font-rounded font-semibold text-[20px]">DANH SÁCH VĂN PHÒNG</span>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm văn phòng
                </Button>
            </div>
            <TableOffice headers={headers} data={offices} onEdit={handleEdit} onDelete={handleDelete} />
            <ModalOffice open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} initialData={initialData} />
        </div>
    )
}