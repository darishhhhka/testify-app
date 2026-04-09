import TestView from '@/app/entities/test/ui/TestView/TestView';
import { useDetailTest } from './model/useDetailTest';

export default function DetailsTestPage() {
  const { test, error } = useDetailTest();
  return <TestView test={test} type="check" />;
}
