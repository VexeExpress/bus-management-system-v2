'use client';

import LoadingIndicator from '@/lib/loading';
import styles from '@/styles/module/OfficePage.module.css';
import { Route } from '@/types/Route';
import { SeatMapData } from '@/types/SeatMap';
import { Vehicle } from '@/types/Vehicle';
import { Delete, Mode } from '@mui/icons-material';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const SeatMapTable: React.FC<{
    seatMap: SeatMapData[];
    loading: boolean;
    error: string | null;
    onDelete: (id: number) => void;
    onEdit: (seatMap: SeatMapData) => void;
}> = ({ seatMap, loading, error, onDelete, onEdit }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sơ đồ ghế này?')) {
            onDelete(id);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span className={styles.tileTable}>STT</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tên sơ đồ</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tùy chọn</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={7}><LoadingIndicator /></TableCell></TableRow>}
                    {error && <TableRow><TableCell colSpan={7}>Error: {error}</TableCell></TableRow>}
                    {!loading && !error && seatMap.map((seatMaps, index) => (
                        <TableRow key={seatMaps.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{seatMaps.seatMapName}</TableCell>
                            <TableCell>
                                <IconButton color="error" aria-label="Delete route" onClick={() => handleDelete(seatMaps.id)}>
                                    <Delete />
                                </IconButton>
                                <IconButton color="info" aria-label="Edit route" onClick={() => onEdit(seatMaps)}>
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
export default SeatMapTable;