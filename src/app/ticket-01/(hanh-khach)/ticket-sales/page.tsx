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
export default function BanVe() {
    const [selectedRoute, setSelectedRoute] = useState('');
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState<Date | null>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

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
    // modal add trip
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };
    const tripDetails = {
        id: '123',
        companyId: 'ABC',
        valueVehicle: 'Bus',
        valueRouter: 'City A to City B',
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
                        value={value ? formatDateToVietnamese(value) : ''}
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
                            <Calendar onChange={handleDateChange} value={value} />
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
                            value={selectedRoute}
                            label="Chọn tuyến"
                            onChange={(e) => setSelectedRoute(e.target.value)} // Cập nhật giá trị đã chọn
                        >
                            {routes.map((route: any) => (
                                <MenuItem key={route.id} value={route.id}>
                                    {route.routeName}
                                </MenuItem>
                            ))}


                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Button startIcon={<AddCircleOutline />} variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }} onClick={showModal}>Tăng cường chuyến</Button>
                </div>
                <div style={{ marginRight: '10px' }}>
                    <Button startIcon={<AutoMode />} variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }}>Làm mới</Button>
                </div>
            </section>
            <section>
                <ListTrip />
            </section>
            <TripModal
                open={isModalVisible}
                onClose={handleClose}
            />
        </>
    );
}
