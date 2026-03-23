import { CreatedTestList, PassedTestList } from '../../store/models/testModel';
import style from './TestListPage.module.css';
import TestList from '../TestList/TestList';
import { useRouter } from 'next/navigation';
import Title from '../Title/Title';

type Props = {
  title: string;
  tests: CreatedTestList | PassedTestList;
};

export default function TestListPage({ title, tests }: Props) {
  const router = useRouter();

  return (
    <div className={style.wrap}>
      <Title>{title}</Title>
      <div className={style.list}>
        <TestList tests={tests} />
      </div>
    </div>
  );
}
