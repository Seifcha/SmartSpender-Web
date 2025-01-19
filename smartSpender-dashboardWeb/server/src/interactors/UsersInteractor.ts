import { inject, injectable } from "inversify";
import { IUsersInteractor } from "../interfaces/IUsersInteractor";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { INTERFACE_TYPE } from "../utils";
import { User } from "../entities/User"; //

@injectable()
export class UsersInteractor implements IUsersInteractor {
  private repository: IUsersRepository;

  constructor(
    @inject(INTERFACE_TYPE.UsersRepository)
    repository: IUsersRepository
  ) {
    this.repository = repository;
  }

  async getUser(idUser: number) {
    return await this.repository.findById(idUser);
  }

  async revoquerAcces(id: number) {
    const data = await this.repository.revoquerAcces(id);
    return data;
  }

  async getUsers(limit: number, offset: number): Promise<User[]> {
    return await this.repository.findAll(limit, offset);
  }
}
