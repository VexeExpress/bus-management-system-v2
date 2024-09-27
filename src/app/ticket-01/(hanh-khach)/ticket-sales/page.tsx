'use client';
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import '@/styles/css/global.css';
import styles from "@/styles/module/TicketSales.module.css";
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export default function BanVe() {
    const [selectedRoute, setSelectedRoute] = useState('');

    const [value, setValue] = useState<Date | null>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const formatDateToVietnamese = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
    };
    // Xác định kiểu của 'date' là Value (Date | Date[] | null)
    const handleDateChange: CalendarProps['onChange'] = (date) => {
        // Kiểm tra nếu date là Date thì mới set giá trị
        if (date instanceof Date) {
            setValue(date);
            console.log(date);
        }
        setShowCalendar(false); // Đóng lịch sau khi chọn ngày
    };
    const handleInputClick = () => {
        setShowCalendar(!showCalendar); // Mở hoặc đóng lịch khi click vào input

    };

    return (
        <section className={styles.row}>
            <div style={{ marginRight: 12 }}>
                <Button variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }}>Hôm nay</Button>
            </div>

            <div style={{ position: 'relative',  }} >
                <TextField
                    size="small"
                    style={{ minWidth: 250, fontFamily: 'Rounded' }}
                    id="outlined-basic"
                    variant="outlined"
                    value={value ? formatDateToVietnamese(value) : ''}
                    onClick={handleInputClick}
                    InputProps={{
                        readOnly: true,
                    }}
                />
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
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </section>
    );
}
