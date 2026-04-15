import { Controller, useForm } from 'react-hook-form';
import Input from '../../../../shared/ui/Input/Input';
import Button from '../../../../shared/ui/Button/Button';
import Form from '../Form/Form';
import { Registration } from '../../model/types';
import { useAuth } from '../../model/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { shemaRegister } from '../../model/shema';
import ErrorMessage from '@/app/shared/ui/Error/Error';
import RegistrationRadio from '@/app/shared/ui/RegistrationRadio/RegistrationRadio';
import style from './RegistrationCard.module.css';
import Text from '@/app/shared/ui/Text/Text';

export default function RegistrationCard() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Registration>({
    resolver: yupResolver(shemaRegister),
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
  });
  const roles = ['teacher', 'student'] as const;
  const submit = useAuth();

  const submitHandle = async (data: Registration) => {
    try {
      await submit(data, 'register');
    } catch (error) {
      if (typeof error === 'string') {
        setError('root', { type: 'validation', message: error });
      } else {
        setError('root', { message: 'Неизветсная ошибка' });
      }
    }
  };

  return (
    <Form type="registration" onSubmit={handleSubmit(submitHandle)}>
      <Text>Я регистрируюсь как</Text>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <div className={style.radioList}>
            {roles.map((r) => (
              <RegistrationRadio
                key={r}
                type="radio"
                id={r}
                role={r}
                value={r}
                onChange={field.onChange}
                checked={field.value === r}
              />
            ))}
          </div>
        )}
      />
      {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
      <Controller
        name="login"
        control={control}
        render={({ field }) => (
          <Input label="Логин" id="login" placeholder="Login" type="text" {...field} />
        )}
      />
      {errors.login && <ErrorMessage>{errors.login.message}</ErrorMessage>}

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input label="Пароль" id="password" placeholder="Password" type="password" {...field} />
        )}
      />
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            label="Повторите пароль"
            id="confirm-password"
            placeholder="Password"
            type="password"
            {...field}
          />
        )}
      />
      {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
      <Button>Зарегистрироваться</Button>
    </Form>
  );
}
