import { Share2 } from 'lucide-react';
import { useState } from 'react';
import style from './SharedTest.module.css';
import SharedTestModal from '../SharedTestModal/SharedTestModal';

type Props = { sharedToken: string; name: string };

export default function SharedTest({ sharedToken, name }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Поменяли состояние');

    setOpen((state) => !state);
  };

  return (
    <>
      <div className={`${style.icon} ${style.shareIcon}`} onClick={handleOpen}>
        <Share2 size={22} />
      </div>
      <SharedTestModal setOpen={setOpen} isOpen={isOpen} sharedToken={sharedToken} name={name} />
    </>
  );
}
