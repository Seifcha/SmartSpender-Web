import { CmsUser } from "../entities/CmsUser";

export interface IRefreshTokenInteractor {
    find(refreshToken: string): Promise<CmsUser | null>;
    
}
