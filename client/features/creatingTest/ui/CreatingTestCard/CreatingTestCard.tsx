'use client';

import Button from '@/app/shared/ui/Button/Button';
import Card from '@/app/shared/ui/Card/Card';
import Input from '@/app/shared/ui/Input/Input';
import Title from '@/app/shared/ui/Title/Title';
import Text from '@/app/shared/ui/Text/Text';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { shema } from '../../model/shema';
import { CreateTest, createTestPayload, Theme } from '../../model/types';
import style from './CreatingTestCard.module.css';
import ErrorMessage from '@/app/shared/ui/Error/Error';

type Props = { themes: Theme[]; handleCreate: (data: createTestPayload) => Promise<void> };

export default function CreatingTestCard({ themes, handleCreate }: Props) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<CreateTest>({
    resolver: yupResolver(shema),
    defaultValues: {
      name: '',
      themeId: '',
      countQustion: 10,
    },
  });
  const onSubmit = async (data: createTestPayload) => {
    try {
      handleCreate(data);
    } catch (error) {
      if (typeof error === 'string') {
        setError('root', { type: 'validate', message: error });
      } else {
        setError('root', { type: 'validate', message: 'Неизвестная ошибка' });
      }
    }
  };
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <Title>Создание теста</Title>
          <Text>Выберите тему и количество вопросов для вашего теста</Text>
        </div>
        <div>
          <div className={style.wrap}>
            <Card>
              <form className={style.form} action="" onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formItem}>
                  <Text>Название теста</Text>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input placeholder="Название теста" {...field} />}
                  />
                  {errors.name?.message && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
                </div>
                <div className={style.formItem}>
                  <Text>Тема теста</Text>
                  <Controller
                    name="themeId"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option>Выберите тему теста</option>
                        {themes &&
                          themes.map((t) => (
                            <option value={t.id} key={t.id}>
                              {t.theme}
                            </option>
                          ))}
                      </select>
                    )}
                  />
                  {errors.themeId?.message && (
                    <ErrorMessage>{errors.themeId?.message}</ErrorMessage>
                  )}
                </div>
                <div className={style.formItem}>
                  <Text>Количество вопросов</Text>
                  <Controller
                    name="countQustion"
                    control={control}
                    render={({ field }) => <input type="range" max={15} {...field} />}
                  />
                  {errors.countQustion?.message && (
                    <ErrorMessage>{errors.countQustion?.message}</ErrorMessage>
                  )}
                </div>
                {errors.root?.message && <ErrorMessage>{errors.root?.message}</ErrorMessage>}
                <Button>Создать тест</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
