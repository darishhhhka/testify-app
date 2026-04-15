import * as yup from 'yup';

export const shemaRegister = yup.object().shape({
  login: yup.string().required('Введите логин'),
  password: yup
    .string()
    .required('Введите логин')
    .min(6, 'Пароль должен содержать минимум 6 символов'),

  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),

  role: yup.string().oneOf(['teacher', 'student']).required('Выберете роль'),
});

export const shemaLogin = yup.object().shape({
  login: yup.string().required('Введите логин'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
});
