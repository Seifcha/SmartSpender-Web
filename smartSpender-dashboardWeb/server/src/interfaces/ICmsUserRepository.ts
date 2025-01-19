import { CmsUser } from "../entities/CmsUser";

export interface ICmsUserRepository {
  create(userData: any): Promise<CmsUser>;
  findByUsernameOrMail(identifier: string): Promise<CmsUser | null>;
  updatePassword(userId: number, newPassword: string): Promise<void>;
}