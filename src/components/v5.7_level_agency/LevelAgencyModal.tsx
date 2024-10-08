'use client';

import React, { useEffect, useState } from 'react';
import { LevelAgency } from "@/types/LevelAgency";
import { Button, Box, Modal, Typography, TextField } from "@mui/material";
import styles from '@/styles/module/LevelAgencyPage.module.css';
const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,

    p: 2,
};
interface LevelAgencyModalProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAdd: (data: any) => void;
    onUpdate: (data: any) => void;
    edit: LevelAgency | null;
}

const LevelAgencyModal: React.FC<LevelAgencyModalProps> = ({ open, onClose, onAdd, edit, companyId, onUpdate }) => {
    const [levelName, setLevelName] = useState<string>('');
    const [quota, setQuota] = useState<number | string>(0);

    useEffect(() => {
        if (edit) {
            setLevelName(edit.levelName);
            setQuota(edit.quota);
        } else {
            setLevelName('');
            setQuota(0);
        }
    }, [edit]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            levelName,
            quota,
            companyId: companyId,
        };

        if (edit) {
            onUpdate({ ...data, id: edit.id });
        } else {
            onAdd(data);
        }
        onClose();
    };
    const handleQuotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setQuota(value === '' ? '' : Number(value));
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography className={styles.titleModal} variant="h6" component="h2" gutterBottom>
                    {edit ? 'CẬP NHẬT CẤP ĐẠI LÝ' : 'THÊM CẤP ĐẠI LÝ'}
                </Typography>

                <form onSubmit={handleSubmit} style={{ padding: 20 }}>
                    <div>
                        <span>Cấp đại lý</span>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            className={styles.inputForm}
                            name="levelName"
                            size="small"
                            value={levelName}
                            onChange={(e) => setLevelName(e.target.value)}
                        />
                        <span>Định mức</span>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            className={styles.inputForm}
                            name="quota"
                            size="small"
                            value={quota}
                            onChange={handleQuotaChange}

                        />
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
    );
};

export default LevelAgencyModal;
