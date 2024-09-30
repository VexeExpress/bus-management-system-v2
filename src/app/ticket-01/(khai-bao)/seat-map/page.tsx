'use client';

import SeatMapModal from "@/components/v5.4_seat_map/SeatMapModal";
import SeatMapTable from "@/components/v5.4_seat_map/SeatMapTable";
import Toast from "@/lib/toast";
import { createRoute, deleteRouter, fetchRouter, updatedRouter } from "@/services/route/_v1";
import { createSeatMap, fetchSeatMap } from "@/services/seat_map/_v1";
import { Route } from "@/types/Route";
import { SeatData, SeatMapData } from "@/types/SeatMap";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SeatMapPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEdit] = useState<SeatMapData | null>(null);
    const [seatMap, setSeatMap] = useState<SeatMapData[]>([]);
    const companyId = Number(sessionStorage.getItem('company_id'));

    const handleDelete = async (seatMapId: number) => {
        try {
            await deleteRouter(seatMapId);
            setSeatMap((prevSeatMap) => prevSeatMap.filter(seatMap => seatMap.id !== seatMapId));
            Toast.success('Xóa sơ đồ ghế thành công');
        } catch (error) {
            if (typeof error ==='string') {
                console.log(error);
                Toast.error(error);
            } else if (error instanceof Error) {
                console.log(error.message);
                Toast.error(error.message);
            }
        }
    }
    const handleEdit = (seatMap: SeatMapData) => {
        setEdit(seatMap);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setEdit(null);
    };
    const handleAdd = async (newData: SeatMapData) => {
        try {
            console.log("Data: " + JSON.stringify(newData));
            const newSeatMap = await createSeatMap(newData);
            Toast.success("Thêm sơ đồ ghế thành công")
            setSeatMap((prevSeatMap) => [...prevSeatMap, newSeatMap]);
        } catch (err) {
            if (typeof err === 'string') {
                console.log(err);
                Toast.error(err);
            } else if (err instanceof Error) {
                console.log(err.message);
                Toast.error(err.message);
            }
        }
    }
    const handleUpdate = async (updatedData: SeatMapData) => {
        try {
            await updatedSeatMap(updatedData);
            setSeatMap((prevSeatMap) =>
                prevSeatMap.map(seatMap => (seatMap.id === updatedData.id ? updatedData : seatMap))
            );
            Toast.info('Cập nhật thành công');
            handleClose();
        } catch (err) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    }
    useEffect(() => {
        const loadSeatMap = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchSeatMap(companyId);
                setSeatMap(data);
                console.log("Data: " + JSON.stringify(data, null, 2));

            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        if(companyId) {
            loadSeatMap();
        }
    }, [companyId]);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Rounded' }}>SƠ ĐỒ GHẾ</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm sơ đồ
                </Button>
            </div>
            <SeatMapTable seatMap={seatMap} loading={loading} error={error} onDelete={handleDelete} onEdit={handleEdit} />
            <SeatMapModal open={open} onClose={handleClose} companyId={companyId} onAdd={handleAdd} onUpdate={handleUpdate} edit={edit}/>
        </div>
    )
}