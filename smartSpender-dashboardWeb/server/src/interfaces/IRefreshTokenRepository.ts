import {  CmsUser } from "../entities/CmsUser";

export interface IRefreshTokenRepository {
    findByRefreshToken(refreshToken: string): Promise<CmsUser | null>;
}