'use client';

import { Route } from "@/types/Route";
import { Box, Button, Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

interface RouteModalProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAdd: (data: any) => void;
    onUpdate: (data: any) => void;
    edit: Route | null;
}
const RouteModal: React.FC<RouteModalProps> = ({ open, onClose, onAdd, companyId, onUpdate, edit }) => {
    const [routeName, setRouteName] = useState('');
    const [routeNameShort, setRouteNameShort] = useState('');
    const [displayPrice, setDisplayPrice] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState(true)

    useEffect(() => {
        if (edit) {
            setRouteName(edit.routeName);
            setRouteNameShort(edit.routeNameShort);
            setDisplayPrice(edit.displayPrice);
            setNote(edit.note);
            setStatus(edit.status)
        } else {
            setRouteName('');
            setRouteNameShort('');
            setDisplayPrice('');
            setNote('');
            setStatus(true);
        }

    }, [edit]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            routeName,
            routeNameShort,
            displayPrice,
            status,
            note,
            company: { id: companyId }
        };

        if (edit) {
            onUpdate({ ...data, id: edit.id });
        } else {
            onAdd(data);
        }
        onClose();
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography style={{ fontFamily: 'Rounded' }} variant="h6" component="h2" gutterBottom>
                    {edit ? 'CẬP NHẬT TUYẾN' : 'THÊM TUYẾN'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Tên tuyến"
                                name="routeName"
                                type="text"
                                size="small"
                                value={routeName}
                                onChange={(e) => setRouteName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Tên tuyến rút gọn"
                                name="routeNameShort"
                                type="text"
                                size="small"
                                value={routeNameShort}
                                onChange={(e) => setRouteNameShort(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Giá cơ bản"
                                name="displayPrice"
                                type="text"
                                size="small"
                                value={displayPrice}
                                onChange={(e) => setDisplayPrice(e.target.value)}
                            />
                        </Grid>


                    </Grid>
                    <Grid item xs={6}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Ghi chú"
                                name="note"
                                size="small"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <span>Trạng thái</span>
                            <Select
                                fullWidth
                                size='small'
                                labelId="status-select-label"
                                id="status-select"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value === 'true')}
                            >
                                <MenuItem value='true'>Kích hoạt</MenuItem>
                                <MenuItem value='false'>Ngưng kích hoạt</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={onClose} color="primary" variant="outlined" style={{ marginRight: 10 }}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {edit ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}
export default RouteModal;