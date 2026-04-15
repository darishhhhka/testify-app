import { $host } from '@/app/shared/api';

export const uploadindData = async () => {
  const data = await $host.get('api/');
};
