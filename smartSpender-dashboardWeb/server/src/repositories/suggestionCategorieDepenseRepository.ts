import { mysqlClient } from "../dbConnection";
import { CategorieDepense } from "../entities/CategorieDepense";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";
import { Buffer } from "buffer";
import { ISuggestionCategorieDepenseRepository } from "../interfaces/ISuggestionCategorieDepenseRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class SuggestionCategorieDepenseRepository
  implements ISuggestionCategorieDepenseRepository
{
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieDepense[]> {
    let query = `SELECT * FROM categoriesDepense WHERE deleted = 0 and isPublic=1 and valide=0;`;
    const values: any[] = [];

    // if (limit !== undefined) {
    //     query += ` LIMIT ?`;
    //     values.push(limit);
    // }
    // if (offset) {
    //     query += ` OFFSET ?`;
    //     values.push(offset);
    // }

    return new Promise<CategorieDepense[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des ob
          const categories = results.map((row: any) => {
            return new CategorieDepense(
              row.IdCategorie,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.isPublic,
              row.validated,
              row.image,
              row.possedeFournisseurDepense,
              row.Seuil,
              row.userEmail
            );
          });
          resolve(categories);
        }
      });
    });
  }

  async findById(id: number): Promise<CategorieDepense | null> {
    const query = `SELECT * FROM categoriesDepense WHERE IdCategorie = ?`;
    const values = [id];
    return new Promise<CategorieDepense | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucune catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const categorie = new CategorieDepense(
              row.IdCategorie,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.isPublic,
              row.valide,
              row.image,
              row.possedeFournisseurDepense,
              row.Seuil,
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
  async update(id: number): Promise<CategorieDepense> {
    const query = `UPDATE categoriesDepense SET valide=1 , isPublic = 0 WHERE IdCategorie = ?`;
    const values = [id];
    return new Promise<CategorieDepense>((resolve, reject) => {
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
    const query = `UPDATE categoriesDepense SET isPublic = 0 , deletedAt = CURRENT_TIMESTAMP WHERE IdCategorie = ?`;
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

  // Méthode pour récupérer toutes les sous-catégories associées à une catégorie de dépenses
}
