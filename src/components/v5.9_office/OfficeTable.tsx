'use client';

import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from '@/styles/module/UserPage.module.css';
import { useEffect, useState } from "react";
import { fetchOffices } from "@/services/office/_v1";
import LoadingIndicator from "@/lib/loading";
import { Delete, Mode } from "@mui/icons-material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
interface OfficeTableProps {
    companyId: number;
}
interface Office {
    id: number;
    name: string;
    code: string;
    phone: string;
    address: string;
    note: string;
}
const OfficeTable: React.FC<{ offices: any[]; loading: boolean; error: string | null }> = ({ offices, loading, error }) => {
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
                                <IconButton color="error" aria-label="delete">
                                    <Delete />
                                </IconButton>
                                <IconButton color="info" aria-label="delete">
                                    <Mode />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}
export default OfficeTable;