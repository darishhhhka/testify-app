import { fetchTest } from '@/app/entities/test/model/testSlice';
import { useAppDispatch, useAppSelector } from '@/app/shared/store/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { $authHost } from '@/app/shared/api';

export const usePassingTest = () => {
  const [error, setError] = useState<string>();
  const [answer, setAnswer] = useState<Record<number, number[] | string>>({});
  const params = useParams<{ testId: string }>();
  const dispatch = useAppDispatch();
  const test = useAppSelector((state) => state.test.currentTest);

  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(fetchTest({ testId: parseInt(params.testId) })).unwrap();
      } catch (error) {
        if (typeof error === 'string') setError(error);
      }
    };
    load();
  }, [params.testId, dispatch]);

  useEffect(() => {
    console.log('тут ансверик', answer);
  }, [answer]);

  const selectAnswer = (
    questionId: number,
    userAnswer: number,
    type: 'checkbox' | 'radio',
    checked?: boolean,
  ) => {
    console.log('тут мы заходим в setAnswer');
    setAnswer((state) => {
      if (type === 'checkbox') {
        const currentAnswers = (state[questionId] as number[]) || [];
        if (checked) {
          return { ...state, [questionId]: [...currentAnswers, userAnswer] };
        }
        return {
          ...state,
          [questionId]: currentAnswers.filter((a) => a !== userAnswer),
        };
      } else {
        return { ...state, [questionId]: [userAnswer] };
      }
    });
  };

  const selectTextAnswer = (questionId: number, userAnswer: string) => {
    setAnswer((state) => ({ ...state, [questionId]: userAnswer }));
  };

  const submitTest = async () => {
    try {
      console.log('тут ансвер', answer);

      await $authHost.post('api/test-attemp', {
        testId: test.id,
        answer,
      });
    } catch (error) {
      console.log('rororor', error);

      if (typeof error === 'string') setError(error);
    }
  };

  return {
    test,
    selectAnswer,
    selectTextAnswer,
    submitTest,
    error,
  };
};
