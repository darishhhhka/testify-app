import Link from 'next/link';
import style from './UserMenu.module.css';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { PAGES } from '../../shared/config/pages';
import { Plus, Upload } from 'lucide-react';

type Props = { isOpen: boolean; onClose: () => void };

export default function UserMenu({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  const closeMenu = () => {
    onClose();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const visible = isOpen ? style.visible : '';
  return createPortal(
    <div className={`${visible} ${style.menu}`}>
      <Link href={PAGES.CREATING_TEST} onClick={closeMenu} className={style.btn}>
        <Plus color="rgb(37 99 235)" size={18} />
        <div className={style.btn_title}>
          Создать вручную <span className={style.subTitle}>Выбрать тему и вопросы </span>
        </div>
      </Link>
      <Link href={PAGES.UPLOAD_FILE} onClick={closeMenu} className={style.btn}>
        <Upload color="rgb(37 99 235)" size={18} />
        <div className={style.btn_title}>
          Загрузить файл<span className={style.subTitle}>Импортировать из файла</span>
        </div>
      </Link>
    </div>,
    document.body,
  );
}
