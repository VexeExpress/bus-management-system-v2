import type { Metadata } from "next";
import '@/styles/font.css';


export const metadata: Metadata = {
  title: 'VexeExpress',
  description: 'Nền tảng kết nối người dùng và nhà xe',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body style={{ margin: '0px', boxSizing: 'border-box', fontFamily: 'Rounded' }}>
          {children}
      </body>
    </html>

  );
}
