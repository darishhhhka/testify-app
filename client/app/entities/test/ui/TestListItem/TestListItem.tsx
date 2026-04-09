import style from './TestListItem.module.css';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/store';
import { deleteMyTest } from '../../model/testSlice';
import { fetchTestAttemp } from '../../model/testSlice';
import { useRouter } from 'next/navigation';
import { PAGES } from '../../../../shared/config/pages';
import { Calendar, Users, Award, Trash2, Share2 } from 'lucide-react';
import { CreatedTests, PassedTests } from '@/app/entities/test/model/types';
import Card from '@/app/shared/ui/Card/Card';

type Props = { test: (CreatedTests & { type: 'created' }) | (PassedTests & { type: 'passed' }) };

export default function TestListItem({ test }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userRole = useAppSelector((state) => state.user.role);

  const deleted = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (test.type === 'created') {
        console.log('testId', test.id);

        await dispatch(deleteMyTest({ testId: test.id })).unwrap();
      }
    } catch (e) {
      alert(e);
    }
  };

  const openTestAttempt = async () => {
    try {
      if (test.type === 'passed') {
        router.push(`${PAGES.FINISH_TEST}/${test.testAttemptId.toString()}`);
      }
    } catch (error) {}
  };

  const openTest = async () => {
    if (test.type === 'created') {
      router.push(`${PAGES.MY_TESTS}/${test.id.toString()}`);
    }
  };

  const click = () => {
    if (test.type === 'created') {
      openTest();
    }
    if (test.type === 'passed') {
      openTestAttempt();
    }
  };

  return (
    <div onClick={click} className={style.testListItem}>
      <h4 className={style.title}>{test.name}</h4>
      <div className={style.subInfoContainer}>
        <div className={style.subInfo}>
          <Calendar size={18} color="#474747" />
          {test.type === 'created' ? (
            <div className={style.item}>{test.createdAt.split('T')[0]}</div>
          ) : (
            <div className={style.item}>{test.updatedAt.split('T')[0]}</div>
          )}
        </div>
        {test.type === 'created' ? (
          <div className={style.subInfo}>
            <Users size={18} color="#474747" />
            <div className={style.item}>{`${test.participantsCount} прошли`}</div>
          </div>
        ) : (
          <div className={style.subInfo}>
            <Award size={18} />
            <div className={style.item}>
              {test.score}/{test.countQuestion}
            </div>
          </div>
        )}
      </div>
      {test.type !== 'passed' && (
        <div className={style.actions}>
          <div className={`${style.icon} ${style.deletedIcon}`} onClick={deleted}>
            <Trash2 size={22} />
          </div>
          <div className={`${style.icon} ${style.shareIcon}`}>
            <Share2 size={22} />
          </div>
        </div>
      )}
    </div>
  );
}
