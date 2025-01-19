import { CmsUser } from "../entities/CmsUser";


export interface IAuthInteractor {
    authenticate(username: string): Promise<CmsUser | null>;
    saveToken(username: string, refreshToken: string): Promise<void>;
  }
  