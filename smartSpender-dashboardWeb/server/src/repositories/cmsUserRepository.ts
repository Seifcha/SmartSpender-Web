import { injectable } from "inversify";
import { CmsUser } from "../entities/CmsUser";
import { ICmsUserRepository } from "../interfaces/ICmsUserRepository";
import * as mysql from "mysql";
import { mysqlClient } from "../dbConnection";

@injectable()
export class CmsUserRepository implements ICmsUserRepository {
  private connection: mysql.Connection;

  constructor() {
    // Initialize MySQL connection here
    this.connection = mysqlClient();
  }
  //
  async create(userData: any): Promise<CmsUser> {
    const query = `INSERT INTO cmsUsers (username, password,prenom, nom,  phone, email, photoProfil) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      userData.user,
      userData.pwd,
      userData.firstName,
      userData.lastName,
      userData.phone,
      userData.email,
      userData.profilPic,
    ];
    return new Promise<CmsUser>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Assuming the insertion was successful and returning the newly created user
          // You may want to fetch the user from the database to get the inserted ID and other details
          resolve(results);
        }
      });
    });
  }

  async findByUsernameOrMail(identifier: string): Promise<CmsUser | null> {
    // Logique pour trouver un utilisateur CMS par e-mail ou nom d'utilisateur dans la base de données
    const query = `SELECT * FROM cmsUsers WHERE username = ? OR email = ? LIMIT 1`;
    const values = [identifier, identifier];
    return new Promise<CmsUser | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results: CmsUser[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  }

  async updateResetCodeEmail(
    userId: number,
    resetToken: string
  ): Promise<void> {
    // Logique pour mettre à jour le jeton de réinitialisation pour un utilisateur dans la base de données
    const query = `UPDATE cmsUsers SET resetCodeEmail = ? WHERE idCmsUser = ?`;
    const values = [resetToken, userId];
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async updateResetCodePhone(
    userId: number,
    resetToken: string
  ): Promise<void> {
    // Logique pour mettre à jour le code de réinitialisation du téléphone pour un utilisateur dans la base de données
    const query = `UPDATE cmsUsers SET resetCodePhone = ? WHERE idCmsUser = ?`;
    const values = [resetToken, userId];
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    // Logique pour mettre à jour le mot de passe de l'utilisateur dans la base de données
    const query = `UPDATE cmsUsers SET password = ? WHERE idCmsUser = ?`;
    const values = [newPassword, userId];
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  async clearResetToken(userId: number): Promise<void> {
    const query = `UPDATE cmsUsers SET resetCodeEmail = NULL, resetCodePhone = NULL WHERE idCmsUser = ?`;
    const values = [userId];
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

// async findByEmailOrUsername(identifier: string): Promise<CmsUser | null> {
//   // Logique pour trouver un utilisateur CMS par e-mail ou nom d'utilisateur dans la base de données
//   const query = `SELECT * FROM cmsUser WHERE email = ? OR username = ?`;
//   const values = [identifier, identifier];
//   return new Promise<CmsUser | null>((resolve, reject) => {
//     this.connection.query(query, values, (error, results: CmsUser[]) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results.length > 0 ? results[0] : null);
//       }
//     });
//   });
// }
