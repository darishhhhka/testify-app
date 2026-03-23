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
