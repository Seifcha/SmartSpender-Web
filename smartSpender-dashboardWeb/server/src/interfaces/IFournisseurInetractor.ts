import { Fournisseur } from "../entities/Fournisseur";

export interface IFournisseurInteractor {
  ajouterFournisseur(input: any);
  modifierFournisseur(
    id: number,
    nom: string,
    logo: string,
    mail: string,
    phone: number,
    idCategorieFournisseur: number
  );
  supprimerFournisseur(IdFournisseur: number);
  validerFournisseur(IdFournisseur: number);
  getFournisseurs(limit: number | undefined, offset: number);
  getFournisseur(IdFournisseur: number);
}
