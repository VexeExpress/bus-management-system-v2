'use client';
import LoadingIndicator from "@/lib/loading";
import ModalVehicle from "@/modules/vehicle/components/ModalVehicle";
import TableVehicle from "@/modules/vehicle/components/TableVehicle";
import useManageVehicles from "@/modules/vehicle/hook/useManageVehicle";
import useVehicles from "@/modules/vehicle/hook/useVehicles";
import { VehicleData } from "@/modules/vehicle/types/VehicleData";
import { RootState } from "@/redux/store";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function VehiclePage() {
    const headers = ['STT', 'Biển số xe', 'Điện thoại', 'Loại xe', 'Hạn đăng kiểm', 'Hãng xe', 'Màu xe', 'Tùy chọn'];
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<VehicleData | null>(null);
    const { vehicles, loading, error, setVehicles } = useVehicles(companyId);
    const handleOpen = () => {
        setInitialData(null);
        setOpen(true);
    };
    const handleEdit = (office: VehicleData) => {
        setInitialData(office);
        setOpen(true);
    };

    const { handleSubmit } = useManageVehicles();
    const handleFormSubmit = async (data: VehicleData) => {
        await handleSubmit(data, initialData ?? undefined, (vehicle: VehicleData) => {
            if (initialData) {
                setVehicles((prevData) =>
                    prevData.map((o) => (o.id === vehicle.id ? vehicle : o))
                );
            } else {
                setVehicles((prevData) => [...prevData, vehicle]);
            }
        });
    };

    const { handleDeleteVehicle } = useManageVehicles();
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phương tiện này không?")) {
            const success = await handleDeleteVehicle(id);
            if (success) {
                setVehicles((prevData) => prevData.filter(vehicle => vehicle.id !== id));
            }
        }
    };
    if (loading) return <><LoadingIndicator /></>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2 p-2">
                <span className="m-0 font-rounded font-semibold text-[20px]">DANH SÁCH PHƯƠNG TIỆN</span>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm phương tiện
                </Button>
            </div>
            <TableVehicle headers={headers} data={vehicles} onEdit={handleEdit} onDelete={handleDelete} />
            <ModalVehicle open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} initialData={initialData} />
        </div>
    )
}