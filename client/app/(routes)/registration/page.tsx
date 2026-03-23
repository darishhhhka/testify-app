'use client';
import { useSelector } from 'react-redux';
import { type State } from '../../src/store/models/stateModel';
import Auth from '../../../features/authentication/AuthContainer';

export default function Registration() {
  const user = useSelector((state: State) => state.user);

  return (
    <div>
      <Auth />
    </div>
  );
}
