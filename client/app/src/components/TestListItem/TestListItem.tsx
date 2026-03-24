import { PassedTests, CreatedTests } from '../../store/models/testModel';
import style from './TestListItem.module.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { deleteMyTest } from '../../../entities/test/testSlice';
import { fetchTestAttemp } from '../../../entities/test/testSlice';
import { useRouter } from 'next/navigation';
import { PAGES } from '../../config/pages';
import { Calendar, Users, Award, Trash2, Share2 } from 'lucide-react';

type Props = { test: (CreatedTests & { type: 'created' }) | (PassedTests & { type: 'passed' }) };

export default function TestListItem({ test }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log(test);

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
        await dispatch(fetchTestAttemp({ testAttempId: test.testAttemptId }));
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
      <div className={style.actions}>
        <div onClick={deleted}>
          <Trash2 size={22} color="#474747" />
        </div>
        <Share2 size={22} color="#474747" />
      </div>
    </div>
  );
}
