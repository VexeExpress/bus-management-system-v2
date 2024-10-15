'use client';

import LoadingIndicator from "@/lib/loading";
import ModalLevelAgency from "@/modules/level_agency/components/ModalLevelAgency";
import TableLevelAgency from "@/modules/level_agency/components/TableLevelAgency";
import useLevelAgency from "@/modules/level_agency/hook/useLevelAgency";
import useManageLevelAgency from "@/modules/level_agency/hook/useManageLevelAgency";
import { LevelAgencyData } from "@/modules/level_agency/types/LevelAgencyData";
import { RootState } from "@/redux/store";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function LevelAgencyPage() {
    const headers = ['STT', 'Cấp đại lý', 'Định mức', 'Tùy chọn'];
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<LevelAgencyData | null>(null);
    const { levelAgency, loading, error, setLevelAgency } = useLevelAgency(companyId);
    const handleOpen = () => {
        setInitialData(null);
        setOpen(true);
    };
    const handleEdit = (levelAgency: LevelAgencyData) => {
        setInitialData(levelAgency);
        setOpen(true);
    };
    const { handleSubmit } = useManageLevelAgency();
    const handleFormSubmit = async (data: LevelAgencyData) => {
        await handleSubmit(data, initialData ?? undefined, (levelAgency: LevelAgencyData) => {
            if (initialData) {
                setLevelAgency((prevData) =>
                    prevData.map((o) => (o.id === levelAgency.id ? levelAgency : o))
                );
            } else {
                setLevelAgency((prevData) => [...prevData, levelAgency]);
            }
        });
    };
    const { handleDeleteLevelAgency } = useManageLevelAgency();
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa cấp đại lý này không?")) {
            const success = await handleDeleteLevelAgency(id);
            if (success) {
                setLevelAgency((prevData) => prevData.filter(levelAgency => levelAgency.id !== id));
            }
        }
    };
    if (loading) return <><LoadingIndicator /></>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2 p-2">
                <span className="m-0 font-rounded font-semibold text-[20px]">DANH SÁCH CẤP ĐẠI LÝ</span>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm cấp mới
                </Button>
            </div>
            <TableLevelAgency headers={headers} data={levelAgency} onEdit={handleEdit} onDelete={handleDelete} />
            <ModalLevelAgency open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} initialData={initialData} />
        </div>
    );
}
