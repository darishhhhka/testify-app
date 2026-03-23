import { Check } from 'lucide-react';
import { Question } from '../../store/models/testModel';
import Card from '../Card/Card';
import style from './QuestionCard.module.css';

type Props = {
  question: Question;
  index: number;
  type: 'check' | 'passing';
  selectAnswer: (
    questionId: number,
    userAnswer: number,
    type: 'checkbox' | 'radio',
    checked?: boolean,
  ) => void;
  selectTextAnswer: (questionId: number, userAnswer: string) => void;
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
  };

  return (
    <Card>
      <div className={style.item}>
        <div>
          <h5 className={style.question}>{`${index + 1}. ${question.question}`}</h5>
        </div>
        <div className={style.answersList}>
          {question.answers.map((a) => (
            <label
              htmlFor={a.id.toString()}
              className={`${style.answerItem} ${a.correct ? style.right : ''}`}
              key={a.id}
            >
              {a.correct && type === 'check' && <Check color="#38a169" />}
              {typeInput[question.type] === 'radio' && type === 'passing' && (
                <input
                  id={a.id.toString()}
                  type={typeInput[question.type]}
                  name={question.id.toString()}
                  value={a.id}
                  onChange={() => selectAnswer(question.id, a.id, 'radio')}
                />
              )}
              {typeInput[question.type] === 'checkbox' && type === 'passing' && (
                <input
                  id={a.id.toString()}
                  type={typeInput[question.type]}
                  name={question.id.toString()}
                  value={a.id}
                  onChange={(e) => selectAnswer(question.id, a.id, 'checkbox', e.target.checked)}
                />
              )}
              {typeInput[question.type] === 'text' && type === 'passing' && (
                <input
                  id={a.id.toString()}
                  name={question.id.toString()}
                  onChange={(e) => selectTextAnswer(question.id, e.target.value)}
                />
              )}
              {type === 'check' && typeInput[question.type] === 'text' && a.text}
              {typeInput[question.type] !== 'text' && a.text}
              {a.correct && type === 'check' && (
                <span className={style.right}>(правильный ответ)</span>
              )}
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
}
