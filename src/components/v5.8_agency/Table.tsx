import React from 'react';
import { Agency } from '@/types/Agency';
import { IconButton, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Delete, Mode, Tablet } from '@mui/icons-material';
import LoadingIndicator from '@/lib/loading';

interface TableProps {
    agency: Agency[];
    loading: boolean;
    error: string | null;
    onDelete: (id: number) => void;
    onEdit: (agency: Agency) => void;
}
const TableAgency: React.FC<TableProps> = ({ agency, loading, error, onDelete, onEdit }) => {
    if (loading) return <div><LoadingIndicator/></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody agency={agency} onDelete={onDelete} onEdit={onEdit} />
            </Table>
        </TableContainer>
    );
};
const TableHeader: React.FC = () => (
    <TableHead>
        <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên chi nhánh</TableCell>
            <TableCell>Điện thoại</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Ghi chú</TableCell>
            <TableCell>Tùy chọn</TableCell>
        </TableRow>
    </TableHead>
);
const TableBody: React.FC<{ agency: Agency[]; onDelete: (id: number) => void; onEdit: (agency: Agency) => void; }> = ({ agency, onDelete, onEdit }) => (
    <tbody>
        {agency.map((item, index) => (
            <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>
                    <IconButton color="info" onClick={() => onEdit(item)}>
                        <Mode />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(item.id)}>
                        <Delete />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))}
    </tbody>
);
export default TableAgency;