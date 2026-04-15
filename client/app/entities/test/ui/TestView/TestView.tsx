import Card from '@/app/shared/ui/Card/Card';
import QuestionCard from '@/app/entities/test/ui/QuestionCard/QuestionCard';
import Title from '@/app/shared/ui/Title/Title';
import { Test } from '../../model/types';
import style from './TestView.module.css';
import { Award } from 'lucide-react';
import Text from '@/app/shared/ui/Text/Text';
import Line from '@/app/shared/ui/Line/Line';

type Props = {
  test: Omit<Test, 'sharedToken'>;
  type: 'passing' | 'check' | 'review';
  score?: number | null;
  selectAnswer?: (
    questionId: number,
    userAnswer: number,
    type: 'checkbox' | 'radio',
    checked?: boolean,
  ) => void;
  selectTextAnswer?: (questionId: number, userAnswer: string) => void;
};

export default function TestView({ test, type, score, selectAnswer, selectTextAnswer }: Props) {
  return (
    <div className={style.wrap}>
      <div className={style.container}>
        <Card className={style.card}>
          {type === 'review' ? (
            <div className={style.head}>
              <Award className={style.icon} />
              <Title>{test.name}</Title>
              <Card className={style.result}>
                <Text>
                  Ваш результат:{' '}
                  <span className={style.scores}>
                    {score} из {test.questions.length}
                  </span>{' '}
                </Text>
              </Card>
              <Line />
            </div>
          ) : (
            <Title>{test.name}</Title>
          )}
          <div className={style.questions}>
            {test.questions.map((q, index) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={index}
                type={type}
                selectAnswer={selectAnswer}
                selectTextAnswer={selectTextAnswer}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
