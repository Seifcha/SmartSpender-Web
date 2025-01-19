import { CmsUser } from "../entities/CmsUser";


export interface IRegisterInteractor {
    findByUsername(username: string, email : string): Promise<CmsUser | null>;
    register(input: any): Promise<CmsUser> ;
    getImage(username: string)
  }
  //