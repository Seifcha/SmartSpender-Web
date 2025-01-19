import { mysqlClient } from "../dbConnection";
import { CategorieDepense } from "../entities/CategorieDepense";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";
import { Buffer } from "buffer";
import { ICategorieDepenseRepository } from "../interfaces/ICategorieDepenseRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class CategorieDepenseRepository implements ICategorieDepenseRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  validate(id: number): Promise<CategorieDepense> {
    throw new Error("Method not implemented.");
  }

  async create({
    nomCategorie,
    image,
    possedeFournisseurDepenseInt,
  }: CategorieDepense): Promise<CategorieDepense> {
    return new Promise<CategorieDepense>((resolve, reject) => {
      const query = `INSERT INTO categoriesDepense (nomCategorie, image, possedeFournisseurDepense, valide) VALUES (?, ?, ?,1)`;

      // Convertir l'image en un format approprié pour la base de données (par exemple, Buffer ou Uint8Array)

      const values = [
        nomCategorie,
        image, // Utiliser le Buffer de l'image
        possedeFournisseurDepenseInt,
      ];

      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Récupérer l'ID de la catégorie nouvellement insérée
          const categoryId = results.insertId;

          // Créer une nouvelle instance de CategorieDepense avec les données insérées
          const newCategorieDepense = new CategorieDepense(
            categoryId,
            results.createdAt,
            results.updatedAt,
            results.deleted,
            results.deletedAt,
            results.nomCategorie,
            results.isPublicInt,
            results.validated,
            results.image,
            results.possedeFournisseurDepenseInt,
            results.Seuil,
            results.userEmail
          );

          // Résoudre avec la nouvelle instance de CategorieDepense
          resolve(newCategorieDepense);
        }
      });
    });
  }

  async createCategoriesDepenseFournisseur(
    categoryId: number,
    categoriesFournisseur: number[]
  ) {
    const values = categoriesFournisseur.map((categorieId) => [
      categoryId,
      categorieId,
    ]);
    const query =
      "INSERT INTO categoriesDepenseFournisseur (IdCategorieDepense, IdCategorieFournisseur) VALUES ?";
    return new Promise((resolve, reject) => {
      this.connection.query(query, [values], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async supprimerToutesAssociations(idCategorieDepense: number) {
    return this.connection.query(
      `
      UPDATE categoriesDepenseFournisseur
      SET deleted = 1
      WHERE idCategorieDepense = ?
      `,
      [idCategorieDepense]
    );
  }

  async supprimerAssociationsNonIncluses(
    idCategorieDepense: number,
    idCategoriesFournisseurSelected: number[]
  ) {
    return this.connection.query(
      `
      UPDATE categoriesDepenseFournisseur
      SET deleted = 1
      WHERE idCategorieDepense = ?
      AND idCategorieFournisseur NOT IN (?)
      `,
      [idCategorieDepense, idCategoriesFournisseurSelected]
    );
  }

  async modifierCategorieDepense(
    id: number,
    nomCategorie: string,
    image: string,
    possedeFournisseurDepense: number
  ) {
    return this.connection.query(
      `
      UPDATE categoriesDepense
      SET nomCategorie = ?, image = ?, possedeFournisseurDepense = ?, valide = 1, updatedAt = CURRENT_TIMESTAMP
      WHERE IdCategorie = ? AND deleted = 0
      `,
      [nomCategorie, image, possedeFournisseurDepense, id]
    );
  }

  async ajouterNouvellesLignesCategoriesDepenseFournisseur(
    idCategorieDepense: number,
    idCategoriesFournisseurSelected: number[]
  ) {
    await this.connection.query(
      `
      INSERT INTO categoriesDepenseFournisseur (idCategorieDepense, idCategorieFournisseur)
SELECT ?, cf.IdCategorieFournisseur
FROM categoriesFournisseur cf
WHERE cf.IdCategorieFournisseur IN (?)
AND NOT EXISTS (
    SELECT 1
    FROM categoriesDepenseFournisseur cdf
    WHERE cdf.idCategorieFournisseur = cf.IdCategorieFournisseur
    AND cdf.idCategorieDepense = ?
)
AND cf.deleted = 0

      `,
      [idCategorieDepense, idCategoriesFournisseurSelected, idCategorieDepense]
    );

    // Restaurer les associations supprimées avec deleted = 1
    await this.connection.query(
      `
      UPDATE categoriesDepenseFournisseur
      SET deleted = 0
      WHERE idCategorieDepense = ?
      AND idCategorieFournisseur IN (?)   
      AND deleted = 1     
      `,
      [idCategorieDepense, idCategoriesFournisseurSelected]
    );
  }

  async supprimerCategorieDepense(id: number): Promise<void> {
    // Commencez par supprimer toutes les sous-catégories associées
    const deleteSousCategoriesQuery = `
      UPDATE sousCategoriesDepense
      SET deleted = 1
      WHERE idCategorieDepense = ?
    `;

    return new Promise<void>((resolve, reject) => {
      this.connection.query(
        deleteSousCategoriesQuery,
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            // Après avoir supprimé les sous-catégories, supprimez la catégorie de dépense elle-même
            const query = `
            UPDATE categoriesDepense
            SET deleted = 1
            WHERE IdCategorie = ?`;

            const values = [id];

            this.connection.query(query, values, (error, results) => {
              if (error) {
                reject(error);
              } else {
                // Supprimez les associations dans la table categoriesDepenseFournisseur
                this.supprimerToutesAssociations(id)
                  .then(() => resolve())
                  .catch((err) => reject(err));
              }
            });
          }
        }
      );
    });
  }

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieDepense[]> {
    let query = `SELECT * FROM categoriesDepense WHERE deleted = 0 AND valide = 1;`;
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
              ""
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
              ""
            );
            resolve(categorie);
          }
        }
      });
    });
  }
}

// Méthode pour récupérer toutes les sous-catégories associées à une catégorie de dépenses
// async getSousCategoriesByCategorieId(
//   id: number
// ): Promise<SousCategorieDepense[]> {
//   const query = `SELECT * FROM sousCategoriesDepense WHERE idCategorieDepense = ?`;
//   const values = [id];
//   return new Promise<SousCategorieDepense[]>((resolve, reject) => {
//     this.connection.query(query, values, (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         // Mapper les résultats de la requête sur des objets SousCategorieDepense
//         const sousCategories: SousCategorieDepense[] = results.map(
//           (row: any) => {
//             return new SousCategorieDepense(
//               row.IdSousCategorie,
//               row.createdAt,
//               row.updatedAt,
//               row.deleted,
//               row.deletedAt,
//               row.nomSousCategorie,
//               row.isPublic,
//               row.validated,
//               row.image,
//               row.seuil,
//               row.idCategorieDepense,
//               row.userEmail
//             );
//           }
//         );
//         resolve(sousCategories);
//       }
//     });
//   });
// }

// Méthode pour supprimer une sous-catégorie par son ID
// async deleteSubCategory(id: number): Promise<boolean> {
//   const query = `  UPDATE sousCategoriesDepense SET deleted = 1 , deletedAt = CURRENT_TIMESTAMP WHERE IdSousCategorie = ? ;
//   `;
//   const values = [id];
//   return new Promise<boolean>((resolve, reject) => {
//     this.connection.query(query, values, (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(true); // Succès de la suppression
//       }
//     });
//   });
// }
