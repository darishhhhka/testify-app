'use client';

import { useAppDispatch, useAppSelector } from '@/app/shared/store/store';
import { fetchTestAttemp } from '@/app/entities/test/model/testSlice';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import TestView from '@/app/entities/test/ui/TestView/TestView';
import { Award } from 'lucide-react';

export default function PassedTestAteempt() {
  const { attempId } = useParams<{ attempId: string }>();
  const dispatch = useAppDispatch();
  const attempt = useAppSelector((state) => state.test.currentTestAttempt);
  useEffect(() => {
    const loadAttempt = async () => {
      try {
        await dispatch(fetchTestAttemp({ testAttempId: parseInt(attempId) }));
      } catch (error) {
        alert(error);
      }
    };

    loadAttempt();
  }, [attempId, dispatch]);

  if (!attempt.test) return;

  return <TestView test={attempt.test} score={attempt.score} type="review" />;
}
