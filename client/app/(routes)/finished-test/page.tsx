'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/store/store';
import { fetchPassedTest } from '../../entities/test/model/testSlice';
import TestListPage from '../../entities/test/ui/TestsListPage/TestListPage';

export default function FinishedTestPage() {
  const dispatch = useAppDispatch();
  const { checked, id } = useAppSelector((state) => state.user);
  const passsedTests = useAppSelector((state) => state.test.passed);

  useEffect(() => {
    const loadTest = async () => {
      if (!checked) return;
      if (passsedTests.status === 'succes') return;
      try {
        await dispatch(fetchPassedTest({ userId: id })).unwrap();
      } catch (error) {
        alert(error);
      }
    };

    loadTest();
  }, [id, checked, dispatch, passsedTests.status]);

  return (
    <div>
      <TestListPage title="Пройденные тесты" tests={passsedTests.passedTests} />
    </div>
  );
}
