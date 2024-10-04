'use client';

import { Route } from "@/types/Route";
import { Box, Button, Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from '@/styles/module/VehiclePage.module.css';

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

interface VehicleModalProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAdd: (data: any) => void;
    onUpdate: (data: any) => void;
    edit: Route | null;
}
const VehicleModal: React.FC<VehicleModalProps> = ({ open, onClose, onAdd, companyId, onUpdate, edit }) => {
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
                    {edit ? 'CẬP NHẬT THÔNG TIN PHƯƠNG TIỆN' : 'THÊM PHƯƠNG TIỆN'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <span>Biển số xe</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="routeName"
                                type="text"
                                size="small"
                                value={routeName}
                                onChange={(e) => setRouteName(e.target.value)}
                            />
                            <span>Số điện thoại xe</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="routeNameShort"
                                type="text"
                                size="small"
                                value={routeNameShort}
                                onChange={(e) => setRouteNameShort(e.target.value)}
                            />
                            <span>Hãng xe</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="routeNameShort"
                                type="text"
                                size="small"
                                value={routeNameShort}
                                onChange={(e) => setRouteNameShort(e.target.value)}
                            />
                            <span>Màu xe</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="routeNameShort"
                                type="text"
                                size="small"
                                value={routeNameShort}
                                onChange={(e) => setRouteNameShort(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <span>Số khung</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="displayPrice"
                                type="text"
                                size="small"
                                value={displayPrice}
                                onChange={(e) => setDisplayPrice(e.target.value)}
                            />
                            <span>Số máy</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="displayPrice"
                                type="text"
                                size="small"
                                value={displayPrice}
                                onChange={(e) => setDisplayPrice(e.target.value)}
                            />
                            <span>Loại xe</span>
                            <Select
                                fullWidth
                                size='small'
                                labelId="status-select-label"
                                id="status-select"
                                className={styles.inputForm}
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value === 'true')}
                            >
                                <MenuItem value={1}>Ghế ngồi</MenuItem>
                                <MenuItem value={2}>Ghế ngồi limousine</MenuItem>
                                <MenuItem value={3}>Giường nằm</MenuItem>
                                <MenuItem value={4}>Giường nằm limousine</MenuItem>
                                <MenuItem value={5}>Phòng VIP (Cabin)</MenuItem>
                            </Select>
                            <span>Hạn đăng kiểm</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                fullWidth
                                name="birthDate"
                                type="date"
                                size='small'
                                defaultValue={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                            <span>Hạn bảo hiểm</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                fullWidth
                                name="birthDate"
                                type="date"
                                size='small'
                                defaultValue={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
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
export default VehicleModal;