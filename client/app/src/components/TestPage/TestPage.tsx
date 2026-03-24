import Card from '../Card/Card';
import style from './TestPage.module.css';
import QuestionCard from '../QuestionCard/QuestionCard';
import Button from '../Button/Button';
import { useState } from 'react';
import { $host } from '../../api';
import { useRouter } from 'next/navigation';
import { PAGES } from '../../config/pages';
import { AxiosError } from 'axios';
import Title from '../Title/Title';
import { Test } from '@/app/entities/test/types';

export default function TestPage({ test, type }: { test: Test; type: 'passing' | 'check' }) {
  const router = useRouter();
  const [answer, setAnswer] = useState<Record<number, number[] | string>>({});

  const selectAnswer = (
    questionId: number,
    userAnswer: number,
    type: 'checkbox' | 'radio',
    checked?: boolean,
  ) => {
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
    console.log('Answer', answer);
  };

  const selectTextAnswer = (questionId: number, userAnswer: string) => {
    setAnswer((state) => ({ ...state, [questionId]: userAnswer }));
  };

  const submit = async () => {
    try {
      await $host.post(
        'api/test-attemp',
        {
          testId: test.id,
          answer,
        },
        {
          headers: {
            Authorization: `Beaver ${localStorage.getItem('token')}`,
          },
        },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('SERVER ERROR:', error.response?.data);
      } else {
        alert(error);
      }
    }
    // router.push(PAGES.FINISH_TEST);
  };

  return (
    <div className={style.wrap}>
      <div className={style.container}>
        <Card>
          <div>
            <Title>{test.name}</Title>
            <div className={style.questions}>
              {test.questions.map((q, index) => (
                <QuestionCard
                  selectAnswer={selectAnswer}
                  selectTextAnswer={selectTextAnswer}
                  key={q.id}
                  question={q}
                  index={index}
                  type={type}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
      {type === 'passing' && <Button onClick={submit}>Отправить</Button>}
    </div>
  );
}
