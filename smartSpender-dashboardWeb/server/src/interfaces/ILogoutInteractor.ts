import { CmsUser } from "../entities/CmsUser";


export interface ILogoutInteractor {
    find(refreshToken: string): Promise<CmsUser | null>;
    deleteRefreshToken(user: CmsUser): Promise<void>;
  }
  
  