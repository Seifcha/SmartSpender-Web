import { CmsUser } from "../entities/CmsUser";

export interface IPasswordRepository {
  findByUsernameOrMail(identifier: string): Promise<CmsUser | null>;
  updatePassword(userId: number, newPassword: string): Promise<CmsUser | null>;
  checkEmail(email: string): Promise<boolean>;
}
