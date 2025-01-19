import { mysqlClient } from "../dbConnection";
import { CmsUser } from "../entities/CmsUser";
import { ILogoutRepository } from "../interfaces/ILogoutRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class LogoutRepository implements ILogoutRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async find(refreshToken: string): Promise<CmsUser | null> {
    const query = `SELECT * FROM cmsUsers WHERE refreshToken = ?`;
    const values = [refreshToken];
    return new Promise<CmsUser | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const userData = results[0];
          const user = new CmsUser(
            userData.idCmsUser,
            userData.nom,
            userData.prenom,
            userData.username,
            userData.password,
            userData.phone,
            userData.email,
            userData.photoProfil,
            userData.resetCodePhone,
            userData.resetCodeMail,
            userData.isMailValidated,
            userData.isPhoneValidated,
            userData.actif,
            userData.refreshToken
          );
          resolve(user);
        }
      });
    });
  }

  async deleteRefreshToken(user: CmsUser): Promise<void> {
    const query = `UPDATE cmsUsers SET refreshToken = NULL WHERE id = ?`;
    const values = [user.id];
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
