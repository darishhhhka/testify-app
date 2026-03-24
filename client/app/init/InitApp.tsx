'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../src/store/store';
import { check } from '../../features/authentication/model/userSlice';
import { redirect, usePathname } from 'next/navigation';
import { PAGES } from '../src/config/pages';

export default function InitApp() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  useEffect(() => {
    const loadData = async () => {
      try {
        if (path !== PAGES.AUTHORIZATION && path !== PAGES.REGISTRATION && path !== '/') {
          await dispatch(check()).unwrap();
          console.log('Отработал check');
        }
      } catch (error) {
        redirect(PAGES.AUTHORIZATION);
        alert(error);
      }
    };
    loadData();
  }, []);
  return null;
}
