export type Roles = 'EDITOR' | 'ADMIN';

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  role?: Roles;
}
