import { Controller, useForm } from 'react-hook-form';
import style from './AuthorizationCard.module.css';
import Button from '../../../../shared/ui/Button/Button';
import Form from '../Form/Form';
import Input from '@/app/shared/ui/Input/Input';
import { Authorization } from '../../model/types';
import { useAuth } from '../../model/useAuth';
import ErrorMessage from '@/app/shared/ui/Error/Error';
import { yupResolver } from '@hookform/resolvers/yup';
import { shemaLogin } from '../../model/shema';

export default function AuthorizationCard() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Authorization>({
    resolver: yupResolver(shemaLogin),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const submit = useAuth();

  const submitHandle = async (data: Authorization) => {
    try {
      await submit(data, 'login');
    } catch (error) {
      if (typeof error === 'string') {
        setError('root', { type: 'validation', message: error });
      } else {
        setError('root', { message: 'Неизветсная ошибка' });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitHandle)} type="authorization">
      <>
        <Controller
          name="login"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Login"
              label="Логин"
              id="login"
              className={style.input}
              type="text"
            />
          )}
        />
        {errors.login && <ErrorMessage>{errors.login.message}</ErrorMessage>}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Password"
              label="Пароль"
              id="password"
              className={style.input}
              type="password"
              {...field}
            />
          )}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        <Button>Войти</Button>
      </>
    </Form>
  );
}
