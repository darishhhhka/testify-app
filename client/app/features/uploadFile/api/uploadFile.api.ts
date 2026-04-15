import { $authHost } from '@/app/shared/api';

export const submitFile = async (formData: FormData) => {
  try {
    await $authHost.post('/api/test/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Beaver ${localStorage.getItem('token')}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
