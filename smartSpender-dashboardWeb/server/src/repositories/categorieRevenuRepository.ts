import { mysqlClient } from "../dbConnection";
import { CategorieRevenu } from "../entities/CategorieRevenu";
import { Buffer } from "buffer";
import { ICategorieRevenuRepository } from "../interfaces/ICategorieRevenuRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class CategorieRevenuRepository implements ICategorieRevenuRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }
  validate(id: number): Promise<CategorieRevenu> {
    throw new Error("Method not implemented.");
  }

  async create({
    nomCategorie,
    image,
    possedeFournisseurRevenuInt,
  }: CategorieRevenu): Promise<CategorieRevenu> {
    return new Promise<CategorieRevenu>((resolve, reject) => {
      console.log(possedeFournisseurRevenuInt);
      const query = `INSERT INTO categoriesRevenu (nomCategorie, image, possedeFournisseurRevenu , validated) VALUES (?, ?, ?, 1)`;

      // Convertir l'image en un format approprié pour la base de données (par exemple, Buffer ou Uint8Array)

      const values = [
        nomCategorie,
        image, // Utiliser le Buffer de l'image
        possedeFournisseurRevenuInt,
      ];

      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Récupérer l'ID de la catégorie nouvellement insérée
          const categoryId = results.insertId;

          // Créer une nouvelle instance de CategorieRevenu avec les données insérées
          const newCategorieRevenu = new CategorieRevenu(
            categoryId,
            new Date(), // Date de création actuelle
            new Date(), // Date de mise à jour actuelle
            false, // Aucune suppression
            new Date(), // Date de suppression nulle
            nomCategorie,
            false, // Supposons que la catégorie n'est pas publique par défaut
            false, // Supposons que la catégorie n'est pas validée par défaut
            image, // Utiliser le Buffer de l'image
            possedeFournisseurRevenuInt,
            results.userEmail
          );

          // Résoudre avec la nouvelle instance de CategorieRevenu
          resolve(newCategorieRevenu);
        }
      });
    });
  }

  async createCategoriesRevenuFournisseur(
    categoryId: number,
    categoriesFournisseur: number[]
  ) {
    const values = categoriesFournisseur.map((categorieId) => [
      categoryId,
      categorieId,
    ]);
    const query =
      "INSERT INTO categoriesRevenuFournisseur (IdCategorieRevenu, IdCategorieFournisseur) VALUES ?";
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

  async supprimerToutesAssociations(idCategorieRevenu: number) {
    return this.connection.query(
      `
      UPDATE categoriesRevenuFournisseur
      SET deleted = 1
      WHERE idCategorieRevenu = ?
      `,
      [idCategorieRevenu]
    );
  }

  async supprimerAssociationsNonIncluses(
    idCategorieRevenu: number,
    idCategoriesFournisseurSelected: number[]
  ) {
    return this.connection.query(
      `
      UPDATE categoriesRevenuFournisseur
      SET deleted = 1
      WHERE idCategorieRevenu = ?
      AND idCategorieFournisseur NOT IN (?)
      `,
      [idCategorieRevenu, idCategoriesFournisseurSelected]
    );
  }

  async modifierCategorieRevenu(
    id: number,
    nomCategorie: string,
    image: string,
    possedeFournisseurRevenu: number
  ) {
    return this.connection.query(
      `
      UPDATE categoriesRevenu
      SET nomCategorie = ?, image = ?, possedeFournisseurRevenu = ?, updatedAt = CURRENT_TIMESTAMP , validated = 1 , isPublic = 0
      WHERE IdCategorie = ? AND deleted = 0
      `,
      [nomCategorie, image, possedeFournisseurRevenu, id]
    );
  }

  async ajouterNouvellesLignesCategoriesRevenuFournisseur(
    idCategorieRevenu: number,
    idCategoriesFournisseurSelected: number[]
  ) {
    await this.connection.query(
      `
      INSERT INTO categoriesRevenuFournisseur (idCategorieRevenu, idCategorieFournisseur)
SELECT ?, cf.IdCategorieFournisseur
FROM categoriesFournisseur cf
WHERE cf.IdCategorieFournisseur IN (?)
AND NOT EXISTS (
    SELECT 1
    FROM categoriesRevenuFournisseur cdf
    WHERE cdf.idCategorieFournisseur = cf.IdCategorieFournisseur
    AND cdf.idCategorieRevenu = ?
)
AND cf.deleted = 0

      `,
      [idCategorieRevenu, idCategoriesFournisseurSelected, idCategorieRevenu]
    );

    // Restaurer les associations supprimées avec deleted = 1
    await this.connection.query(
      `
      UPDATE categoriesRevenuFournisseur
      SET deleted = 0
      WHERE idCategorieRevenu = ?
      AND idCategorieFournisseur IN (?)   
      AND deleted = 1     
      `,
      [idCategorieRevenu, idCategoriesFournisseurSelected]
    );
  }

  async supprimerCategorieRevenu(id: number): Promise<void> {
    const query = `
      UPDATE categoriesRevenu
      SET deleted = 1
      WHERE IdCategorie = ?`;

    const values = [id];

    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Après avoir supprimé la catégorie de dépense, supprimez les associations dans la table categoriesRepositoryFournisseur
          this.supprimerToutesAssociations(id)
            .then(() => resolve())
            .catch((err) => reject(err));
        }
      });
    });
  }

  // Méthode pour supprimer une sous-catégorie par son ID

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieRevenu[]> {
    let query = `SELECT * FROM categoriesRevenu WHERE deleted = 0 AND validated = 1;`;
    const values: any[] = [];

    // if (limit !== undefined) {
    //     query += ` LIMIT ?`;
    //     values.push(limit);
    // }
    // if (offset) {
    //     query += ` OFFSET ?`;
    //     values.push(offset);
    // }

    return new Promise<CategorieRevenu[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des ob
          const categories = results.map((row: any) => {
            return new CategorieRevenu(
              row.IdCategorie,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.isPublic,
              row.validated,
              row.image,
              row.possedeFournisseurRevenu,
              row.userEmail
            );
          });
          resolve(categories);
        }
      });
    });
  }

  async findById(id: number): Promise<CategorieRevenu | null> {
    const query = `SELECT * FROM categoriesRevenu WHERE IdCategorie = ?`;
    const values = [id];
    return new Promise<CategorieRevenu | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucune catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const categorie = new CategorieRevenu(
              row.IdCategorie,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomCategorie,
              row.isPublic,
              row.validated,
              row.image,
              row.possedeFournisseurRevenu,
              row.userEmail
            );
            resolve(categorie);
          }
        }
      });
    });
  }
}
