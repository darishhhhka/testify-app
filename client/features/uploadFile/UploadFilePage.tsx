'use client';

import Card from '@/app/src/components/Card/Card';
import style from './UploadFilePage.module.css';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { $host } from '@/app/src/api';
import Button from '@/app/src/components/Button/Button';
import Title from '@/app/src/components/Title/Title';
import { submitFile } from './api/uploadFile.api';
import UploadFileCard from './ui/UploadFileCard/UploadFileCard';

export default function UploadFilePage() {
  return <UploadFileCard />;
}
