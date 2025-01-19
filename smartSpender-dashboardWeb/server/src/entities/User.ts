export class User {
    public readonly IdUser: number;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deleted: boolean;
    public readonly deletedAt: Date;
    public readonly nom: string;
    public readonly prenom: string;
    public readonly dateNaissance: Date;
    public readonly genre: string;
    public readonly email: string;
    public readonly motDePasse: string;
    public readonly phone: string;
    public readonly adresse: string;
    public readonly photoProfil: string;
    public readonly domaineTravail: string;
    public readonly posteTravail: string;
    public readonly codeConfirmationCompte: string;
    public readonly resetCode: string;
    public readonly codeMail: string;
    public readonly isMailValidated: boolean;
    public readonly isActive: boolean;
  
    constructor(
      IdUser: number,
      createdAt: Date,
      updatedAt: Date,
      deleted: boolean,
      deletedAt: Date,
      nom: string,
      prenom: string,
      dateNaissance: Date,
      genre: string,
      email: string,
      motDePasse: string,
      phone: string,
      adresse: string,
      photoProfil: string,
      domaineTravail: string,
      posteTravail: string,
      codeConfirmationCompte: string,
      resetCode: string,
      codeMail: string,
      isMailValidated: boolean,
      isActive: boolean
    ) {
      this.IdUser = IdUser;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deleted = deleted;
      this.deletedAt = deletedAt;
      this.nom = nom;
      this.prenom = prenom;
      this.dateNaissance = dateNaissance;
      this.genre = genre;
      this.email = email;
      this.motDePasse = motDePasse;
      this.phone = phone;
      this.adresse = adresse;
      this.photoProfil = photoProfil;
      this.domaineTravail = domaineTravail;
      this.posteTravail = posteTravail;
      this.codeConfirmationCompte = codeConfirmationCompte;
      this.resetCode = resetCode;
      this.codeMail = codeMail;
      this.isMailValidated = isMailValidated;
      this.isActive = isActive;
    }
  }
  