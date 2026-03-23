import { InputHTMLAttributes } from 'react';
import style from './Input.module.css';

type Props = { label?: string } & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, ...props }: Props) {
  return (
    <div className={style.inputWrap}>
      {label !== undefined && <label htmlFor={props.id}>{label}</label>}
      <input className={style.input} {...props} />
    </div>
  );
}
