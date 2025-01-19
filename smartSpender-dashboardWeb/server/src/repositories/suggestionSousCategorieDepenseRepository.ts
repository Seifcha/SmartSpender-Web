import { mysqlClient } from "../dbConnection";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";
import { ISuggestionSousCategorieDepenseRepository } from "../interfaces/ISuggestionSousCategorieDepenseRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class SuggestionSousCategorieDepenseRepository
  implements ISuggestionSousCategorieDepenseRepository
{
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<SousCategorieDepense[]> {
    let query = `SELECT * FROM sousCategoriesDepense WHERE deleted = 0 and isPublic=1 and validated =0;`;
    const values: any[] = [];

    // if (limit !== undefined) {
    //     query += ` LIMIT ?`;
    //     values.push(limit);
    // }
    // if (offset) {
    //     query += ` OFFSET ?`;
    //     values.push(offset);
    // }

    return new Promise<SousCategorieDepense[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des ob
          const categories = results.map((row: any) => {
            return new SousCategorieDepense(
              row.IdSousCategorie,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomSousCategorie,
              row.isPublic,
              row.validated,
              row.image,
              row.seuil,
              row.idCategorieDepense,
              row.userEmail
            );
          });
          resolve(categories);
        }
      });
    });
  }

  async findById(id: number): Promise<SousCategorieDepense | null> {
    const query = `SELECT * FROM sousCategoriesDepense WHERE IdSousCategorie = ?`;
    const values = [id];
    return new Promise<SousCategorieDepense | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucune catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const categorie = new SousCategorieDepense(
              row.IdSousCategorie,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomSousCategorie,
              row.isPublic,
              row.validated,
              row.image,
              row.seuil,
              row.idCategorieDepense,
              row.userEmail
            );
            resolve(categorie);
          }
        }
      });
    });
  }

  // Utilisation de la bonne signature pour la méthode update

  // Utilisation de la bonne signature pour la méthode update
  async update(id: number): Promise<SousCategorieDepense> {
    const query = `UPDATE sousCategoriesDepense SET validated=1 , isPublic = 0 WHERE IdSousCategorie = ?`;
    const values = [id];
    return new Promise<SousCategorieDepense>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async delete(id: number): Promise<boolean> {
    // Supprimer la catégorie de dépenses
    const query = `UPDATE sousCategoriesDepense SET isPublic = 0 , deletedAt = CURRENT_TIMESTAMP WHERE IdSousCategorie = ?`;
    const values = [id];
    return new Promise<boolean>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(true); // Succès de la suppression
        }
      });
    });
  }
}
