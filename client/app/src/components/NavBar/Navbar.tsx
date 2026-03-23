'use client';

import style from './Navbar.module.css';
import Button from '../Button/Button';
import Link from 'next/link';
import { PAGES } from '@/app/src/config/pages';
import { useState } from 'react';
import UserMenu from '../UserMenu/UserMenu';
import { FileText, CheckCircle, Plus, LogOut, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { setIsAuth, setUser, setChecked } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { deletedAllTests } from '../../store/testSlice';

export const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const path = usePathname();
  const activeBtn = path.includes('my-test') ? 'my-test' : 'passed-test';
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logout = () => {
    dispatch(setIsAuth({ isAuth: false }));
    dispatch(setUser({ id: null, login: '' }));
    dispatch(setChecked({ checked: false }));
    dispatch(deletedAllTests());
    localStorage.removeItem('token');
    router.replace(PAGES.AUTHORIZATION);
  };

  return (
    <>
      <nav className={style.wrap}>
        {user.isAuth && (
          <div className={style.navbar}>
            <div className={style.nav}>
              <Link
                href={PAGES.MY_TESTS}
                className={`${style.navItem} ${activeBtn === 'my-test' ? style.active : style.navItemColor}`}
              >
                <FileText color={activeBtn === 'my-test' ? '#1E88E5' : '#474747'} size={16} />
                <div> Мои тесты</div>
              </Link>
              <Link
                href={PAGES.FINISH_TEST}
                className={`${style.navItem} ${activeBtn === 'passed-test' ? style.active : style.navItemColor}`}
              >
                <CheckCircle
                  color={activeBtn === 'passed-test' ? '#1E88E5' : '#474747'}
                  size={16}
                />
                <div>Пройденные тесты</div>
              </Link>
            </div>
            <div className={style.nav}>
              <Button onClick={() => setIsOpen((state) => !state)}>
                <Plus size={16} /> Создать тест
              </Button>
              <div onClick={logout} className={style.logOut}>
                <LogOut size={16} color="#474747" />
              </div>
            </div>
          </div>
        )}
      </nav>
      <UserMenu onClose={() => setIsOpen(false)} isOpen={isOpen} />
    </>
    // (>)
  );
};
