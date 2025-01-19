import { mysqlClient } from "../dbConnection";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";
import { ISousCategorieDepenseRepository } from "../interfaces/ISousCategorieDepenseRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class SousCategorieDepenseRepository
  implements ISousCategorieDepenseRepository
{
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }
  validate(id: number): Promise<SousCategorieDepense> {
    throw new Error("Method not implemented.");
  }

  async create({
    nomSousCategorie,
    image,
    idCategorieDepense,
  }: SousCategorieDepense): Promise<SousCategorieDepense> {
    return new Promise<SousCategorieDepense>((resolve, reject) => {
      console.log(nomSousCategorie);
      const query = `INSERT INTO sousCategoriesDepense (nomSousCategorie, image, idCategorieDepense, validated) VALUES (?, ?, ?,1)`;

      // Convertir l'image en un format approprié pour la base de données (par exemple, Buffer ou Uint8Array)

      const values = [
        nomSousCategorie,
        image, // Utiliser le Buffer de l'image
        idCategorieDepense,
      ];

      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Récupérer l'ID de la catégorie nouvellement insérée
          const categoryId = results.insertId;

          // Créer une nouvelle instance de CategorieDepense avec les données insérées
          const newCategorieDepense = new SousCategorieDepense(
            categoryId,
            new Date(), // Date de création actuelle
            new Date(), // Date de mise à jour actuelle
            false, // Aucune suppression
            new Date(), // Date de suppression nulle
            nomSousCategorie,
            false, // Supposons que la catégorie n'est pas publique par défaut
            false, // Supposons que la catégorie n'est pas validée par défaut
            image, // Utiliser le Buffer de l'image
            idCategorieDepense,
            0,
            ""
          );

          // Résoudre avec la nouvelle instance de CategorieDepense
          resolve(newCategorieDepense);
        }
      });
    });
  }

  async update(
    id: number,
    nomSousCategorie: string,
    image: string,
    idCategorieDepense: number
  ): Promise<SousCategorieDepense> {
    console.log("id", idCategorieDepense);
    const query = `UPDATE sousCategoriesDepense SET nomSousCategorie = ?, image = ?, idCategorieDepense = ?, isPublic = 0, validated = 1 WHERE IdSousCategorie = ?`;
    const values = [nomSousCategorie, image, idCategorieDepense, id];
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
    const query = ` UPDATE sousCategoriesDepense SET deleted = 1 WHERE IdSousCategorie = ?`;
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

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<SousCategorieDepense[]> {
    let query = `SELECT * FROM sousCategoriesDepense WHERE deleted = 0 AND validated = 1`;
    const values: any[] = [];

    if (limit !== undefined) {
      query += ` LIMIT ?`;
      values.push(limit);
    }

    return new Promise<SousCategorieDepense[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des objets SousCategorieDepense
          const sousCategories: SousCategorieDepense[] = results.map(
            (row: any) => {
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
            }
          );
          resolve(sousCategories);
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
            resolve(null); // Aucune sous-catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const sousCategorie = new SousCategorieDepense(
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
            resolve(sousCategorie);
          }
        }
      });
    });
  }
}
