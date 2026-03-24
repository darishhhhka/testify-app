export interface CreateTest {
  name: string;
  themeId: string;
  countQustion: number;
}

export interface createTestPayload {
  name: string;
  themeId: string;
  countQustion: number;
}

export interface Theme {
  id: number;
  theme: string;
}
