import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
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
interface FieldConfig {
    label: string;
    value: string;
    type?: string;
    options?: Array<{ label: string, value: string }>
}
interface CommonModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
    editData?: any;
    fields: FieldConfig[];
}
const CommonModal: React.FC<CommonModalProps> = ({ open, onClose, onSubmit, title, editData, fields }) => {
    const [formData, setFormData] = useState<any>({});
    useEffect(() => {
        if (editData) {
            setFormData(editData);
        } else {
            setFormData(fields.reduce((acc, field) => ({ ...acc, [field.value]: field.type === 'select' ? field.options?.[0]?.value || '' : '' }), {}));
        }
    }, [editData, fields]);
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
        onClose();
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styleModal}>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {fields.map((field) => (
                            <Grid item xs={6} key={field.value}>
                                {field.type === 'select' ? (
                                    <FormControl fullWidth size="small">
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select
                                            label={field.label}
                                            value={formData[field.value] || ''}
                                            onChange={(e) => handleChange(field.value, e.target.value)}
                                        >
                                            {field.options?.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        value={formData[field.value] || ''}
                                        type={field.type || 'text'}
                                        onChange={(e) => handleChange(field.value, e.target.value)}
                                        size="small"
                                        required
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={onClose} color="primary" variant="outlined" style={{ marginRight: 10 }}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editData ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}
export default CommonModal;