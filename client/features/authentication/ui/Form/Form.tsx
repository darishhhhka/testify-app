import React, { FormHTMLAttributes } from 'react';
import style from './Form.module.css';
import Link from 'next/link';
import { PAGES } from '@/app/shared/config/pages';
import Title from '@/app/shared/ui/Title/Title';

type Props = {
  type: 'registration' | 'authorization';
  children: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export default function Form({ type, children, ...props }: Props) {
  return (
    <div className={style.wrap}>
      <div className={style.head}>
        {type === 'authorization' ? (
          <>
            <Title>Вход</Title>
            <div className={style.subTitle}>Войдите в свой аккаунт</div>
          </>
        ) : (
          <>
            <Title>Регистрация</Title>
            <div className={style.subTitle}>Создайте новый аккаунт</div>
          </>
        )}
      </div>
      <form className={style.card} {...props} action="">
        {children}
      </form>
      <div className={style.foot}>
        {type === 'authorization' ? (
          <div className={style.subTitle}>
            Нет аккаунта?
            <Link className={style.subTitle_blue} href={PAGES.REGISTRATION}>
              Зарегистрируйтесь
            </Link>
          </div>
        ) : (
          <div className={style.subTitle}>
            Уже есть аккаунт{' '}
            <Link className={style.subTitle_blue} href={PAGES.AUTHORIZATION}>
              Войти
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
