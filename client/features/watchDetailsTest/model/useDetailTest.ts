import { fetchTest } from '@/app/entities/test/model/testSlice';
import { useAppDispatch, useAppSelector } from '@/app/shared/store/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useDetailTest = () => {
  const [error, setError] = useState<string>();
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
        if (typeof error === 'string') setError(error);
      }
    };
    load();
  }, [dispatch]);

  return {
    test,
    error,
  };
};
