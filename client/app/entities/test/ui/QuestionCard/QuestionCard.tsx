import { Check, X } from 'lucide-react';
import Card from '../../../../shared/ui/Card/Card';
import style from './QuestionCard.module.css';
import { Answer, Question, UserAnswer } from '@/app/entities/test/model/types';
import Title from '@/app/shared/ui/Title/Title';
import Text from '@/app/shared/ui/Text/Text';
import AnswerItem from '../AnswerItem/AnswerItem';
import QuestionStatus from '@/app/shared/ui/QuestionStatus/QuestionStatus';
import { Arapey } from 'next/font/google';

type Props = {
  question: Question;
  index: number;
  type: 'check' | 'passing' | 'review';
  selectAnswer?: (
    questionId: number,
    userAnswer: number,
    type: 'checkbox' | 'radio',
    checked?: boolean,
  ) => void;
  selectTextAnswer?: (questionId: number, userAnswer: string) => void;
};

export default function QuestionCard({
  question,
  index,
  type,
  selectAnswer,
  selectTextAnswer,
}: Props) {
  const typeInput = {
    multiple: 'checkbox',
    single: 'radio',
    text: 'text',
  } as const;

  const correctAnswer = (answer: Answer, userAnswer: UserAnswer) => {
    if (Array.isArray(userAnswer.value)) {
      const isAnswer = userAnswer.value.some((a) => a === answer.id);
      if (isAnswer) {
        return answer.correct;
      }
    } else {
      return userAnswer.isCorrect;
    }
  };

  return (
    <Card className={style.wrap}>
      <>
        {type === 'review' &&
          (question.userAnswer.isCorrect ? (
            <QuestionStatus size="md" isCorrect shape />
          ) : (
            <QuestionStatus size="md" isCorrect={false} shape />
          ))}
      </>
      <div className={style.item}>
        <div>
          <Text size="lg">{`${index + 1}. ${question.question}`}</Text>
        </div>
        <div className={style.answersList}>
          {question.answers.map((a) => (
            <AnswerItem
              key={a.id}
              answer={a}
              typeView={type}
              answerType={typeInput[question.type]}
              questionId={question.id}
              isCorect={type === 'review' ? correctAnswer(a, question.userAnswer) : undefined}
              selectAnswer={selectAnswer}
              selectTextAnswer={selectTextAnswer}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
