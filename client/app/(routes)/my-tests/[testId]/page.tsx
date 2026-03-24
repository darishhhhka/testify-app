'use client';

import TestPage from '@/app/src/components/TestPage/TestPage';
import { useAppDispatch, useAppSelector } from '@/app/src/store/store';
import { fetchTest } from '@/app/entities/test/testSlice';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Test() {
  const params = useParams<{ testId: string }>();
  const dispatch = useAppDispatch();
  const test = useAppSelector((state) => state.test.currentTest);
  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(
          fetchTest({ testId: parseInt(params.testId), includeAnswers: true }),
        ).unwrap();
      } catch (error) {
        alert(error);
      }
    };
    load();
  }, [dispatch]);
  return <TestPage test={test} type="check" />;
}
