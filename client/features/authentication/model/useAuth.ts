import { useAppDispatch } from '@/app/src/store/store';
import { Authorization, Registration } from './types';
import { login, registration } from '@/app/src/store/userSlice';
import { useRouter } from 'next/navigation';
import { PAGES } from '@/app/src/config/pages';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = async (data: Authorization | Registration, type: 'login' | 'register') => {
    try {
      if (type === 'login') {
        await dispatch(login(data)).unwrap();
        router.push(PAGES.MY_TESTS);
      }
      if (type === 'register' && 'confirmPassword' in data) {
        if (data.password !== data.confirmPassword) {
          throw new Error('Пароли не совпадают');
        }
        await dispatch(
          registration({ login: data.login, password: data.password, role: data.role }),
        );
        router.push(PAGES.MY_TESTS);
      }
    } catch (error) {
      throw error;
    }
  };
  return auth;
};
