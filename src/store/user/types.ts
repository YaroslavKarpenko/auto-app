import { LoadingStatus } from '../ad/slice';

export interface User {
  username: string | null;
  token: string | null;
  loading: LoadingStatus;
}

export type OmittedUser = Omit<User, 'loading'>;

export interface UserCredentials {
  username: string;
  password: string;

  email?: string;
  phone?: string;
}
