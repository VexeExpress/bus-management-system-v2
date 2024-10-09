'use client';

import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from '@/styles/module/OfficePage.module.css';
import { useEffect, useState } from "react";
import { fetchOffices } from "@/services/office/_v1";
import LoadingIndicator from "@/lib/loading";
import { Delete, Mode } from "@mui/icons-material";
import { Office } from "@/types/Office";



const OfficeTable: React.FC<{
    offices: Office[];
    loading: boolean;
    error: string | null;
    onDelete: (id: number) => void;
    onEdit: (office: Office) => void;
}> = ({ offices, loading, error, onDelete, onEdit }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa văn phòng này?')) {
            onDelete(id);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>

                    <TableRow>
                        <TableCell><span className={styles.tileTable}>STT</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tên chi nhánh</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Mã chi nhánh</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Điện thoại</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Địa chỉ</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Ghi chú</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tùy chọn</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={7}><LoadingIndicator /></TableCell></TableRow>}
                    {error && <TableRow><TableCell colSpan={7}>Error: {error}</TableCell></TableRow>}
                    {!loading && !error && offices.map((office, index) => (
                        <TableRow key={office.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{office.name}</TableCell>
                            <TableCell>{office.code}</TableCell>
                            <TableCell>{office.phone}</TableCell>
                            <TableCell>{office.address}</TableCell>
                            <TableCell>{office.note}</TableCell>
                            <TableCell>
                                <IconButton color="error" aria-label="Delete office" onClick={() => handleDelete(office.id)}>
                                    <Delete />
                                </IconButton>
                                <IconButton color="info" aria-label="Edit office" onClick={() => onEdit(office)}>
                                    <Mode />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default OfficeTable;