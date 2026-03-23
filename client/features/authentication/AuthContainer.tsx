import style from './AuthContainer.module.css';
import { usePathname } from 'next/navigation';
import { PAGES } from '../../app/src/config/pages';
import AuthorizationCard from './ui/AuthorizationCard/AuthorizationCard';
import RegistrationCard from './ui/RegistrationCard/RegistrationCard';

export default function AuthContainer() {
  const pathname = usePathname();
  const isLogin = pathname === PAGES.AUTHORIZATION;
  const isRegistration = pathname === PAGES.REGISTRATION;

  if (isLogin) {
    return (
      <div className={style.wrap}>
        <AuthorizationCard />
      </div>
    );
  }
  if (isRegistration) {
    return (
      <div className={style.wrap}>
        <RegistrationCard />
      </div>
    );
  }
}
