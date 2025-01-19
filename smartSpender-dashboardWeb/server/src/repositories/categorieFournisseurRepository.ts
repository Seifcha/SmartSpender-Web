import { mysqlClient } from "../dbConnection";
import { CategorieFournisseur } from "../entities/CategorieFournisseur";
import { ICategorieFournisseurRepository } from "../interfaces/ICategorieFournisseurRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";
import { Buffer } from "buffer";

@injectable()
export class CategorieFournisseurRepository
  implements ICategorieFournisseurRepository
{
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async create({
    nomCategorie,
    image,
  }: CategorieFournisseur): Promise<CategorieFournisseur> {
    return new Promise<CategorieFournisseur>((resolve, reject) => {
      const query = `INSERT INTO categoriesFournisseur (nomCategorie, image) VALUES (?, ?)`;
      const values = [nomCategorie, image];

      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const categoryId = results.insertId;
          const newCategorieFournisseur = new CategorieFournisseur(
            categoryId,
            results.createdAt,
            results.updatedAt,
            results.deleted,
            results.deletedAt,
            results.nomCategorie,
            results.image
          );
          resolve(newCategorieFournisseur);
        }
      });
    });
  }

  async update(
    IdCategorieFournisseur: number,
    nomCategorie: string,
    image: string
  ): Promise<CategorieFournisseur> {
    const query = `UPDATE categoriesFournisseur SET nomCategorie = ?, image = ? WHERE IdCategorieFournisseur = ?`;
    const values = [nomCategorie, image, IdCategorieFournisseur];
    return new Promise<CategorieFournisseur>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieFournisseur[]> {
    let query = `SELECT * FROM categoriesFournisseur WHERE deleted = 0`;
    const values: any[] = [];

    return new Promise<CategorieFournisseur[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const categories = results.map((row: any) => {
            return new CategorieFournisseur(
              row.IdCategorieFournisseur,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.image
            );
          });
          resolve(categories);
        }
      });
    });
  }

  async findById(id: number): Promise<CategorieFournisseur | null> {
    const query = `SELECT * FROM categoriesFournisseur WHERE IdCategorieFournisseur = ?`;
    const values = [id];
    return new Promise<CategorieFournisseur | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            const row = results[0];
            const categorie = new CategorieFournisseur(
              row.IdCategorieFournisseur,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.image
            );
            resolve(categorie);
          }
        }
      });
    });
  }

  async findByCategorieDepense(id: number): Promise<CategorieFournisseur[]> {
    const query = `
      SELECT cf.*
      FROM categoriesFournisseur cf
      JOIN categoriesDepenseFournisseur cdf ON cf.IdCategorieFournisseur = cdf.idCategorieFournisseur
      WHERE cdf.idCategorieDepense = ? AND cdf.deleted = 0 AND cf.deleted = 0
    `;
    const values = [id];
    return new Promise<CategorieFournisseur[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const categories = results.map((row: any) => {
            return new CategorieFournisseur(
              row.IdCategorieFournisseur,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.image
            );
          });
          resolve(categories);
        }
      });
    });
  }

  async findByCategorieRevenu(id: number): Promise<CategorieFournisseur[]> {
    const query = `
      SELECT cf.*
      FROM categoriesFournisseur cf
      JOIN categoriesRevenuFournisseur cdf ON cf.IdCategorieFournisseur = cdf.idCategorieFournisseur
      WHERE cdf.idCategorieRevenu = ? AND cdf.deleted = 0 AND cf.deleted = 0
    `;
    const values = [id];
    return new Promise<CategorieFournisseur[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const categories = results.map((row: any) => {
            return new CategorieFournisseur(
              row.IdCategorieFournisseur,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.image
            );
          });
          resolve(categories);
        }
      });
    });
  }

  async delete(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.connection.beginTransaction((err) => {
        if (err) {
          return reject(err);
        }

        const deleteFournisseursQuery = `
          UPDATE fournisseurs
          SET deleted = 1, deletedAt = CURRENT_TIMESTAMP
          WHERE idCategorieFournisseur = ?
        `;
        const deleteCategorieQuery = `
          UPDATE categoriesFournisseur
          SET deleted = 1, deletedAt = CURRENT_TIMESTAMP
          WHERE IdCategorieFournisseur = ?
        `;
        const values = [id];

        this.connection.query(
          deleteFournisseursQuery,
          values,
          (error, results) => {
            if (error) {
              return this.connection.rollback(() => {
                reject(error);
              });
            }

            this.connection.query(
              deleteCategorieQuery,
              values,
              (error, results) => {
                if (error) {
                  return this.connection.rollback(() => {
                    reject(error);
                  });
                }

                this.connection.commit((err) => {
                  if (err) {
                    return this.connection.rollback(() => {
                      reject(err);
                    });
                  }
                  resolve(true);
                });
              }
            );
          }
        );
      });
    });
  }
}
