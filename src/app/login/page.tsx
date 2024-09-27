// app/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from '../../styles/module/LoginPage.module.css';
import { login } from '@/services/Auth/auth_v1';
import Toast from '@/lib/toast';
import RoomWork from '../room-work/page';
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn chặn reload trang khi gửi form
        try {
            const data = await login(username, password);
            console.log("ID User: " + data);
            sessionStorage.setItem('user_id', data);
            Toast.success("Đăng nhập thành công!")
            setTimeout(() => {
                router.push('/room-work');
            }, 2000);
        } catch (error: any) {
            console.log(error);
            Toast.error(error.message);
        }
    };
    return (
        <section className={styles.container}>
            <div className={styles.left}>
                <div className={styles.centered_content}>
                    <div className={styles.login_container}>
                        <div>
                            <img src="/static/logo4.png" alt="Logo" width={250} />
                        </div>
                        <div className={styles.login_heading}>
                            <span>Chúc bạn có một ngày làm việc hiệu quả!</span>
                        </div>

                        <form onSubmit={handleLogin} className={styles.login_form}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input type="text" id='username' className={styles.input} required value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <label htmlFor="password" >Mật khẩu</label>
                            <input type="password" id='password' className={styles.input} required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            <button type="submit" className={styles.submit_button}>Đăng nhập</button>
                        </form>
                        <div className={styles.login_footer}>
                            <span>Liên hệ Hotline: 0877 71 7575 nếu gặp sự cố đăng nhập</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>

            </div>
        </section>
    );
}


