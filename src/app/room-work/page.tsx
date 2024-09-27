// app/room-work/page.tsx
'use client';

import { useState } from "react";
import styles from "../../styles/module/RoomWork.module.css";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function RoomWork() {



    return (
        <section className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imageContainer}>
                    <img src="/static/room-work.png" alt="Room Work" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>Chào mừng!</h1>
                <span className={styles.titleSmall}>
                    Chào mừng bạn <span className={styles.titleName}>Đặng Tuấn Thành</span> đến
                    với phần mềm quản lý bán vé xe khách! Vui lòng chọn phòng vé của bạn
                    để bắt đầu
                </span>
                <br />
                <FormControl size="small" style={{ width: '80%' }}>
                    <InputLabel id="demo-simple-select-label">Chọn phòng vé</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Chọn phòng vé"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Button style={{ width: '80%' }} variant="contained">
                    Bắt đầu làm việc
                </Button>
            </div>

        </section>
    );
}


