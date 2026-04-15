import { deleteMyTest } from '@/app/entities/test/model/testSlice';
import { useAppDispatch } from '@/app/shared/store/store';
import style from './DeleteTestButton.module.css';
import { Trash2 } from 'lucide-react';

type Props = { testId: number };

export default function DeleteTest({ testId }: Props) {
  const dispatch = useAppDispatch();
  const deleted = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await dispatch(deleteMyTest({ testId })).unwrap();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={`${style.icon} ${style.deletedIcon}`} onClick={deleted}>
      <Trash2 size={22} />
    </div>
  );
}
