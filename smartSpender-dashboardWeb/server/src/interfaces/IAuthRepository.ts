import { CmsUser } from "../entities/CmsUser";

export interface IAuthRepository {
saveRefreshToken(username: string, refreshToken: string): Promise<void>;
findByUsername(user: string): Promise<CmsUser | null>;


}