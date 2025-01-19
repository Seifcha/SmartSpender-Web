import { mysqlClient } from "../dbConnection";
import { Fournisseur } from "../entities/Fournisseur";
import { IFournisseurRepository } from "../interfaces/IFournisseurRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class FournisseurRepository implements IFournisseurRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }
  validate(IdFournisseur: number): Promise<Fournisseur> {
    throw new Error("Method not implemented.");
  }
  async create({
    nom,
    logo,
    mail,
    phone,
    isPublic,
    idCategorieFournisseur,
  }: Fournisseur): Promise<Fournisseur> {
    return new Promise<Fournisseur>((resolve, reject) => {
      const query = `INSERT INTO fournisseurs (nom, logo, mail, phone, idCategorieFournisseur, valide) VALUES (?,?,?, ?, ?,1)`;

      // Convertir l'logo en un format approprié pour la base de données (par exemple, Buffer ou Uint8Array)

      const values = [
        nom,
        logo, // Utiliser le Buffer de l'logo
        mail,
        phone,
        idCategorieFournisseur,
      ];

      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Récupérer l'ID de la catégorie nouvellement insérée
          const categoryId = results.insertId;

          // Créer une nouvelle instance de Fournisseur avec les données insérées
          const newFournisseur = new Fournisseur(
            categoryId,
            new Date(), // Date de création actuelle
            new Date(), // Date de mise à jour actuelle
            false, // Aucune suppression
            new Date(), // Date de suppression nulle
            nom,
            mail, // Supposons que la catégorie n'est pas publique par défaut
            phone, // Supposons que la catégorie n'est pas validée par défaut
            logo, // Utiliser le Buffer de l'logo
            false,
            false,
            idCategorieFournisseur,
            ""
          );

          // Résoudre avec la nouvelle instance de Fournisseur
          resolve(newFournisseur);
        }
      });
    });
  }

  async update(
    id: number,
    nom: string,
    logo: string,
    mail: string,
    phone: number,
    idCategorieFournisseur: number
  ): Promise<Fournisseur> {
    const query = `UPDATE fournisseurs SET nom = ?, logo = ?, mail = ?, phone =?, valide = 1 , isPublic = 0, idCategorieFournisseur =? WHERE idFournisseur = ?`;
    const values = [nom, logo, mail, phone, idCategorieFournisseur, id];
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
    const query = `UPDATE fournisseurs SET deleted = 1 WHERE IdFournisseur = ?`;
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

  // Méthode pour supprimer une sous-catégorie par son ID

  async findAll(
    limit: number | undefined,
    offset: number
  ): Promise<Fournisseur[]> {
    let query = `SELECT * FROM fournisseurs WHERE deleted = 0 AND valide = 1`;
    const values: any[] = [];
    return new Promise<Fournisseur[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des ob
          const fournisseurs = results.map((row: any) => {
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
          resolve(fournisseurs);
        }
      });
    });
  }

  async findById(idFournisseur: number): Promise<Fournisseur | null> {
    const query = `SELECT * FROM fournisseurs WHERE idFournisseur = ?`;
    const values = [idFournisseur];
    return new Promise<Fournisseur | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucune catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const fournisseur = new Fournisseur(
              row.IdFournisseur,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nom,
              row.mail,
              row.phone,
              row.logo,
              row.isPublic,
              row.validated,
              row.idCategorieFournisseur,
              ""
            );
            resolve(fournisseur);
          }
        }
      });
    });
  }
  async getSousCategoriesByCategorieId(id: number): Promise<Fournisseur[]> {
    const query = `SELECT * FROM SousCategorieDepenses WHERE idCategorieDepense = ?`;
    const values = [id];
    return new Promise<Fournisseur[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mapper les résultats de la requête sur des objets SousCategorieDepense
          const fournisseur: Fournisseur[] = results.map((row: any) => {
            return new Fournisseur(
              row.IdSousCategorie,
              row.createdAt,
              row.updatedAt,
              row.deleted,
              row.deletedAt,
              row.nomSousCategorie,
              row.isPublic,
              row.validated,
              row.logo,
              row.seuil,
              row.idCategorieDepense,
              row.idCategorieFournisseur,
              ""
            );
          });
          resolve(fournisseur);
        }
      });
    });
  }
}
