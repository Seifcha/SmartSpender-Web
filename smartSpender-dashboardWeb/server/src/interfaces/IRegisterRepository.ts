import { CmsUser } from "../entities/CmsUser";
import Buffer from "buffer";

export interface IRegisterRepository {
    findByUsername(username: string, email: string): Promise<CmsUser | null>;
    create(input: any): Promise<CmsUser>;
    findImage(username: string): Promise<Buffer | null>;
  }