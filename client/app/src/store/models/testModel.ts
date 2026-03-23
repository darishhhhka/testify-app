export interface TestSlice {
  created: { createdTest: CreatedTestList; status: 'empty' | 'succes' | 'error' };
  passed: { passedTests: PassedTestList; status: 'empty' | 'succes' | 'error' };
  currentTest: Test;
  currentTestAttempt: TestAttemp;
}

export type CreatedTestList = Record<number, Omit<CreatedTests, 'id'>>;

export type PassedTestList = Record<number, Omit<PassedTests, 'testId'>>;

export interface CreatedTests {
  id: number;
  name: string;
  createdAt: string;
  userId: number;
  participantsCount: number;
}

export interface PassedTests {
  testId: number;
  testAttemptId: number;
  name: string;
  updatedAt: string;
  score: number;
  countQuestion: number;
}

export interface TestAttemp {
  id: number | null;
  score: number | null;
  test: Omit<Test, 'id'> | null;
}

export interface Test {
  id: number | null;
  name: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'text';
  answers: Answer[];
  userAnswer: UserAnswer[];
}

export interface UserAnswer {
  id: number;
  value: JSON;
  isCorrect: boolean;
}

export interface Answer {
  id: number;
  text: string;
  correct: boolean;
}
