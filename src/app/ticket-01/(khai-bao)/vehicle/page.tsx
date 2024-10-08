'use client';
import VehicleModal from "@/components/v5.5_vehicle/VehicleModal";
import VehicleTable from "@/components/v5.5_vehicle/VehicleTable";
import Toast from "@/lib/toast";
import { fetchVehicle } from "@/services/vehicle/_v1";
import { Vehicle } from "@/types/Vehicle";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function VehiclePage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEdit] = useState<Vehicle | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle[]>([]);
    const companyId = Number(sessionStorage.getItem('company_id'));

    const handleDelete = async (vehicleId: number) => {
        try {
            await deleteVehicle(vehicleId);
            setVehicle((prevVehicle) => prevVehicle.filter(vehicle => vehicle.id !== vehicleId));
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
    const handleEdit = (vehicle: Vehicle) => {
        setEdit(vehicle);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setEdit(null);
    };
    const handleAdd = async (newData: Vehicle) => {
        try {
            console.log("Data: " + JSON.stringify(newData));
            const newVehicle = await createVehicle(newData);
            Toast.success("Thêm phương thành công")
            setVehicle((prevVehicle) => [...prevVehicle, newVehicle]);
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
    const handleUpdate = async (updatedData: Vehicle) => {
        try {
            await updatedVehicle(updatedData);
            setVehicle((prevVehicle) =>
                prevVehicle.map(vehicle => (vehicle.id === updatedData.id ? updatedData : vehicle))
            );
            Toast.info('Cập nhật thành công');
            handleClose();
        } catch (err) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    }
    useEffect(() => {
        const loadVehicle = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchVehicle(companyId);
                setVehicle(data);
                console.log("Data: " + JSON.stringify(data, null, 2));

            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        if(companyId) {
            loadVehicle();
        }
    }, [companyId]);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Rounded' }}>DANH SÁCH PHƯƠNG TIỆN</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm phương tiện mới
                </Button>
            </div>
            <VehicleTable vehicle={vehicle} loading={loading} error={error} onDelete={handleDelete} onEdit={handleEdit} />
            <VehicleModal open={open} onClose={handleClose} companyId={companyId} onAdd={handleAdd} onUpdate={handleUpdate} edit={edit}/>
        </div>
    )
}