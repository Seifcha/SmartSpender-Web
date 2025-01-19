import { injectable, inject } from "inversify";
import { IRefreshTokenRepository } from "../interfaces/IRefreshTokenRepository";
import { CmsUser } from "../entities/CmsUser";
import { IRefreshTokenInteractor } from "../interfaces/IRefreshTokenInteractor";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class RefreshTokenInteractor implements IRefreshTokenInteractor {
  private repository: IRefreshTokenRepository;

  constructor(
    @inject(INTERFACE_TYPE.RefreshTokenRepository)
    repository: IRefreshTokenRepository
  ) {
    this.repository = repository;
  }

  async find(refreshToken: string): Promise<CmsUser | null> {
    return this.repository.findByRefreshToken(refreshToken);
  }
}
