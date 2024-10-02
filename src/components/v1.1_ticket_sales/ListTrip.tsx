'use client';

import React, { useEffect, useState } from "react";
import styles from '@/styles/module/TicketSales.module.css'
import { AddCircleOutline } from "@mui/icons-material";
const ListTrip: React.FC = () => {
    const trips = [
        { driver: "Nguyễn Văn B, 50F - 003.58", vehicle: "Limousine 36 phòng", time: "14:00", tickets: 10 },
        { driver: "Nguyễn Văn A, 51C - 123.45", vehicle: "Limousine 36 phòng", time: "16:00", tickets: 8 },
        { driver: "Trần B, 52B - 678.90", vehicle: "Limousine 36 phòng", time: "18:00", tickets: 12 },
        { driver: "Lê C, 50F - 345.67", vehicle: "Limousine 36 phòng", time: "20:00", tickets: 15 },
        { driver: "Phạm D, 53C - 456.78", vehicle: "Limousine 36 phòng", time: "22:00", tickets: 5 },
        { driver: "Võ E, 54B - 567.89", vehicle: "Limousine 36 phòng", time: "00:00", tickets: 20 },
        { driver: "Võ E, 54B - 567.89", vehicle: "Limousine 36 phòng", time: "00:00", tickets: 20 },
    ];
    return (
        <>
            <div className={styles.containerListTrip}>
                {trips.map((trip, index) => (
                    <div key={index} className={styles.tripShowMode}>
                        <div className={styles.trip}>
                            <div className={styles.proccessBar}>
                                <div className={styles.proccessBarContent}>
                                    <span className={styles.time}>{trip.time}</span>
                                    <span className={styles.tickets}>{trip.tickets} vé</span>
                                </div>
                                <div className={styles.proccessBarFill}></div>
                            </div>
                            <div className={styles.driver}>
                                <p>
                                    <span>T: {trip.driver}</span>
                                </p>
                            </div>
                            <div className={styles.vehicle}>
                                <span>{trip.vehicle}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListTrip;
