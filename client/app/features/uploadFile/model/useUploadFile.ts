import { useState } from 'react';
import { submitFile } from '../api/uploadFile.api';

export const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>();
  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await submitFile(formData);
    } catch (error) {
      if (typeof error === 'string') setError(error);
    }
  };

  return {
    handleSubmit,
    setFile,
    file,
    error,
  };
};
