import { User } from "../entities/User"; //

export interface IUsersRepository {
  revoquerAcces(id: number): Promise<User>;
  findAll(limit: number | undefined, offset: number): Promise<User[]>;
  findById(idUser: number): Promise<User | null>;
}
