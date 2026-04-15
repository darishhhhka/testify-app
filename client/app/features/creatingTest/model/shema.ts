import * as yup from 'yup';

export const shema = yup.object().shape({
  name: yup.string().required('Введите название теста'),
  themeId: yup.string().required('Выбериете тему'),
  countQustion: yup.number().required('Выберите количество вопросов'),
});
