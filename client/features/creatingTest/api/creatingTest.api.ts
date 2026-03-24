import { $authHost } from '@/app/src/api';
import { createTestPayload } from '../model/types';

export const getThemes = async () => {
  const { data } = await $authHost.get('/api/test/get-all-theme');
  return data;
};

export const createTest = async (payload: createTestPayload) => {
  const { data } = await $authHost.post('api/test', payload);
  return data;
};
