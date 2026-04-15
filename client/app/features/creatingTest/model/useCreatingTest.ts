'use client';

import { useEffect, useState } from 'react';
import { createTest, getThemes } from '../api/creatingTest.api';
import { createTestPayload, Theme } from './types';

export const useCreatingTest = () => {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    getThemes()
      .then((data) => setThemes(data))
      .catch((e) => {
        throw e;
      });
  });

  const handleCreate = async (data: createTestPayload) => {
    try {
      await createTest(data);
    } catch (error) {
      throw error;
    }
  };

  return {
    themes,
    handleCreate,
  };
};
