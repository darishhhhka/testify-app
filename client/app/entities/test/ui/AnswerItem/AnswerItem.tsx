import Card from '@/app/shared/ui/Card/Card';
import { Answer } from '../../model/types';
import Text from '@/app/shared/ui/Text/Text';
import { usePassingTest } from '@/features/passingTest/model/usePassingTest';
import QuestionStatus from '@/app/shared/ui/QuestionStatus/QuestionStatus';
import style from './AnswerItem.module.css';

type Props = {
  answer: Answer;
  typeView: 'check' | 'passing' | 'review';
  answerType: 'checkbox' | 'text' | 'radio';
  questionId: number;
  isCorect?: boolean;
  selectAnswer?: (
    questionId: number,
    userAnswer: number,
    type: 'checkbox' | 'radio',
    checked?: boolean,
  ) => void;
  selectTextAnswer?: (questionId: number, userAnswer: string) => void;
};

export default function AnswerItem({
  answer,
  answerType,
  typeView,
  questionId,
  isCorect,
  selectAnswer,
  selectTextAnswer,
}: Props) {
  const viewStatus = isCorect !== undefined;
  return (
    <label htmlFor={answer.id.toString()}>
      <Card
        className={`${style.answer} ${viewStatus && (isCorect && typeView === 'review' ? style.right : style.error)}`}
      >
        {typeView === 'passing' && (
          <>
            {answerType === 'radio' && (
              <input
                id={answer.id.toString()}
                type={answerType}
                name={questionId.toString()}
                value={answer.id}
                onChange={() => {
                  console.log('CLIK');
                  console.log(selectAnswer);

                  selectAnswer?.(questionId, answer.id, 'radio');
                }}
              />
            )}
            {answerType === 'checkbox' && (
              <input
                id={answer.id.toString()}
                type={answerType}
                name={questionId.toString()}
                value={answer.id}
                onChange={(e) =>
                  selectAnswer?.(questionId, answer.id, 'checkbox', e.target.checked)
                }
              />
            )}
            {answerType === 'text' && (
              <input
                id={answer.id.toString()}
                name={questionId.toString()}
                onChange={(e) => selectTextAnswer?.(questionId, e.target.value)}
              />
            )}
          </>
        )}
        {typeView === 'check' && answer.correct && <QuestionStatus isCorrect />}
        {typeView === 'review' && (
          <>
            {viewStatus &&
              (isCorect ? <QuestionStatus isCorrect /> : <QuestionStatus isCorrect={false} />)}
          </>
        )}
        {((answerType !== 'text' && typeView === 'passing') ||
          typeView === 'check' ||
          typeView === 'review') && <Text>{answer.text}</Text>}
      </Card>
    </label>
  );
}
