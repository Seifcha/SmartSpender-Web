//
import { injectable } from "inversify";
import { CmsUser } from "../entities/CmsUser";
import { IRegisterRepository } from "../interfaces/IRegisterRepository";
import { mysqlClient } from "../dbConnection";
import * as mysql from "mysql";
import Buffer from "buffer";
@injectable()
export class RegisterRepository implements IRegisterRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }
  ////////////
  async findByUsername(
    username: string,
    email: string
  ): Promise<CmsUser | null> {
    const query = `SELECT * FROM cmsUsers WHERE username = ? OR email = ?`;
    const values = [username, email];
    return new Promise<CmsUser | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucun utilisateur trouvé avec ce nom d'utilisateur
          } else {
            // Extraire les données de l'utilisateur à partir du premier résultat trouvé
            const userData = results[0];
            const user = new CmsUser(
              userData.id,
              userData.nom,
              userData.prenom,
              userData.username,
              userData.password,
              userData.phone,
              userData.email,
              userData.photoProfil,
              userData.resetCodePhone,
              userData.resetCodeMail,
              userData.isMailValidated,
              userData.isPhoneValidated,
              userData.actif,
              userData.refreshToken
            );
            resolve(user);
          }
        }
      });
    });
  }

  async create({
    username,
    hashedPwd,
    prenom,
    nom,
    phone,
    email,
    photoProfil,
  }: CmsUser): Promise<CmsUser> {
    return new Promise<CmsUser>((resolve, reject) => {
      const query = `INSERT INTO cmsUsers (username, password, prenom, nom, phone, email, photoProfil) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        username,
        hashedPwd,
        prenom,
        nom,
        phone,
        email,
        photoProfil,
      ];

      // return new Promise<CmsUser>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Récupérer l'ID de l'utilisateur nouvellement inséré
          const id = results.insertId;

          // Créer une nouvelle instance de CmsUser avec les données insérées
          const newCmsUser = new CmsUser(
            id,
            nom,
            prenom,
            username,
            hashedPwd,
            phone,
            email,
            photoProfil,
            "",
            "",
            false,
            false,
            true,
            ""
          );

          // Résoudre avec la nouvelle instance de CmsUser
          resolve(newCmsUser);
        }
      });
    });
  }

  async findImage(username: string): Promise<Buffer | null> {
    const query = `SELECT photoProfil FROM cmsUsers WHERE username = ?`;
    const values = [username];
    return new Promise<Buffer | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Aucune catégorie trouvée avec cet ID
          } else {
            const row = results[0];
            const image = row.photoProfil;

            resolve(image);
          }
        }
      });
    });
  }
}
// username: string,
// password: string,
// prenom: string,
// nom: string,
// phone: string,
// email: string,
// profilePic: Buffer
// ): Promise<CmsUser> {
// // Créer un nouvel objet User avec les informations fournies
// const newUser = new CmsUser(
//   0, // L'ID sera généré automatiquement par la base de données
//   nom,
//   prenom,
//   username,
//   password,
//   phone,
//   email,
//   profilePic,
//   '',
//   '',
//   false,
//   false,
//   true,
//   ''
// );
// // Appel de la méthode create du repository pour enregistrer le nouvel utilisateur dans la base de données
