'use client';
import RouteModal from "@/components/v5.3_route/RouteModal";
import RouteTable from "@/components/v5.3_route/RouteTable";
import Toast from "@/lib/toast";
import { createRoute, deleteRouter, fetchRouter, updatedRouter } from "@/services/route/_v1";
import { Route } from "@/types/Route";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function RoutePage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEdit] = useState<Route | null>(null);
    const [router, setRouter] = useState<Route[]>([]);
    const companyId = Number(sessionStorage.getItem('company_id'));

    const handleDelete = async (routerId: number) => {
        try {
            await deleteRouter(routerId);
            setRouter((prevRoutes) => prevRoutes.filter(route => route.id !== routerId)); 
            Toast.success('Xóa tuyến thành công');
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
    const handleEdit = (route: Route) => {
        setEdit(route);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setEdit(null);
    };
    const handleAdd = async (newData: Route) => {
        try {
            console.log("Data: " + JSON.stringify(newData));
            const newRoute = await createRoute(newData);
            Toast.success("Thêm tuyến thành công")
            setRouter((prevRouter) => [...prevRouter, newRoute]);
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
    const handleUpdate = async (updatedData: Route) => {
        try {
            await updatedRouter(updatedData);
            setRouter((prevRouter) =>
                prevRouter.map(route => (route.id === updatedData.id ? updatedData : route))
            );
            Toast.info('Cập nhật thành công');
            handleClose();
        } catch (err) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    }
    useEffect(() => {
        const loadRoutes = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchRouter(companyId);
                setRouter(data);
                console.log("Data: " + JSON.stringify(data, null, 2));

            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        if(companyId) {
            loadRoutes();
        }
    }, [companyId]);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Rounded' }}>DANH SÁCH TUYẾN</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Tạo tuyến mới
                </Button>
            </div>
            <RouteTable routers={router} loading={loading} error={error} onDelete={handleDelete} onEdit={handleEdit} />
            <RouteModal open={open} onClose={handleClose} companyId={companyId} onAdd={handleAdd} onUpdate={handleUpdate} edit={edit}/>
        </div>
    )
}