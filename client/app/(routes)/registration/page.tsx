import Auth from '../../features/authentication/AuthContainer';
import { useAppSelector } from '@/app/shared/store/store';

export default function Registration() {
  return (
    <div>
      <Auth />
    </div>
  );
}
