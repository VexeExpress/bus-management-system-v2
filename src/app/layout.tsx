"use client";
import 'react-toastify/dist/ReactToastify.css';
import { Metadata } from 'next';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/font.css';
import { PersistGate } from 'redux-persist/integration/react';

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
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
