import { inject, injectable } from "inversify";

import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { INTERFACE_TYPE } from "../utils";

import { CmsUser } from "../entities/CmsUser";

@injectable()
export class AuthInteractor implements IAuthInteractor {
  private repository: IAuthRepository;

  constructor(
    @inject(INTERFACE_TYPE.AuthRepository) repository: IAuthRepository
  ) {
    this.repository = repository;
  }

  async authenticate(username: string): Promise<CmsUser | null> {
    return this.repository.findByUsername(username);
  }

  async saveToken(username: string, refreshToken: string): Promise<void> {
    await this.repository.saveRefreshToken(username, refreshToken);
  }
}