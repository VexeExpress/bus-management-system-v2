'use client';

import { Route } from "@/types/Route";
import { Box, Button, Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from '@/styles/module/VehiclePage.module.css';
import { SeatData, SeatMapData } from "@/types/SeatMap";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Adjust width if needed
    maxHeight: '80%', // Limit maximum height
    overflowY: 'auto', // Allow vertical scrolling
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface SeatMapProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAdd: (data: SeatMapData) => void;
    onUpdate: (data: SeatMapData) => void;
    edit: SeatMapData | null;
}
const SeatMapModal: React.FC<SeatMapProps> = ({ open, onClose, onAdd, companyId, onUpdate, edit }) => {
    const [seatMapName, setSeatMapName] = useState('');
    const [floor, setFloor] = useState(1);
    const [row, setRow] = useState(1);
    const [column, setColumn] = useState(1);
    const [seats, setSeats] = useState<SeatData[]>([]);

    useEffect(() => {
        console.log("Seats as JSON:", JSON.stringify(edit, null, 2));

        if (edit) {
            setSeatMapName(edit.seatMapName || '');
            setFloor(edit.floor || 1);
            setRow(edit.row || 1);
            setColumn(edit.column || 1);
            const firstSeat = edit.seats;
            console.log("Seats as JSON:", JSON.stringify(edit.seats, null, 2));
            setSeats(firstSeat);

        } else {
            setSeatMapName('');
            setFloor(1);
            setRow(1);
            setColumn(1);
            setSeats([]);
        }
    }, [edit]);


    const renderSeatMap = () => {
        const seatMaps = [];

        for (let f = 0; f < floor; f++) {
            const floorSeats = [];
            for (let i = 0; i < row; i++) {
                const rowSeats = [];
                for (let j = 0; j < column; j++) {
                    const seatKey = `Tầng ${f + 1} Ghế ${i + 1}-${j + 1}`;
                    const existingSeat = seats.find(seat =>
                        seat.floor === f + 1 && seat.row === i + 1 && seat.column === j + 1
                    );

                    rowSeats.push(
                        <span key={`${seatKey}`} style={{ margin: '5px', border: '1px solid black', padding: '10px' }}>
                            <input
                                type="text"
                                placeholder="Tên ghế"
                                required
                                value={existingSeat ? existingSeat.name : ''}
                                onChange={(e) => {
                                    const seatData: SeatData = {
                                        floor: f + 1,
                                        row: i + 1,
                                        column: j + 1,
                                        name: e.target.value,
                                        status: existingSeat ? existingSeat.status : false,
                                    };
                                    setSeats((prevSeats) => {
                                        const updatedSeats = [...prevSeats];
                                        const index = updatedSeats.findIndex(seat =>
                                            seat.floor === seatData.floor &&
                                            seat.row === seatData.row &&
                                            seat.column === seatData.column
                                        );
                                        if (index > -1) {
                                            updatedSeats[index] = { ...updatedSeats[index], name: seatData.name };
                                        } else {
                                            updatedSeats.push(seatData);
                                        }
                                        return updatedSeats;
                                    });
                                }}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={existingSeat ? existingSeat.status : false}
                                    onChange={(e) => {
                                        const seatData: SeatData = {
                                            floor: f + 1,
                                            row: i + 1,
                                            column: j + 1,
                                            name: existingSeat ? existingSeat.name : '',
                                            status: e.target.checked,
                                        };
                                        setSeats((prevSeats) => {
                                            const updatedSeats = [...prevSeats];
                                            const index = updatedSeats.findIndex(seat =>
                                                seat.floor === seatData.floor &&
                                                seat.row === seatData.row &&
                                                seat.column === seatData.column
                                            );
                                            if (index > -1) {
                                                updatedSeats[index] = { ...updatedSeats[index], status: seatData.status };
                                            } else {
                                                updatedSeats.push(seatData);
                                            }
                                            return updatedSeats;
                                        });
                                    }}
                                />
                                Kích hoạt
                            </label>
                        </span>
                    );
                }
                floorSeats.push(
                    <div key={`floor-${f}-row-${i}`} style={{ display: 'flex', justifyContent: 'center' }}>
                        {rowSeats}
                    </div>
                );
            }
            seatMaps.push(
                <div key={`floor-${f}`} style={{ margin: '20px 0' }}>
                    <h4>{`Tầng ${f + 1}`}</h4>
                    {floorSeats}
                </div>
            );
        }
        return seatMaps;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const seatMapData: SeatMapData = {
            seatMapName,
            column,
            floor,
            row,
            seats,
            company: {
                id: companyId,
            },
        };

        console.log("Seat Map Data: ", seatMapData);

        if (edit) {
            onUpdate(seatMapData);
        } else {
            onAdd(seatMapData);
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
                    {edit ? 'CẬP NHẬT SƠ ĐỒ GHẾ' : 'THÊM SƠ ĐỒ GHẾ'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <span>Tên sơ đồ ghế</span>
                            <TextField
                                className={styles.inputForm}
                                margin="normal"
                                required
                                fullWidth
                                name="seatMapName"
                                type="text"
                                size="small"
                                value={seatMapName}
                                onChange={(e) => setSeatMapName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <span>Số tầng</span>
                            <Select
                                fullWidth
                                size='small'
                                labelId="status-select-label"
                                id="status-select"
                                name="floor"
                                value={floor} 
                                onChange={(e) => setFloor(Number(e.target.value))}
                            >
                                <MenuItem value={1}>1 Tầng</MenuItem>
                                <MenuItem value={2}>2 Tầng</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <span>Số Hàng</span>
                            <Select
                                fullWidth
                                size='small'
                                labelId="status-select-label"
                                id="status-select"
                                name="row"
                                value={row} 
                                onChange={(e) => setRow(Number(e.target.value))}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>{`${i + 1} Hàng`}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <span>Số cột</span>
                            <Select
                                fullWidth
                                size='small'
                                labelId="status-select-label"
                                id="status-select"
                                name="column"
                                value={column}
                                onChange={(e) => setColumn(Number(e.target.value))}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>{`${i + 1} Cột`}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Typography style={{ fontFamily: 'Rounded' }} variant="h6" component="h2" gutterBottom>
                            Sơ Đồ Ghế
                        </Typography>
                        <div>{renderSeatMap()}</div>
                    </Box>
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

export default SeatMapModal;
