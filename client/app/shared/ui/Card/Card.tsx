import React from 'react';
import style from './Card.module.css';

type Props = { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>;

export default function Card({ children, className, ...props }: Props) {
  return (
    <div className={`${style.card} ${className || ''}`} {...props}>
      {children}
    </div>
  );
}
