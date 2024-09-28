'use client';

import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import styles from '@/styles/module/OfficePage.module.css';
import '@/styles/css/global.css';
import { createOffice } from '@/services/office/_v1';

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

interface AddOfficeModalProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAddOffice: (data: any) => void;
}

const AddOfficeModal: React.FC<AddOfficeModalProps> = ({ open, onClose, onAddOffice, companyId }) => {
    const [name, setBranchName] = useState('');
    const [code, setBranchCode] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNotes] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newOfficeData = {
            name,
            code,
            phone,
            address,
            note,
            company: { id: companyId  }
        };
        onAddOffice(newOfficeData);
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
                    THÊM CHI NHÁNH
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Tên chi nhánh"
                                name="name"
                                size="small"
                                value={name}
                                onChange={(e) => setBranchName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Mã chi nhánh"
                                name="code"
                                size="small"
                                value={code}
                                onChange={(e) => setBranchCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Điện thoại"
                                name="phone"
                                type="tel"
                                size="small"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Địa chỉ"
                                name="address"
                                size="small"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Ghi chú"
                                name="note"
                                multiline
                                rows={4}
                                size="small"
                                value={note}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={onClose} color="primary" variant="outlined" style={{ marginRight: 10 }}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Thêm
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AddOfficeModal;
