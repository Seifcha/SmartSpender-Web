import { User } from "../entities/User"; //

export interface IUsersInteractor {
  getUser(idUser: number);
  revoquerAcces(id: number);
  getUsers(limit: number | undefined, offset: number): Promise<User[]>;
}
