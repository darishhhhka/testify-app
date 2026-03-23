import React from 'react';
import style from './Error.module.css';

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <span className={style.error}>{children}</span>;
}
