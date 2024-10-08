'use client';

import { LevelAgency } from "@/types/LevelAgency";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from '@/styles/module/LevelAgencyPage.module.css';
import LoadingIndicator from "@/lib/loading";
import { Delete, Mode } from "@mui/icons-material";

const LevelAgencyTable: React.FC<{
    levelAgency: LevelAgency[];
    loading: boolean;
    error: string | null;
    onDelete: (id: number) => void;
    onEdit: (agency: LevelAgency) => void;
}> = ({ levelAgency, loading, error, onDelete, onEdit }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa cấp đại lý này?')) {
            onDelete(id);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span className={styles.tileTable}>STT</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Cấp đại lý</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Định mức</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tùy chọn</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && (
                        <TableRow>
                            <TableCell colSpan={4}><LoadingIndicator /></TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={4}>Error: {error}</TableCell>
                        </TableRow>
                    )}
                    {!loading && !error && levelAgency.map((agency, index) => (
                        <TableRow key={agency.id} >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{agency.levelName}</TableCell>
                            <TableCell>{agency.quota}</TableCell>
                            <TableCell>
                                <IconButton color="info" title="Chỉnh sửa" onClick={() => onEdit(agency)}>
                                    <Mode />
                                </IconButton>
                                <IconButton color="error" title="Xóa" onClick={() => handleDelete(agency.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LevelAgencyTable;
