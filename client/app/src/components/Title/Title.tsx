import style from './Title.module.css';

export default function Title({ children }: { children: React.ReactNode }) {
  return <h1 className={style.title}>{children}</h1>;
}
