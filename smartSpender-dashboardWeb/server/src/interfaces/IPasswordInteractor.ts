import { CmsUser } from "../entities/CmsUser";

export interface IPasswordInteractor {
  findUser(identifier: string);
  resetPassword(userId: number, newPassword: string);
  findOne(email: string);
}
