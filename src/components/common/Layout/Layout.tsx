import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const Layout: FC = () => (
  <main className="flex h-screen flex-col">
    <Navbar />
    <div className="mt-16 grow">
      <Outlet />
    </div>
    <Footer />
  </main>
);

export default Layout;
