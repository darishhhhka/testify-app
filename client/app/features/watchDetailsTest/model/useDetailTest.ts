import { fetchTest } from '@/app/entities/test/model/testSlice';
import { useAppDispatch, useAppSelector } from '@/app/shared/store/store';
import { Axios, AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useDetailTest = () => {
  const [error, setError] = useState<string>();
  const params = useParams<{ sharedToken: string }>();
  const dispatch = useAppDispatch();
  const test = useAppSelector((state) => state.test.currentTest);
  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(
          fetchTest({ sharedToken: params.sharedToken, includeAnswers: true }),
        ).unwrap();
      } catch (error) {
        if (typeof error === 'string') setError(error);
      }
    };
    load();
  }, [dispatch, params.sharedToken]);

  return {
    test,
    error,
  };
};
