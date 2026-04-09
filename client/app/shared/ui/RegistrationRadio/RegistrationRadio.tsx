import { GraduationCap, UserCircle } from 'lucide-react';
import Card from '../Card/Card';
import style from './RegistrationRadio.module.css';
import Text from '../Text/Text';

type Props = { role: 'teacher' | 'student' } & React.InputHTMLAttributes<HTMLInputElement>;

export default function RegistrationRadio({ role, ...props }: Props) {
  return (
    <Card className={`${props.checked && style.active} ${style.card}`}>
      <label htmlFor={props.id} className={style.content}>
        <input className={style.input} type="radio" id={props.id} {...props} />

        {role === 'student' ? (
          <>
            <UserCircle color={props.checked ? '#2563eb' : 'black'} size={35} />
            <Text>Я ученик</Text>
          </>
        ) : (
          <>
            <GraduationCap color={props.checked ? '#2563eb' : 'black'} size={35} />
            <Text>Я учитель</Text>
          </>
        )}
      </label>
    </Card>
  );
}
