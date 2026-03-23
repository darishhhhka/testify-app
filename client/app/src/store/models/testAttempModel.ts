export interface TestAttemp {
    id: number | null,
    score: number | null,
    test: Test | null
}

export interface Test {
    name: string,
    questions: Question[]
}

export interface Question {
    id: number, 
    question: string, 
    answers: Answer[],
    userAnswer: UserAnswer[]
}

export interface UserAnswer {
    id: number, 
    value: JSON,
    isCorrect: boolean
}

export interface Answer {
    id: number,
    text: string,
    correct: boolean
}