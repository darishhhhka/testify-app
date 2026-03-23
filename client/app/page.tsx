'use client';

import { useEffect, useState } from 'react';
import { check } from './src/store/userSlice';
import TestPage from './src/components/TestsListPage/TestListPage';
import { useAppDispatch, useAppSelector } from './src/store/store';
import { fetchTestAttemp } from './src/store/testAttempSlice';
import { fetchMyTest } from './src/store/testSlice';
import Auth from '../features/authentication/AuthContainer';

export default function Home() {
  return (
    <div>
      <Auth />
    </div>
  );
}
