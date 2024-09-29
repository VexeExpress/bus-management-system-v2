// app/room-work/page.tsx
'use client';

import { useEffect, useState } from "react";
import styles from "../../styles/module/RoomWork.module.css";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { fetchCompanyIdByUserId, fetchNameUserById } from "@/services/User/_v1";
import Toast from "@/lib/toast";
import { fetchOffices } from "@/services/office/_v1";
import { useRouter } from 'next/navigation';
export default function RoomWork() {
    const [companyId, setCompanyId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [offices, setOffices] = useState<any[]>([]);
    const [selectedOffice, setSelectedOffice] = useState<number | ''>('');
    const [userName, setUserName] = useState<string>('');
    const router = useRouter();
    useEffect(() => {
        const userId = Number(sessionStorage.getItem("user_id"));
        console.log("userId from session:", userId)
        if (userId) {
            fetchCompanyIdByUserId(userId)
                .then((companyId) => {
                    setCompanyId(companyId);
                    sessionStorage.setItem("company_id", companyId);
                    console.log("company_id: ", companyId);

                    return fetchOffices(companyId);
                })
                .then((offices) => {
                    setOffices(offices);
                    console.log("Offices: ", offices);

                    return fetchNameUserById(userId);
                })
                .then((name) => {
                    setUserName(name);
                    sessionStorage.setItem("name_user", name);
                    console.log("Name user: ", name);
                })
                .catch((error) => {
                    console.error(error);
                    Toast.error('Lỗi truy vấn dữ liệu công ty');
                })
                .finally(() => setLoading(false));
        } else {
            console.error("No user_id found in session.");
            Toast.error('Lỗi truy vấn dữ liệu công ty');
            setLoading(false);
        }
    }, []);
    const handleOfficeChange = (event: SelectChangeEvent<number>) => {
        const selectedOfficeId = event.target.value as number;
        setSelectedOffice(selectedOfficeId);
        console.log("Selected office ID:", selectedOfficeId);
        sessionStorage.setItem("office_id", selectedOfficeId.toString());
    };
    const handleStartWorking = () => {
        
        router.push('/ticket-01');
    };



    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <CircularProgress size="5rem" />
            </div>
        );
    }

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
                    Chào mừng bạn <span className={styles.titleName}>{userName}</span> đến
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
                        value={selectedOffice}
                        onChange={handleOfficeChange}
                    >
                        {offices.map((office) => (
                            <MenuItem key={office.id} value={office.id}>
                                {office.name}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <br />
                <Button onClick={handleStartWorking}  disabled={selectedOffice === ''} style={{ width: '80%' }} variant="contained">
                    Bắt đầu làm việc
                </Button>
            </div>
        </section>
    );
}


