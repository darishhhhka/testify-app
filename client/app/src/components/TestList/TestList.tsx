import { CreatedTestList, PassedTestList } from '../../store/models/testModel';
import TestListItem from '../TestListItem/TestListItem';
import style from './TestList.module.css';

type Props = { tests: CreatedTestList | PassedTestList; type?: 'created' | 'passed' };

export default function TestList({ tests }: Props) {
  return (
    <div className={style.wrap}>
      <div className={style.testList}>
        {Object.entries(tests).map(([id, test], index) => (
          <div key={id} className={style.item}>
            <TestListItem test={{ id: parseInt(id), ...test }} />
          </div>
        ))}
      </div>
    </div>
  );
}
