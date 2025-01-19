import { CategorieFournisseur } from "../entities/CategorieFournisseur";

export interface ICategorieFournisseurInteractor {
  ajouterCategorieFournisseur(input: any);
  modifierCategorieFournisseur(
    IdCategorieFournisseur: number,
    nomCategorie: string,
    image: string
  );
  getCategorieFournisseurs(limit: number | undefined, offset: number);
  getCategorieFournisseur(IdCategorieFournisseur: number);
  supprimerCategorieFournisseur(id: number);
  getCategoriesFournisseurDepenseAssociees(id: number);
  getCategoriesFournisseurRevenuAssociees(id: number);
}
