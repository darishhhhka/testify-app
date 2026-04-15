'use client';

import { useCreatingTest } from '../model/useCreatingTest';
import CreatingTestCard from './CreatingTestCard/CreatingTestCard';

export default function CreatingTest() {
  const { themes, handleCreate } = useCreatingTest();
  return <CreatingTestCard themes={themes} handleCreate={handleCreate} />;
}
