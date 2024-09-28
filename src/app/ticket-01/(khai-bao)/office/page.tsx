'use client';

import OfficeTable from "@/components/v5.9_office/OfficeTable";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddOfficeModal from '@/components/v5.9_office/AddOfficeModal';
import { createOffice, fetchOffices } from "@/services/office/_v1";
import { Office } from "@/types/Office";
import Toast from "@/lib/toast";


export default function OfficePage() {
    const [open, setOpen] = useState(false);
    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const companyId = Number(sessionStorage.getItem('company_id'));

    const handleAddOffice = async (newOfficeData: Office) => {
        try {
            const newOffice = await createOffice(newOfficeData);
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Rounded' }}>DANH SÁCH VĂN PHÒNG</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm văn phòng
                </Button>
            </div>
            <OfficeTable offices={offices} loading={loading} error={error} />
            <AddOfficeModal open={open} onClose={handleClose} companyId={companyId} onAddOffice={handleAddOffice} />
        </div>
    )
}