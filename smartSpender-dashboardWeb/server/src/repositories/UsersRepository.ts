import { mysqlClient } from "../dbConnection";
import { User } from "../entities/User"; //
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class UsersRepository implements IUsersRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async revoquerAcces(IdUser: number): Promise<User> {
    const query = `UPDATE users SET actif = 0 WHERE idUser = ?`;
    const values = [IdUser];
    return new Promise<User>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Méthode pour récupérer toutes les sous-catégories associées à une catégorie de dépenses

  // Méthode pour supprimer une sous-catégorie par son ID

  async findAll(limit: number | undefined, offset: number): Promise<User[]> {
    let query = `SELECT * FROM users WHERE deleted = 0 `;
    const values: any[] = [];
    return new Promise<User[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des ob
          const users = results.map((row: any) => {
            return new User(
              row.idUser,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nom,
              row.prenom,
              row.dateNaissance,
              row.genre,
              row.email,
              row.motDePasse,
              row.phone,
              row.adresse,
              row.photoProfil,
              row.domaineTravail,
              row.posteTravail,
              "",
              "",
              "",
              row.isMailValidated,
              row.actif
            );
          });
          resolve(users);
        }
      });
    });
  }

  async findById(idUser: number): Promise<User | null> {
    const query = `SELECT * FROM users where idUser = ?`;
    const values = [idUser];
    return new Promise<User | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucune catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const user = new User(
              row.idUser,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nom,
              row.prenom,
              row.dateNaissance,
              row.genre,
              row.email,
              row.motDePasse,
              row.phone,
              row.adresse,
              row.photoProfil,
              row.domaineTravail,
              row.posteTravail,
              "",
              "",
              "",
              row.isMailValidated,
              row.actif
            );
            resolve(user);
          }
        }
      });
    });
  }
}
