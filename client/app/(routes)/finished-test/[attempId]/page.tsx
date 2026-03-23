'use client';

import QuestionAttempt from '@/app/src/components/QuestionAttempt/QuestionAttempt';
import { useAppDispatch, useAppSelector } from '@/app/src/store/store';
import { fetchTestAttemp } from '@/app/src/store/testSlice';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

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

  return (
    <div>
      <h1>{attempt.test?.name}</h1>
      <div>
        {attempt.test?.questions.map(({ id, question, answers, userAnswer }) => (
          <QuestionAttempt
            key={id}
            id={id}
            question={question}
            answers={answers}
            userAnswer={userAnswer}
          />
        ))}
      </div>
    </div>
  );
}
