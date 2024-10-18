'use client';

import LoadingIndicator from "@/lib/loading";;
import ModalSeatMap from "@/modules/seat_map/components/ModalSeatMap";
import TableSeatMap from "@/modules/seat_map/components/TableSeatMap";
import useManageSeatMap from "@/modules/seat_map/hook/useManageSearMap";
import useSeatMap from "@/modules/seat_map/hook/useSeatMap";
import { SeatMapData } from "@/modules/seat_map/types/SeatMapData";
import { RootState } from "@/redux/store";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SeatMapPage() {
    const headers = ['STT', 'Tên sơ đồ ghế', 'Loại xe', 'Tùy chọn'];
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<SeatMapData | null>(null);
    const { seatMap, loading, error, setSeatMap } = useSeatMap(companyId);

    const handleOpen = () => {
        setInitialData(null);
        setOpen(true);
    };
    const handleEdit = (seatMap: SeatMapData) => {
        setInitialData(seatMap);
        setOpen(true);
    };
    ////
    const { handleSubmit } = useManageSeatMap();
    const handleFormSubmit = async (data: SeatMapData) => {
        await handleSubmit(data, initialData ?? undefined, (seatMap: SeatMapData) => {
            if (initialData) {
                setSeatMap((prevData) =>
                    prevData.map((o) => (o.id === seatMap.id ? seatMap : o))
                );
            } else {
                setSeatMap((prevData) => [...prevData, seatMap]);
            }
        });
    };
    const { handleDeleteSeatMap } = useManageSeatMap();
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sơ đồ ghế này không?")) {
            const success = await handleDeleteSeatMap(id);
            if (success) {
                setSeatMap((prevData) => prevData.filter(seatMap => seatMap.id !== id));
            }
        }
    };
    if (loading) return <><LoadingIndicator /></>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2 p-2">
                <span className="m-0 font-rounded font-semibold text-[20px]">DANH SÁCH SƠ ĐỒ GHẾ</span>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm sơ đồ ghế
                </Button>
            </div>
            <TableSeatMap headers={headers} data={seatMap} onEdit={handleEdit}  onDelete={handleDelete}/>
            <ModalSeatMap open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} initialData={initialData} />
        </div>
    )
}