import style from './Button.module.css';

type Props = {
  variant?: 'outline' | 'fullfill';
  color?: 'red' | 'green' | 'default';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ color = 'default', children, ...props }: Props) {
  const variantColorButton = {
    red: style.red,
    green: style.green,
    default: style.default,
  };
  const typeButton = props.variant === 'outline' ? style.outline : style.fullfill;
  return (
    <button className={`${typeButton} ${style.button} ${variantColorButton[color]}`} {...props}>
      {children}
    </button>
  );
}
