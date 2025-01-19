import { mysqlClient } from "../dbConnection";
import { Fournisseur } from "../entities/Fournisseur";
import { Buffer } from "buffer";
import { ISuggestionFournisseurRepository } from "../interfaces/ISuggestionFournisseurRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class SuggestionFournisseurRepository
  implements ISuggestionFournisseurRepository
{
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<Fournisseur[]> {
    let query = `SELECT * FROM fournisseurs WHERE deleted = 0 and isPublic=1 and valide=0;`;
    const values: any[] = [];

    // if (limit !== undefined) {
    //     query += ` LIMIT ?`;
    //     values.push(limit);
    // }
    // if (offset) {
    //     query += ` OFFSET ?`;
    //     values.push(offset);
    // }

    return new Promise<Fournisseur[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des ob
          const categories = results.map((row: any) => {
            return new Fournisseur(
              row.idFournisseur,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nom,
              row.mail,
              row.phone,
              row.logo,
              row.isPublic,
              row.valide,
              row.idCategorieFournisseur,
              row.userEmail
            );
          });
          resolve(categories);
        }
      });
    });
  }

  async findById(id: number): Promise<Fournisseur | null> {
    const query = `SELECT * FROM fournisseurs WHERE idFournisseur = ?`;
    const values = [id];
    return new Promise<Fournisseur | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucune catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const categorie = new Fournisseur(
              row.idFournisseur,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nom,
              row.mail,
              row.phone,
              row.logo,
              row.isPublic,
              row.valide,
              row.idCategorieFournisseur,
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
  async update(id: number): Promise<Fournisseur> {
    const query = `UPDATE fournisseurs SET valide=1 , isPublic = 0 WHERE idFournisseur = ?`;
    const values = [id];
    return new Promise<Fournisseur>((resolve, reject) => {
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
    const query = `UPDATE fournisseurs SET isPublic = 0 , deletedAt = CURRENT_TIMESTAMP WHERE idFournisseur = ?`;
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
