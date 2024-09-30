'use client';

import { User } from "@/types/User";
import { Box, Button, Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import styles from '@/styles/module/UserPage.module.css';
import { useEffect, useState } from "react";
import React from "react";
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

interface UserModalProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAddUser: (data: any) => void;
    onUpdateUser: (data: any) => void;
    editUser: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onAddUser, companyId, onUpdateUser, editUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [cccd, setCCCD] = useState('');
    const [gender, setGender] = useState<number>();;
    const [birthDate, setBirthDate] = useState('2000-01-01');
    const [role, setRole] = useState<number>();
    const [licenseCategory, setLicenseCategory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    useEffect(() => {
        if (editUser) {
            setUsername(editUser.username);
            // setPassword(editUser.password);
            setStatus(editUser.status);
            setName(editUser.name);
            setPhone(editUser.phone);
            setAddress(editUser.address);
            setEmail(editUser.email);
            setCCCD(editUser.cccd);
            setGender(editUser.gender);
            setBirthDate(editUser.birthDate);
            setRole(editUser.role);
            setLicenseCategory(editUser.licenseCategory);
            setExpirationDate(editUser.expirationDate);
        } else {
            setUsername('');
            setPassword('');
            setStatus(true);
            setName('');
            setPhone('');
            setAddress('');
            setEmail('');
            setCCCD('');
            setGender(1);
            setBirthDate('2000-01-01');
            setRole(1);
            setLicenseCategory('');
            setExpirationDate('');
        }
    }, [editUser]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userData = {
            username,
            password,
            status,
            address,
            name,
            phone,
            email,
            cccd,
            gender,
            birthDate,
            role,
            licenseCategory,
            expirationDate,
            company: { id: companyId }
        };

        if (editUser) {
            onUpdateUser({ ...userData, id: editUser.id });
        } else {
            onAddUser(userData);
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
                    {editUser ? 'CẬP NHẬT NHÂN VIÊN' : 'THÊM NHÂN VIÊN'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <span>Tài khoản</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                label="Tài khoản"
                                name="username"
                                size='small'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {!editUser && (
                                <>
                                    <span>Mật khẩu</span>
                                    <TextField
                                        className={styles.inputForm}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Mật khẩu"
                                        name="password"
                                        size="small"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            )}
                            <span>Trạng thái</span>
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
                                <MenuItem value='true'>Kích hoạt</MenuItem>
                                <MenuItem value='false'>Ngưng hoạt động</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            <span>Họ tên</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                type="text"
                                size='small'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span>Số điện thoại</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                type="text"
                                size='small'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <span>Địa chỉ</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                type="text"
                                size='small'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <span>Email</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                fullWidth
                                name="email"
                                type="email"
                                size='small'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span>Số CMND/CCCD</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                fullWidth
                                name="cccd"
                                type="text"
                                size='small'
                                value={cccd}
                                onChange={(e) => setCCCD(e.target.value)}
                            />
                            <span>Giới tính</span>
                            <Select
                                required
                                fullWidth
                                size='small'
                                labelId="gender-select-label"
                                id="gender-select"
                                className={styles.inputForm}
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(Number(e.target.value))}
                            >
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={2}>Nữ</MenuItem>
                            </Select>
                            <span>Ngày sinh</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                fullWidth
                                name="birthDate"
                                type="date"
                                size='small'
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Chức vụ</span>
                            <Select
                                required
                                fullWidth
                                size='small'
                                labelId="position-select-label"
                                id="position-select"
                                className={styles.inputForm}
                                name="position"
                                value={role}
                                onChange={(e) => setRole(Number(e.target.value))}
                            >
                                <MenuItem value={1}>Tài xế</MenuItem>
                                <MenuItem value={2}>Nhân viên hành chính</MenuItem>
                                <MenuItem value={3}>Quản trị viên</MenuItem>
                            </Select>
                            <span>Hạng bằng lái</span>
                            <Select
                                fullWidth
                                size='small'
                                labelId="license-select-label"
                                id="license-select"
                                className={styles.inputForm}
                                name="licenseCategory"
                                value={licenseCategory}
                                onChange={(e) => setLicenseCategory(e.target.value)}
                            >
                                <MenuItem value={1}>Chưa có</MenuItem>
                                <MenuItem value={2}>Hạng B1</MenuItem>
                                <MenuItem value={3}>Hạng B2</MenuItem>
                                <MenuItem value={4}>Hạng C</MenuItem>
                                <MenuItem value={5}>Hạng D</MenuItem>
                                <MenuItem value={6}>Hạng E</MenuItem>
                            </Select>

                            <span>Ngày hết hạn bằng lái</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                fullWidth
                                name="expirationDate"
                                type="date"
                                size="small"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />

                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={onClose} color="primary" variant="outlined" style={{ marginRight: 10 }}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editUser ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
export default UserModal;