'use client';
import { useSelector } from "react-redux";
import styles from "../../styles/module/RoomWork.module.css";
import SelectOffice from "@/modules/office/components/SelectOffice";
import { RootState } from "@/redux/store";
export default function RoomWork() {
    const username = useSelector((state: RootState) => state.auth.user?.name);
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
                    Chào mừng bạn <span className={styles.titleName}>{username || ""}</span> đến
                    với phần mềm quản lý bán vé xe khách! Vui lòng chọn phòng vé của bạn
                    để bắt đầu
                </span>
                <br />
                <SelectOffice/>
            </div>
        </section>
    );
}


