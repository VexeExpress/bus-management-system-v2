'use client';

import { Route } from "@/types/Route";
import { Box, Button, Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
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
const TripModal: React.FC<RouteModalProps> = ({ open, onClose, onAdd, companyId, onUpdate, edit }) => {


    useEffect(() => {
        if (edit) {

        } else {

        }

    }, [edit]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {

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
                <Typography style={{ fontFamily: 'Rounded', padding: '10px' }} variant="h6" component="h2" gutterBottom>
                    {edit ? 'CẬP NHẬT THÔNG TIN CHUYẾN' : 'THÊM CHUYẾN MỚI'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <span>Tuyến</span>
                                <Select
                                    fullWidth
                                    size='small'
                                    labelId="status-select-label"
                                    id="status-select"
                                    name="floor"
                                >
                                    <MenuItem value={1}>1 Tầng</MenuItem>
                                    <MenuItem value={2}>2 Tầng</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={4}>
                                <span>Ngày khởi hành</span>
                                <TextField
                                    style={{ marginTop: 0 }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="seatMapName"
                                    type="date"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <span>Giờ khởi hành</span>
                                <TextField
                                    style={{ marginTop: 0, width: '100px' }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="seatMapName"
                                    type="time"
                                    size="small"
                                />
                            </Grid>
                            

                        </Grid>
                    </div>


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
export default TripModal;