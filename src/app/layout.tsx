import Footer from '@/common/components/common/layout/footer/Footer.component';
import styles from '@/common/styles/_global.module.scss';
import Navbar from '@/common/components/common/layout/navbar/Navbar.component';
import { AuthProvider, User } from '@/contexts/authProvider/Auth.provider';
import 'react-toastify/dist/ReactToastify.css';
import { restoreUserSession } from '@/utils/cookies';
import { ToastContainer } from 'react-toastify';
import {} from 'react-cookie';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: User = await restoreUserSession();

  return (
    <html lang="pl">
      <head />
      <body className={styles.body}>
        <AuthProvider user={user}>
          <Navbar />
          {children}
          <Footer />
          <Modal />
        </AuthProvider>
      </body>
    </html>
  );
}

const Modal = () => {
  'use client';
  return <ToastContainer />;
};
