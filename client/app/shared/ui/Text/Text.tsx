import style from './Text.module.css';

export default function Text({
  children,
  size = 'md',
}: {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) {
  return <div className={`${style.text} ${style[size]}`}>{children}</div>;
}
