'use client';

import { $authHost } from '@/app/src/api';
import Button from '@/app/src/components/Button/Button';
import Card from '@/app/src/components/Card/Card';
import Title from '@/app/src/components/Title/Title';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import style from './CreatinfTest.module.css';
import Input from '@/app/src/components/Input/Input';
import Text from '@/app/src/components/Text/Text';
import { CreateTest } from './model/types';

export default function CreatingTest() {
  const [themes, setThemes] = useState<{ id: number; theme: string }[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const response = await $authHost.get('/api/test/get-all-theme');
        setThemes(response.data);
      } catch (error) {
        alert(error);
      }
    };
    load();
  }, []);

  const { handleSubmit, control } = useForm<CreateTest>({
    defaultValues: {
      name: '',
      themeId: '',
      countQustion: 10,
    },
  });

  const submit = async (data: { name: string; themeId: string; countQustion: number }) => {
    try {
      await $authHost.post('api/test', data);
    } catch (error) {
      alert(error);
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
              <form className={style.form} action="" onSubmit={handleSubmit(submit)}>
                <div className={style.formItem}>
                  <Text>Название теста</Text>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input placeholder="Название теста" {...field} />}
                  />
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
                </div>
                <div className={style.formItem}>
                  <Text>Количество вопросов</Text>
                  <Controller
                    name="countQustion"
                    control={control}
                    render={({ field }) => <input type="range" max={15} {...field} />}
                  />
                </div>
                <Button>Создать тест</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
