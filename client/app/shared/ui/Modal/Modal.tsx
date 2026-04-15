import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import { Dispatch, MouseEvent, SetStateAction, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({ children, isOpen, setOpen }: Props) {
  const content = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!content.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return createPortal(
    <div className={`${isOpen ? style.active : ''} ${style.modal}`} onClick={handleClick}>
      <div ref={content}>{children}</div>
    </div>,
    document.body,
  );
}
