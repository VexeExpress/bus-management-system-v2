'use client';
import LoadingIndicator from '@/lib/loading';
import styles from '@/styles/module/OfficePage.module.css';
import { Route } from '@/types/Route';
import { Delete, Mode } from '@mui/icons-material';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const RouteTable: React.FC<{
    routers: Route[];
    loading: boolean;
    error: string | null;
    onDelete: (id: number) => void;
    onEdit: (office: Route) => void;
}> = ({ routers, loading, error, onDelete, onEdit }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tuyến này?')) {
            onDelete(id);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span className={styles.tileTable}>STT</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tuyến</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tên tuyến rút gọn</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Giá vé</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Ghi chú</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Trạng thái</span></TableCell>
                        <TableCell><span className={styles.tileTable}>Tùy chọn</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={7}><LoadingIndicator /></TableCell></TableRow>}
                    {error && <TableRow><TableCell colSpan={7}>Error: {error}</TableCell></TableRow>}
                    {!loading && !error && routers.map((router, index) => (
                        <TableRow key={router.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{router.routeName}</TableCell>
                            <TableCell>{router.routeNameShort}</TableCell>
                            <TableCell>{router.displayPrice}</TableCell>
                            <TableCell>{router.note}</TableCell>
                            <TableCell>{router.status ? 'Kích hoạt' : 'Không kích hoạt'}</TableCell>


                            <TableCell>
                                <IconButton color="error" aria-label="Delete route" onClick={() => handleDelete(router.id)}>
                                    <Delete />
                                </IconButton>
                                <IconButton color="info" aria-label="Edit route" onClick={() => onEdit(router)}>
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
export default RouteTable;