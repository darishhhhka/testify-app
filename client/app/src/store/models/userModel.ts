export interface User {
  id: number | null;
  login: string;
  role: 'teacher' | 'student' | null;
  isAuth: boolean;
  checked: boolean;
}
