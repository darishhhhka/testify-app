'use client';

import { usePassingTest } from './model/usePassingTest';
import TestView from '@/app/entities/test/ui/TestView/TestView';
import Button from '@/app/shared/ui/Button/Button';

export default function PassingTestPage() {
  const { test, error, submitTest, selectAnswer, selectTextAnswer } = usePassingTest();

  return (
    <>
      <TestView
        selectAnswer={selectAnswer}
        selectTextAnswer={selectTextAnswer}
        test={test}
        type="passing"
      />
      <Button onClick={submitTest}>Отправить</Button>
    </>
  );
}
