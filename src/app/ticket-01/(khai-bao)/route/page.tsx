'use client';
import LoadingIndicator from "@/lib/loading";
import ModalRoute from "@/modules/route/components/ModalRoute";
import TableRoute from "@/modules/route/components/TableRoute";
import useManageRoute from "@/modules/route/hook/useManageRoute";
import useRoute from "@/modules/route/hook/useRoute";
import { RouteData } from "@/modules/route/types/RouteData";
import { RootState } from "@/redux/store";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RoutePage() {
    const headers = ['STT', 'Tên tuyến', 'Tên tuyến rút gọn', 'Giá vé cơ bản', 'Ghi chú', 'Trạng thái', 'Tùy chọn'];
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<RouteData | null>(null);
    const { route, loading, error, setRoute } = useRoute(companyId);
    const handleOpen = () => {
        setInitialData(null);
        setOpen(true);
    };
    const handleEdit = (office: RouteData) => {
        setInitialData(office);
        setOpen(true);
    };
    const { handleSubmit } = useManageRoute();
    const handleFormSubmit = async (data: RouteData) => {
        await handleSubmit(data, initialData ?? undefined, (route: RouteData) => {
            if (initialData) {
                setRoute((prevData) =>
                    prevData.map((o) => (o.id === route.id ? route : o))
                );
            } else {
                setRoute((prevData) => [...prevData, route]);
            }
        });
    };

    const { handleDeleteRoute } = useManageRoute();
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tuyến này không?")) {
            const success = await handleDeleteRoute(id);
            if (success) {
                setRoute((prevData) => prevData.filter(route => route.id !== id));
            }
        }
    };
    if (loading) return <><LoadingIndicator /></>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2 p-2">
                <span className="m-0 font-rounded font-semibold text-[20px]">DANH SÁCH TUYẾN</span>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm tuyến
                </Button>
            </div>
            <TableRoute headers={headers} data={route} onEdit={handleEdit} onDelete={handleDelete} />
            <ModalRoute open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} initialData={initialData} />
        </div>
    )
}