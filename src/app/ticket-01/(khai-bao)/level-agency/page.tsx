'use client';
import LevelAgencyTable from '@/components/v5.7_level_agency/LevelAgencyTable';
import LevelAgencyModal from '@/components/v5.7_level_agency/LevelAgencyModal';
import { useEffect, useState } from 'react';
import { LevelAgency } from "@/types/LevelAgency";
import { Button } from "@mui/material";
import { Add } from '@mui/icons-material';
import Toast from '@/lib/toast';
import { createLevelAgency, deleteLevelAgency, fetchLevelAgency, updateLevelAgency } from '@/services/level_agency/_v1';

export default function LevelAgencyPage() {
    const [open, setOpen] = useState(false);
    const [levelAgencies , setLevelAgency] = useState<LevelAgency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editLevelAgancy, setEditLevelAgancy] = useState<LevelAgency | null>(null);
    const handleOpen = () => setOpen(true);
    const companyId = Number(sessionStorage.getItem('company_id'));

    const handleAdd = async (newData: LevelAgency) => {
        try {
            console.log("Data: " + JSON.stringify(newData));
            const newLevelAgency = await createLevelAgency(newData);
            Toast.success("Thêm cấp đại lý thành công");

            setLevelAgency((prevData) => [...prevData, newLevelAgency]);
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    };

    const handleDelete = async (levelAgencyId: number) => {
        try {
            await deleteLevelAgency(levelAgencyId);
            setLevelAgency((prevData) => prevData.filter(level => level.id !== levelAgencyId)); 
            Toast.success('Xóa cấp đại lý thành công');
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    };
    const handleEdit = (levelAgency: LevelAgency) => {
        setEditLevelAgancy(levelAgency);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setEditLevelAgancy(null);
    };
    const handleUpdate = async (updatedData: LevelAgency) => {
        try {
            await updateLevelAgency(updatedData);
            setLevelAgency((prevData) =>
                prevData.map(level => (level.id === updatedData.id ? updatedData : level))
            );
            Toast.info('Cập nhật thành công');
            handleClose();
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        };
    }
    useEffect(() => {
        const loadLevelAgency = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchLevelAgency(companyId);
                setLevelAgency(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (companyId) {
            loadLevelAgency();
        }
    }, [companyId]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Rounded' }}>DANH SÁCH CẤP ĐẠI LÝ</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm cấp mới
                </Button>
            </div>

            <LevelAgencyTable
                levelAgency={levelAgencies}
                loading={loading}
                error={error}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <LevelAgencyModal
                open={open}
                onClose={handleClose}
                companyId={companyId}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                edit={editLevelAgancy}
            />
        </div>
    );
}
