'use client';
import LevelAgencyTable from '@/components/v5.7_level_agency/LevelAgencyTable';
import LevelAgencyModal from '@/components/v5.7_level_agency/LevelAgencyModal';
import { useState } from 'react';
import { LevelAgency } from "@/types/LevelAgency";
import { Button } from "@mui/material";

export default function LevelAgencyPage() {
    const [agencies, setAgencies] = useState<LevelAgency[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editAgency, setEditAgency] = useState<LevelAgency | null>(null);
    const companyId = Number(sessionStorage.getItem('company_id'));

    
    const [nextId, setNextId] = useState<number>(1); // Biến giữ giá trị ID tiếp theo cho đại lý mới (ví dụ)

    const handleDelete = (id: number) => {
        console.log(`Xóa đại lý với ID: ${id}`);
        setAgencies((prevAgencies) => prevAgencies.filter(agency => agency.id !== id));
    };

    const handleEdit = (agency: LevelAgency) => {
        console.log(`Chỉnh sửa đại lý:`, agency);
        setEditAgency(agency);
        setOpenModal(true);
    };

    const addAgency = (newAgency: LevelAgency) => {
        const newAgencyWithId = { ...newAgency, id: nextId };
        setAgencies((prevAgencies) => [...prevAgencies, newAgencyWithId]);
        setNextId(nextId + 1); 
    };

    const updateAgency = (updatedAgency: LevelAgency) => {
        setAgencies((prevAgencies) =>
            prevAgencies.map(agency =>
                agency.id === updatedAgency.id ? updatedAgency : agency
            )
        );
    };

    const handleClose = () => {
        setOpenModal(false);
        setEditAgency(null);
    };

    return (
        <div>
            <h1>Khai báo cấp đại lý</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setEditAgency(null);
                    setOpenModal(true);
                }}
            >
                Thêm Cấp Đại Lý
            </Button>

            <LevelAgencyTable
                agencies={agencies}
                loading={loading}
                error={error}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <LevelAgencyModal
                open={openModal}
                onClose={handleClose}
                onAddAgency={addAgency}
                companyId={companyId}
                onUpdateAgency={updateAgency}
                editAgency={editAgency}
            />
        </div>
    );
}
