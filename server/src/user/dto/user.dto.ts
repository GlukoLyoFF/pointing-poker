export type UserRole = 'observer' | 'creator';

export class UserDto {
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  image?: string;
  role?: UserRole;
  gameId: string;
}
