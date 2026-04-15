import TestView from '@/app/entities/test/ui/TestView/TestView';
import { useDetailTest } from './model/useDetailTest';
import ErrorMessage from '@/app/shared/ui/Error/Error';

export default function DetailsTestPage() {
  const { test, error } = useDetailTest();
  if (error)
    return (
      <div>
        <ErrorMessage>{error}</ErrorMessage>
      </div>
    );
  return <TestView test={test} type="check" />;
}
