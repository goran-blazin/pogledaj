export type Person = {
  id: string;
  name: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  gender?: 'Male' | 'Female' | 'Other';
};

export type Actor = {
  person: Person;
  characterName: string;
  castOrder: number;
};

export type Director = {
  person: Person;
  type: 'Main' | 'Assistant';
};

export type Producer = {
  person: Person;
  type: 'Executive' | 'Assistant';
};
