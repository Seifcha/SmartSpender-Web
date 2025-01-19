import { injectable } from "inversify";
import { CmsUser } from "../entities/CmsUser";
import { IPasswordRepository } from "../interfaces/IPasswordRepository";
import * as mysql from "mysql";
import { mysqlClient } from "../dbConnection";

@injectable()
export class PasswordRepository implements IPasswordRepository {
  private connection: mysql.Connection;

  constructor() {
    // Initialize MySQL connection here
    this.connection = mysqlClient();
  }

  async findByUsernameOrMail(identifier: string): Promise<CmsUser | null> {
    const query = `SELECT * FROM cmsUsers WHERE username = ? OR email = ? LIMIT 1`;
    const values = [identifier, identifier];

    return new Promise<CmsUser | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
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
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  async updatePassword(userId: number, newPassword: string): Promise<CmsUser> {
    const query = `UPDATE cmsUsers SET password = ? WHERE idCmsUser = ?`;
    const values = [newPassword, userId];
    return new Promise<CmsUser>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async checkEmail(email: string): Promise<boolean> {
    const query = `SELECT COUNT(*) AS count FROM cmsUsers WHERE email = ?`;
    const values = [email];

    return new Promise<boolean>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const count = results[0].count;
          resolve(count > 0); // Renvoie true si l'e-mail existe dans la base de données, sinon false
        }
      });
    });
  }
}
