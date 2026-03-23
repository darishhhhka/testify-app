import style from './Text.module.css';

export default function Text({ children }: { children: React.ReactNode }) {
  return <div className={style.text}>{children}</div>;
}
