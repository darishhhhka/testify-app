import { $authHost } from '@/app/shared/api';

export const handleSubmitTest = async (
  testId: number,
  answer: Record<number, number[] | string>,
) => {
  try {
    await $authHost.post('api/test-attemp', {
      testId,
      answer,
    });
  } catch (error) {
    throw error;
  }
};
