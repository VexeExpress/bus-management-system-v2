
'use client';

import OfficeTable from "@/components/v5.9_office/OfficeTable";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import OfficeModal from '@/components/v5.9_office/OfficeModal';
import { createOffice, deleteOffice, fetchOffices, updateOffice } from "@/services/office/_v1";
import { Office } from "@/types/Office";
import Toast from "@/lib/toast";


export default function OfficePage() {
    const [open, setOpen] = useState(false);
    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editOffice, setEditOffice] = useState<Office | null>(null);
    const handleOpen = () => setOpen(true);
    const companyId = Number(sessionStorage.getItem('company_id'));

    const handleAddOffice = async (newOfficeData: Office) => {
        try {
            console.log("Data: " + JSON.stringify(newOfficeData));
            const newOffice = await createOffice(newOfficeData);
            Toast.success("Thêm văn phòng thành công")
            setOffices((prevOffices) => [...prevOffices, newOffice]);
        } catch (err: unknown) {
            if (typeof err === 'string') {
                console.log(err);
                Toast.error(err);
            } else if (err instanceof Error) {
                console.log(err.message);
                Toast.error(err.message);
            }
        }
    };
    const handleDeleteOffice = async (officeId: number) => {
        try {
            await deleteOffice(officeId);
            setOffices((prevOffices) => prevOffices.filter(office => office.id !== officeId)); 
            Toast.success('Xóa văn phòng thành công');
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        }
    };
    const handleEditOffice = (office: Office) => {
        setEditOffice(office);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setEditOffice(null);
    };
    const handleUpdateOffice = async (updatedOfficeData: Office) => {
        try {
            await updateOffice(updatedOfficeData);
            setOffices((prevOffices) =>
                prevOffices.map(office => (office.id === updatedOfficeData.id ? updatedOfficeData : office))
            );
            Toast.info('Cập nhật thành công');
            handleClose();
        } catch (err: unknown) {
            const message = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'Unknown error');
            Toast.error(message);
        };
    }


        useEffect(() => {
            const loadOffices = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await fetchOffices(companyId);
                    setOffices(data);
                } catch (error) {
                    setError((error as Error).message);
                } finally {
                    setLoading(false);
                }
            };

            if (companyId) {
                loadOffices();
            }
        }, [companyId]);

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: 10 }}>
                    <h3 style={{ margin: 0, fontFamily: 'Rounded' }}>DANH SÁCH VĂN PHÒNG</h3>
                    <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                        Thêm văn phòng
                    </Button>
                </div>
                <OfficeTable offices={offices} loading={loading} error={error} onDelete={handleDeleteOffice} onEdit={handleEditOffice} />
                <OfficeModal open={open} onClose={handleClose} companyId={companyId} onAddOffice={handleAddOffice} onUpdateOffice={handleUpdateOffice} editOffice={editOffice} />
            </div>
        )
    }