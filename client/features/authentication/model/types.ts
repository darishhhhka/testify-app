export interface Authorization {
  login: string;
  password: string;
}

export interface Registration {
  login: string;
  password: string;
  confirmPassword: string;
  role: 'teacher' | 'student';
}

export interface User {
  id: number | null;
  login: string;
  role: 'teacher' | 'student' | null;
  isAuth: boolean;
  checked: boolean;
}

export interface ResponseUser {
  id: number;
  login: string;
  role: 'teacher' | 'student';
}
