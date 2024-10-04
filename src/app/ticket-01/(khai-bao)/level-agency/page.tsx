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

    const handleDelete = (id: number) => {
        console.log(`Xóa đại lý với ID: ${id}`);
        setAgencies((prevAgencies) => prevAgencies.filter(agency => agency.id !== id));
    };

    const handleEdit = (agency: LevelAgency) => {
        console.log(`Chỉnh sửa đại lý:`, agency);
        setEditAgency(agency); 
        setOpenModal(true); 
    };

    const handleAddOrUpdateAgency = (newAgency: LevelAgency) => {
        if (editAgency) {
            setAgencies((prevAgencies) =>
                prevAgencies.map(agency =>
                    agency.id === newAgency.id ? newAgency : agency
                )
            );
        } else {
            setAgencies((prevAgencies) => [...prevAgencies, newAgency]);
        }
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
                onClose={() => setOpenModal(false)} 
                onAdd={handleAddOrUpdateAgency} 
                editAgency={editAgency}
            />
        </div>
    );
}
