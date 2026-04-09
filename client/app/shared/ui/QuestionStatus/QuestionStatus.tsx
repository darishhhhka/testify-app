import { Check, X } from 'lucide-react';
import style from './QuestionStatus.module.css';

type Props = { isCorrect: boolean; shape?: boolean; size?: 'md' | 'sm' };

export default function QuestionStatus({ isCorrect, shape = false, size = 'sm' }: Props) {
  return (
    <div className={`${style.wrap} ${shape ? (isCorrect ? style.greenBg : style.redBg) : ''}`}>
      {isCorrect ? (
        <Check className={`${style.green} ${style[size]} `} />
      ) : (
        <X className={`${style.red} ${style[size]}`} />
      )}
    </div>
  );
}
