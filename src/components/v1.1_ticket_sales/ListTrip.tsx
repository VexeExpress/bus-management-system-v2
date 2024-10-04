'use client';

import React, { useEffect, useState } from "react";
import styles from '@/styles/module/TicketSales.module.css'
import { AddCircleOutline } from "@mui/icons-material";
import LoadingIndicator from "@/lib/loading";
import { fetchTrip } from "@/services/trip/_v1";
import dayjs from "dayjs";


interface ListTripProps {
    companyId: number;
    selectedDate: string;
    selectedRouteId: number;
}

const ListTrip: React.FC<ListTripProps> = ({ companyId, selectedDate, selectedRouteId }) => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formattedDateTrip = dayjs(selectedDate).format('YYYY-MM-DD');
    // console.log('companyId: ', companyId);
    // console.log('selectedRouteId: ', selectedRouteId);
    // console.log('selectedDate: ', formattedDateTrip);

    const fetchTrips = async () => {
        setLoading(true);
        try {
            const data = await fetchTrip(companyId, formattedDateTrip, selectedRouteId);
            console.log("Data Trip: ", data);

            setTrips(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchTrips();
    }, [companyId, formattedDateTrip, selectedRouteId]);


    if (loading) return <div><LoadingIndicator /></div>;

    return (
        <>
            <div className={styles.containerListTrip}>
                {trips
                    .sort((a, b) => {
                        // Sắp xếp các chuyến dựa trên chuỗi thời gian 'HH:mm:ss'
                        return a.time.localeCompare(b.time); // So sánh chuỗi thời gian để sắp xếp
                    })
                    .map((trip, index) => (
                        <div key={index} className={styles.tripShowMode}>
                            <div className={styles.trip}>
                                <div className={styles.proccessBar}>
                                    <div className={styles.proccessBarContent}>
                                        {/* Chỉ hiển thị giờ và phút, cắt bỏ giây */}
                                        <span className={styles.time}>{trip.time.slice(0, 5)}</span>

                                        <span className={styles.tickets}>24/36</span>
                                    </div>
                                    <div className={styles.proccessBarFill}></div>
                                </div>
                                <div className={styles.driver}>
                                    <p>
                                        {/* Hiển thị tên tài xế, cách nhau bằng dấu phẩy */}
                                        <span>T: {trip.user ? trip.user.join(', ') : ''}</span>
                                    </p>
                                </div>
                                <div className={styles.vehicle}>
                                    <span>{trip.seatMapName} ({trip.licensePlate})</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ListTrip;
