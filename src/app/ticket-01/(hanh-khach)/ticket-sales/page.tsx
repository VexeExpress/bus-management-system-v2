'use client';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import '@/styles/css/global.css';
import styles from "@/styles/module/TicketSales.module.css";
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ListTrip from '@/components/v1.1_ticket_sales/ListTrip';
import { AddCircleOutline, AutoMode } from '@mui/icons-material';
import { fetchActiveRouters } from '@/services/route/_v1';
import TripModal from '@/components/v1.1_ticket_sales/TripModal';
import { Trip } from '@/types/Trip';
import Toast from '@/lib/toast';
import { createTrip } from '@/services/trip/_v1';
export default function BanVe() {
    const [open, setOpen] = useState(false);
    const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
    const [selectedRouteName, setSelectedRouteName] = useState<string>('');
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setValue] = useState<Date | null>(new Date());

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const companyId = Number(sessionStorage.getItem('company_id'));
    const [edit, setEditTrip] = useState<Trip | null>(null);
    const formatDateToVietnamese = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');

        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
    };
    const handleDateChange: CalendarProps['onChange'] = (date) => {
        if (date instanceof Date) {
            setValue(date);
            console.log(date);
        }
        setShowCalendar(false);
    };
    const handleInputClick = () => {
        setShowCalendar(!showCalendar);

    };

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const companyId = 1;
                const data = await fetchActiveRouters(companyId);
                setRoutes(data);
                console.log("Router active: " + JSON.stringify(data));

            } catch (error: any) {
                console.error('Error fetching routes:', error.message);
            }
        };

        fetchRoutes();
    }, []);
    const handleAdd = async(newData: Trip) => {
        try {
            console.log("Data: " + JSON.stringify(newData));
            const newTrip = await createTrip(newData);
            console.log("Trip added: " + JSON.stringify(newTrip));
            Toast.success("Tạo chuyến thành công")
        } catch (error: any) {
            console.error('Error creating trip:', error.message);
        }
    }
    // modal add trip
    const showModal = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
        setEditTrip(null)
    };



    return (
        <>
            <section className={styles.row}>
                <div style={{ marginRight: 12 }}>
                    <Button variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }}>Hôm nay</Button>
                </div>

                <div style={{ position: 'relative', }}>
                    <TextField
                        size="small"
                        style={{ minWidth: 250, fontFamily: 'Rounded' }}
                        id="outlined-basic"
                        variant="outlined"
                        value={selectedDate ? formatDateToVietnamese(selectedDate) : ''}
                        onClick={handleInputClick}
                        InputProps={{
                            readOnly: true,
                        }} />
                    {showCalendar && (
                        <div
                            style={{
                                position: 'absolute',
                                zIndex: 1000,
                                top: 42,
                                left: 0,
                            }}
                        >
                            <Calendar onChange={handleDateChange} value={selectedDate} />
                        </div>
                    )}
                </div>

                <div>
                    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                        <InputLabel id="demo-simple-select-label">
                            <span style={{ fontFamily: 'Rounded' }}>Chọn tuyến</span>
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedRouteId}
                            label="Chọn tuyến"
                            onChange={(e) => {
                                const selectedRouteId = e.target.value;
                                setSelectedRouteId(selectedRouteId);
                                const selectedRoute = routes.find((route: any) => route.id === selectedRouteId);
                                if (selectedRoute) {
                                    setSelectedRouteName(selectedRoute.routeName);
                                }
                            }}>
                            {routes.map((route: any) => (
                                <MenuItem key={route.id} value={route.id}>
                                    {route.routeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>



                <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
                    <Button startIcon={<AutoMode />} variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }}>Làm mới</Button>
                </div>
                {selectedRouteId && (
                    <div style={{ marginRight: '10px', marginLeft: '-10px' }}>
                        <Button startIcon={<AddCircleOutline />} variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }} onClick={showModal}>Tăng cường chuyến</Button>
                    </div>
                )}
            </section>
            <section>
                <ListTrip />
            </section>
            <TripModal
                open={open}
                onClose={handleClose}
                edit={edit}
                onAdd={handleAdd}
                companyId={companyId}
                selectedDate={selectedDate ?? new Date()}
                selectedRouteId={selectedRouteId}
                selectedRouteName={selectedRouteName}
            />
        </>
    );
}
