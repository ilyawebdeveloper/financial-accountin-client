export interface IUser {
  email: string;
  id: number;
  token: string;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface IResponseUserData {
  user: IResponseUser | undefined;
  token: string | undefined;
}

export interface IResponseUserDataLogin {
  email: string;
  token: string;
  id: number;
}

export interface ICategory {
  title: string;
  transactions: ITransaction[];
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITransaction {
  title: string;
  amount: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  user: IResponseUser;
  category: Omit<ICategory, 'transactions'>;
}
