import { useAppDispatch } from '@/app/shared/store/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useTestStatistics = () => {
  const params = useParams<{ sharedToken: string }>();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>();
  useEffect(() => {
    const load = async () => {
      try {
      } catch (error) {
        if (typeof error === 'string') setError(error);
      }
    };
    load();
  }, []);
};
