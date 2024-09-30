'use client';
import LoadingIndicator from '@/lib/loading';
import styles from '@/styles/module/OfficePage.module.css';
import { Route } from '@/types/Route';
import { Vehicle } from '@/types/Vehicle';
import { Delete, Mode } from '@mui/icons-material';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const VehicleTable: React.FC<{
    vehicle: Vehicle[];
    loading: boolean;
    error: string | null;
    onDelete: (id: number) => void;
    onEdit: (vehicle: Vehicle) => void;
}> = ({ vehicle, loading, error, onDelete, onEdit }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phương tiện này?')) {
            onDelete(id);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span className={styles.tileTable}>STT</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Biển số xe</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Số điện thoại</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Loại xe</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Hạn đăng kiểm</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Hãng xe</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Màu xe</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tùy chọn</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={7}><LoadingIndicator /></TableCell></TableRow>}
                    {error && <TableRow><TableCell colSpan={7}>Error: {error}</TableCell></TableRow>}
                    {/* {!loading && !error && vehicle.map((vehicles, index) => (
                        <TableRow key={vehicle.id}>
                            <TableCell>{index + 1}</TableCell>


                            <TableCell>
                                <IconButton color="error" aria-label="Delete route" onClick={() => handleDelete(vehicles.id)}>
                                    <Delete />
                                </IconButton>
                                <IconButton color="info" aria-label="Edit route" onClick={() => onEdit(vehicles)}>
                                    <Mode />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default VehicleTable;