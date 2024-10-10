"use client";
import 'react-toastify/dist/ReactToastify.css';
import { Metadata } from 'next';
import { Provider } from 'react-redux';
import store from '../modules/auth/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/font.css';

// Xuất metadata từ Server Component
// export const metadata: Metadata = {
//   title: 'VexeExpress',
//   description: 'Nền tảng kết nối người dùng và nhà xe',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: '0px', boxSizing: 'border-box', fontFamily: 'Rounded' }}>
        <Provider store={store}>
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
