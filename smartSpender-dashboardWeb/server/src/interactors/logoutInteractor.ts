import { injectable, inject } from "inversify";
import { ILogoutRepository } from "../interfaces/ILogoutRepository";
import { CmsUser } from "../entities/CmsUser";
import { ILogoutInteractor } from "../interfaces/ILogoutInteractor";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class LogoutInteractor implements ILogoutInteractor {
  private repository: ILogoutRepository;

  constructor(
    @inject(INTERFACE_TYPE.LogoutRepository) repository: ILogoutRepository
  ) {
    this.repository = repository;
  }

  async find(refreshToken: string): Promise<CmsUser | null> {
    return this.repository.find(refreshToken);
  }

  async deleteRefreshToken(user: CmsUser): Promise<void> {
    await this.repository.deleteRefreshToken(user);
  }
}
