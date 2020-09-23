import { User } from '../models/user.interaface';

export class RoleValidator {
  isEditor(user: User): boolean {
    return user.role === 'EDITOR';
  }

  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }
}
