import Card from '@/app/shared/ui/Card/Card';
import Modal from '@/app/shared/ui/Modal/Modal';
import Text from '@/app/shared/ui/Text/Text';
import Title from '@/app/shared/ui/Title/Title';
import { Dispatch, SetStateAction, useState } from 'react';
import style from './SharedTestModal.module.css';
import { Copy, Divide, QrCode } from 'lucide-react';
import { PAGES } from '@/app/shared/config/pages';
import Button from '@/app/shared/ui/Button/Button';
import { QRCodeSVG } from 'qrcode.react';
import Line from '@/app/shared/ui/Line/Line';

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sharedToken: string;
  name: string;
};

export default function SharedTestModal({ isOpen, setOpen, sharedToken, name }: Props) {
  const [type, setType] = useState<'link' | 'qr'>('link');

  const link = `${window.location.origin}${PAGES.PASSING_TEST}/${sharedToken}`;

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(link);
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <Card className={style.wrap}>
        <Title size="sm">Поделиться тестом</Title>
        <Text>{name}</Text>
        <div>
          <Line />
          <div className={style.nav}>
            <div
              className={`${style.btn} ${type === 'link' && style.active}`}
              onClick={() => setType('link')}
            >
              <Copy />
              <Text>Ссылка</Text>
            </div>
            <div
              className={`${style.btn} ${type === 'qr' && style.active}`}
              onClick={() => setType('qr')}
            >
              <QrCode />
              <Text>QR-код</Text>
            </div>
          </div>
          <Line />
        </div>
        {type === 'link' ? (
          <div>
            <Text>Ссылка на тест</Text>
            <div className={style.linkWrap}>
              <Card className={style.link}>
                <Text>{`${window.location.origin}${PAGES.PASSING_TEST}/${sharedToken}`}</Text>
              </Card>
              <Button onClick={copyLink}>
                <Copy />
              </Button>
            </div>
          </div>
        ) : (
          <Card className={style.qrWrap}>
            <QRCodeSVG value={link} size={200} />
          </Card>
        )}
      </Card>
    </Modal>
  );
}
