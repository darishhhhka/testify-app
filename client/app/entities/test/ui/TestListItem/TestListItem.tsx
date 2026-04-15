import style from './TestListItem.module.css';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/store';
import { deleteMyTest } from '../../model/testSlice';
import { usePathname, useRouter } from 'next/navigation';
import { PAGES } from '../../../../shared/config/pages';
import { Calendar, Users, Award, Trash2, Share2 } from 'lucide-react';
import { CreatedTests, PassedTests } from '@/app/entities/test/model/types';
import DeleteTest from '@/app/features/test/deleteTest/ui/DeleteTestButton';
import SharedTest from '@/app/features/test/sharedTest/ui/SharedTest/SharedTest';

type Props = { test: (CreatedTests & { type: 'created' }) | (PassedTests & { type: 'passed' }) };

export default function TestListItem({ test }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
      router.push(`${PAGES.MY_TESTS}/${test.sharedToken}`);
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

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (test.type === 'created') {
      const link = `${window.location.origin}${PAGES.PASSING_TEST}/${test.sharedToken}`;
      console.log(link);

      await navigator.clipboard.writeText(link);
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
          <DeleteTest testId={test.id} />
          <SharedTest sharedToken={test.sharedToken} name={test.name} />
        </div>
      )}
    </div>
  );
}
