import Button from '@/app/shared/ui/Button/Button';
import Card from '@/app/shared/ui/Card/Card';
import Title from '@/app/shared/ui/Title/Title';
import { Upload } from 'lucide-react';
import style from './UploadFileCard.module.css';
import { useUploadFile } from '../../model/useUploadFile';
import ErrorMessage from '@/app/shared/ui/Error/Error';

export default function UploadFileCard() {
  const { handleSubmit, setFile, file, error } = useUploadFile();
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
            <form className={style.input_wrap} onSubmit={handleSubmit}>
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
              {error && <ErrorMessage>{error}</ErrorMessage>}
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
