import style from './QuestionAttempt.module.css';
import { type Question } from '../../store/models/testAttempModel';

export default function QuestionAttempt({ id, question, answers, userAnswer }: Question) {
  return (
    <div className={style.question}>
      <h5 className={style.title}>{question}</h5>
      <div>
        {answers?.map((q) => (
          <div key={q.id}>{q.text}</div>
        ))}
      </div>
    </div>
  );
}
