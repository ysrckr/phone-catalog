import { MobileNav } from '@/components/MobileNav';
import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <MobileNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
