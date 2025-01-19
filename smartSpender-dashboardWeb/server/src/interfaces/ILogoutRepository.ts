import { CmsUser } from "../entities/CmsUser";

export interface ILogoutRepository {
    find(refreshToken: string): Promise<CmsUser | null>;
    deleteRefreshToken(user: CmsUser): Promise<void>;
}