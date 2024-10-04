'use client';

import React, { useEffect, useState } from 'react';
import { LevelAgency } from "@/types/LevelAgency";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import styles from '@/styles/module/LevelAgencyPage.module.css'; 

interface LevelAgencyModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (agency: LevelAgency) => void;
    editAgency: LevelAgency | null;
}

const LEVEL_OPTIONS = [
    { value: 'level1', label: 'Level 1' },
    { value: 'level2', label: 'Level 2' },
    { value: 'level3', label: 'Level 3' }
];

const QUOTA_OPTIONS = [
    { value: 10000, label: '10.000' },
    { value: 20000, label: '20.000' },
    { value: 30000, label: '30.000' },
    { value: 40000, label: '40.000' },
    { value: 50000, label: '50.000' }
];

const LevelAgencyModal: React.FC<LevelAgencyModalProps> = ({ open, onClose, onAdd, editAgency }) => {
    const [levelName, setLevelName] = useState<string>('');
    const [quota, setQuota] = useState<number>(10000);

    useEffect(() => {
        if (editAgency) {
            setLevelName(editAgency.levelName);
            setQuota(editAgency.quota);
        } else {
            resetForm();
        }
    }, [editAgency]);

    const resetForm = () => {
        setLevelName('');
        setQuota(10000);
    };

    const handleSubmit = () => {
        const agency: LevelAgency = {
            id: editAgency?.id || 0,
            levelName,
            quota,
        };
        console.log('Dữ liệu agency:', agency);
        onAdd(agency);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className={styles.modal}>
            <DialogTitle>{editAgency ? 'Chỉnh sửa Cấp Đại Lý' : 'Thêm Cấp Đại Lý'}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="level-select-label">Cấp Đại Lý</InputLabel>
                    <Select
                        labelId="level-select-label"
                        value={levelName}
                        onChange={(e) => setLevelName(e.target.value)}
                    >
                        {LEVEL_OPTIONS.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="quota-select-label">Định Mức</InputLabel>
                    <Select
                        labelId="quota-select-label"
                        value={quota}
                        onChange={(e) => setQuota(Number(e.target.value))}
                    >
                        {QUOTA_OPTIONS.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {editAgency ? 'Cập Nhật' : 'Thêm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LevelAgencyModal;
