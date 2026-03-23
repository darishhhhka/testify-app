'use client';

import Card from '@/app/src/components/Card/Card';
import style from './UploadFilePage.module.css';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { $host } from '@/app/src/api';
import Button from '@/app/src/components/Button/Button';
import Title from '@/app/src/components/Title/Title';

export default function UploadFilePage() {
  const [file, setFile] = useState<File | null>(null);

  const submit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await $host.post('/api/test/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Beaver ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.wrap}>
      <div className={style.content}>
        <div className={style.head}>
          <Title>Загрузка теста из файла</Title>
          <div className={style.subTitle}>
            Импортируйте готовый тест из файла в поддерживаемом формате
          </div>
        </div>
        <div className={style.block_wrap}>
          <Card>
            <h5>Выберите файл</h5>
            <form className={style.input_wrap} onSubmit={submit}>
              <Upload size={50} color="#474747" />

              <input
                className={style.input_file}
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) setFile(selectedFile);
                }}
              />

              <span>{file?.name}</span>
              <Button>Отправить</Button>
            </form>
          </Card>
          <Card>
            <div>
              <h5>Формат TXT</h5>
              <div>Простой текстовый формат</div>
              <div className={style.card_content}>
                Название теста: Математика <br /> <br />
                Вопрос 1: Сколько будет 2+2?
                <br /> a) 3 <br />
                b) 4 [правильный]
                <br /> c) 5 <br />
                d) 6 <br /> <br />
                Вопрос 2: Что такое число π?
                <br /> a) 3.14 [правильный] <br />
                b) 2.71 <br />
                c) 1.41 <br />
                d) 4.0
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
