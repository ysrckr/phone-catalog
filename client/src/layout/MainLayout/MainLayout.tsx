import { MobileNav } from '@/components/MobileNav';
import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';
import { uiState } from '@/store/uiState';
import { Outlet } from 'react-router-dom';
import { useSnapshot } from 'valtio';

export const MainLayout = () => {
  const { isMobileNavOpen } = useSnapshot(uiState);

  return (
    <>
      <Header />
      {isMobileNavOpen ? (
        <MobileNav />
      ) : (
        <>
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
