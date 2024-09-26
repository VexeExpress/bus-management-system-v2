// app/login/page.tsx
'use client';
import styles from '../../styles/module/LoginPage.module.css';
export default function LoginPage() {
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

                        <form action="" className={styles.login_form}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input type="text" id='username' className={styles.input} required />
                            <label htmlFor="password" >Mật khẩu</label>
                            <input type="password" id='password' className={styles.input} required />
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


