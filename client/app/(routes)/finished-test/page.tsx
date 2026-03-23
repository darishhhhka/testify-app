'use client';

import { useEffect } from 'react';
import TestPage from '../../src/components/TestsListPage/TestListPage';
import { useAppDispatch, useAppSelector } from '../../src/store/store';
import { fetchPassedTest } from '../../src/store/testSlice';

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
      <TestPage title="Пройденные тесты" tests={passsedTests.passedTests} />
    </div>
  );
}
