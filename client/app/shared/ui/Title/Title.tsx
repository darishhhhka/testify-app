import style from './Title.module.css';

export default function Title({
  children,
  size = 'lg',
}: {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) {
  return <h1 className={`${style.title} ${style[size]}`}>{children}</h1>;
}
