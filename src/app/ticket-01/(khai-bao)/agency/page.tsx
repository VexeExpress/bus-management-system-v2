'use client';

import HeaderPage from "@/components/Declaration/Header";
import CommonModal from "@/components/Declaration/Modal";
import TableAgency from "@/components/v5.8_agency/Table";
import useAgencies from "@/hooks/useAgencies ";
import Toast from "@/lib/toast";
import { Agency } from "@/types/Agency";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function AgencyPage() {
    const { agencies, loading, error, addAgency, updateAgency, deleteAgency } = useAgencies();
    const [open, setOpen] = useState(false);
    const [editAgency, setEditAgency] = useState<Agency | null>(null);

    const fields = [
        { label: 'Tên đại lý', value: 'name' },
        { label: 'Điện thoại', value: 'phone', type: 'tel' },
        { label: 'Địa chỉ', value: 'address' },
        { label: 'Ghi chú', value: 'note' },
        {
            label: 'Loại đại lý',
            value: 'agencyType',
            type: 'select',
            options: [
                { label: 'Loại A', value: 'A' },
                { label: 'Loại B', value: 'B' }
            ]
        }
    ];
    const openModal = () => {
        setEditAgency(null);
        setOpen(true);
    };

    const handleAddAgency = (newAgency: Agency) => {
        addAgency(newAgency);
    };

    const handleUpdateAgency = (updatedAgency: Agency) => {
        updateAgency(updatedAgency);
        setEditAgency(null);
    };

    const handleEdit = (agencyToEdit: Agency) => {
        setEditAgency(agencyToEdit);
        setOpen(true);
    };

    return (
        <div>
            <HeaderPage title="DANH SÁCH ĐẠI LÝ"
                actionButton={
                    <Button variant="contained" startIcon={<Add />} onClick={openModal}>
                        Thêm đại lý
                    </Button>
                }
            />
            <TableAgency
                agency={agencies}
                loading={loading}
                error={error}
                onDelete={deleteAgency}
                onEdit={handleEdit}
            />

            <CommonModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={editAgency ? handleUpdateAgency : handleAddAgency}
                title={editAgency ? 'Cập nhật đại lý' : 'Thêm đại lý'}
                editData={editAgency}
                fields={fields}
            />


        </div>
    )
}