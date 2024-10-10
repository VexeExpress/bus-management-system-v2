'use client';

import React from "react";
import styles from '../styles/module/LoginPage.module.css';
import LoginForm from '@/modules/auth/components/LoginForm';
export default function Home() {

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

            <LoginForm />
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
