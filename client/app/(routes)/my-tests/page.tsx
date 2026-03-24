'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../src/store/store';
import { fetchMyTest } from '../../entities/test/testSlice';
import TestPage from '../../src/components/TestsListPage/TestListPage';

export default function MyTests() {
  const { id, checked } = useAppSelector((state) => state.user);
  const test = useAppSelector((state) => state.test.created);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!checked) return;
    if (test.status === 'succes') return;
    const loadTest = async () => {
      try {
        await dispatch(fetchMyTest({ userId: id })).unwrap();
      } catch (error) {
        alert(error);
      }
    };
    loadTest();
  }, [id, dispatch, checked, test.status]);
  console.log('Шаг 1', test.createdTest);

  return (
    <div>
      <TestPage title="Мои тесты" tests={test.createdTest} />
    </div>
  );
}
