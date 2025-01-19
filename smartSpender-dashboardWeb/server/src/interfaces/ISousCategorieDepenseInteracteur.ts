import { SousCategorieDepense } from "../entities/SousCategorieDepense";

export interface ISousCategorieDepenseInteractor {
  getNomCategorieDepenseByID(idCategorieDepense: number): Promise<string>;
  ajouterSousCategorieDepense(input: any);
  modifierSousCategorieDepense(id: number, nomSousCategorie: string, image: string, idCategorieDepense: number );
  supprimerSousCategorieDepense(id: number): Promise<boolean>;
  validerSousCategorieDepense(id: number): Promise<SousCategorieDepense>;
  definirSeuil(id: number, seuil: number): Promise<SousCategorieDepense>;
  getSousCategoriesDepenses(limit: number | undefined, offset: number): Promise<SousCategorieDepense[]>; 
  getSousCategorie(id: number)

}