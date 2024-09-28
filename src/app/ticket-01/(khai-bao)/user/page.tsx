'use client';
import { Box, Button, Grid, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import * as React from 'react';
import styles from '@/styles/module/UserPage.module.css';
import { Add } from '@mui/icons-material';
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,

    p: 2
};
export default function UserPage() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ margin: 0 }}>DANH SÁCH NHÂN VIÊN</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm nhân viên
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ><span className={styles.tileTable}>STT</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Tên nhân viên</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Số điện thoại</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Giới tính</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Tài khoản</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Chức vụ</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Phòng vé</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Trạng thái</span></TableCell>
                            <TableCell ><span className={styles.tileTable}>Tùy chọn</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell >{row.calories}</TableCell>
                                <TableCell >{row.fat}</TableCell>
                                <TableCell >{row.carbs}</TableCell>
                                <TableCell >{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <h3>THÊM NHÂN VIÊN</h3>

                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Tên"
                                name="fullName"
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                <span>Thông tin nhân viên</span>
                            </div>
                            <span>Họ tên</span>
                            <TextField
                                className={styles.inputFormAdd}
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                type="text"
                                size='small'
                            />
                            <span>Số điện thoại</span>
                            <TextField
                                className={styles.inputFormAdd}
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                type="text"
                                size='small'
                            />
                            <span>Địa chỉ</span>
                            <TextField
                                className={styles.inputFormAdd}
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                type="text"
                                size='small'
                            />
                            <span>Email</span>
                            <TextField
                                className={styles.inputFormAdd}
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                type="email"
                                size='small'
                            />
                            <span>Số CMND/CCCD</span>
                            <TextField
                                className={styles.inputFormAdd}
                                margin="normal"
                                required
                                fullWidth
                                name="cccd"
                                type="text"
                                size='small'
                            />
                            <span>Giới tính</span>
                            <Select fullWidth size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={styles.inputFormAdd}
                            >
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={2}>Nữ</MenuItem>
                            </Select>
                            <span>Ngày sinh</span>
                            <TextField
                                className={styles.inputFormAdd}
                                margin="normal"
                                required
                                fullWidth
                                name="cccd"
                                type="date"
                                size='small'
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                <span>Thông tin với công ty</span>
                            </div>
                            <span>Văn phòng</span>
                            <Select fullWidth size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={styles.inputFormAdd}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <span>Chức vụ</span>
                            <Select fullWidth size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={styles.inputFormAdd}
                            >
                                <MenuItem value={1}>Lái xe</MenuItem>
                                <MenuItem value={2}>Nhân viên hành chính</MenuItem>
                                <MenuItem value={3}>Quản trị viên</MenuItem>
                            </Select>
                            <span>Hạng bằng lái</span>
                            <Select fullWidth size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={styles.inputFormAdd}
                            >
                                <MenuItem value={1}>Chưa có</MenuItem>
                                <MenuItem value={2}>Hạng B1</MenuItem>
                                <MenuItem value={3}>Hạng B2</MenuItem>
                                <MenuItem value={4}>Hạng C</MenuItem>
                                <MenuItem value={5}>Hạng D</MenuItem>
                                <MenuItem value={6}>Hạng E</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </div>

    );
}