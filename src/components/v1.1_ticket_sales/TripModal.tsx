'use client';

import { Trip } from "@/types/Trip";
import { Box, Button, Chip, Grid, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { fetchSeatMapName } from "@/services/seat_map/_v1";
import React from "react";
import { fetchVehicleName } from "@/services/vehicle/_v1";

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

interface TripModalProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAdd: (data: any) => void;
    onUpdate: (data: any) => void;
    edit: Trip | null;
    selectedDate?: Date;
    selectedRouteId?: number;
    selectedRouteName?: string;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}
const TripModal: React.FC<TripModalProps> = ({ open, onClose, onAdd, companyId, onUpdate, edit, selectedDate, selectedRouteId, selectedRouteName }) => {

    console.log("CompanyID: " + companyId)
    console.log("Select Date: " + selectedDate)
    console.log("Select Route ID: " + selectedRouteId)
    console.log("Select Route Name: " + selectedRouteName)

    const [seatMaps, setSeatMaps] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);

    const [selectedVehicle, setSelectedVehicle] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<string>('');

    const [selectedSeatMap, setSelectedSeatMap] = useState<string>('');
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch seat maps, user, and vehicle data in parallel
                const [seatMaps, user, vehicles] = await Promise.all([
                    fetchSeatMapName(companyId),
                    fetchNameUser(companyId),
                    fetchVehicleName(companyId)
                ]);
                
                setSeatMaps(seatMaps);
                setUsers(user);
                setVehicles(vehicles);
                
                console.log("Map: " + JSON.stringify(seatMaps, null, 2));
                console.log("User: " + JSON.stringify(user, null, 2));
                console.log("Vehicle: " + JSON.stringify(vehicles, null, 2));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchAllData();

        if (edit) {

        } else {

        }

    }, [companyId, edit]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            routeId: selectedRouteId,
            dateTrip: selectedDate,
            company: { id: companyId }
        };

        if (edit) {
            onUpdate({ ...data, id: edit.id });
        } else {
            onAdd(data);
        }
        onClose();
    };
    const formatDateForInput = (date: Date | undefined): string => {
        return date ? dayjs(date).format('DD-MM-YYYY') : '';
    };


    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
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
                                <TextField
                                    style={{ marginTop: 0 }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="selectedRoute"
                                    type="text"
                                    size="small"
                                    disabled
                                    value={selectedRouteName}
                                    InputProps={{ readOnly: true }}
                                />
                                <span>Sơ đồ ghế</span>
                                <Select
                                    style={{ display: 'block' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    required
                                    fullWidth
                                    size="small"
                                    value={selectedSeatMap}
                                    onChange={(e) => setSelectedSeatMap(e.target.value)}
                                >
                                    {seatMaps.map((seatMap: any) => (
                                        <MenuItem key={seatMap.id} value={seatMap.id}>
                                            {seatMap.seatMapName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={4}>
                                <span>Ngày khởi hành</span>
                                <TextField
                                    style={{ marginTop: 0 }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="selectedDate"
                                    type="text"
                                    size="small"
                                    value={formatDateForInput(selectedDate)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    disabled
                                />
                                <span>Xe</span>
                                <Select
                                    style={{ display: 'block' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    size="small"
                                    value={selectedVehicle}
                                    onChange={(e) => setSelectedVehicle(e.target.value)}
                                >
                                    {vehicles.map((vehicle: any) => (
                                        <MenuItem key={vehicle.id} value={vehicle.id}>
                                            {vehicle.licensePlate}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={4}>
                                <span style={{ display: 'block' }}>Giờ khởi hành</span>
                                <TextField
                                    style={{ marginTop: 0, width: '105px' }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="time"
                                    type="time"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <span style={{ display: 'block', marginTop: 10 }}>Tài xế</span>
                        <Select
                            multiple
                            fullWidth
                            size="small"
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        <span style={{ display: 'block', marginTop: 10 }}>Ghi chú</span>
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            fullWidth
                            size="small"
                            maxRows={4}
                        />
                    </div>


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, marginBottom: 2,  }}>
                        <Button onClick={onClose} color="primary" variant="outlined" style={{ marginRight: 10 }}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary" style={{ marginRight: 20 }}>
                            {edit ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}
export default TripModal;