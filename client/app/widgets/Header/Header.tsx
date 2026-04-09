'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '../NavBar/Navbar';
import style from './Header.module.css';

export const Header = () => {
  const path = usePathname();
  const isActive = ['authorization', 'registration'].some((p) => path.includes(p));
  return (
    <>
      {!isActive && (
        <header className={style.header}>
          <Navbar />
        </header>
      )}
    </>
  );
};
