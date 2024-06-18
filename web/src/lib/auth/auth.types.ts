type RegistrationData = {
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UserData = {
  _id: number;
  email: string;
};

export type { RegistrationData, LoginData, UserData };
