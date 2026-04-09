'use client';

import Auth from '../../../features/authentication/AuthContainer';
import { useAppSelector } from '../../shared/store/store';

export default function Login() {
  const user = useAppSelector((state) => state.user);
  return (
    <div>
      <Auth />
    </div>
  );
}
