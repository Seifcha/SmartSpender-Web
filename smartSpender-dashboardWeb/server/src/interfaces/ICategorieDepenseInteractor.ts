import { CategorieDepense } from "../entities/CategorieDepense";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";
import Buffer from "buffer";
export interface ICategorieDepenseInteractor {
  ajouterCategorieDepense(input: any);
  modifierCategorieDepense(
    id: number,
    nomCategorie: string,
    image: string,
    possedeFournisseurDepense: number,
    idCategoriesFournisseurSelected: number[]
  );

  supprimerCategorieDepense(id: number): Promise<void>;
  validerCategorieDepense(id: number);
  definirSeuil(id: number, seuil: number);
  getCategorieDepenses(limit: number | undefined, offset: number);
  getCategorieDepense(id: number);
  // a voir si le promise est obligatoir ou non
  ajouterCategoriesDepenseFournisseur(
    categoryId: number,
    categoriesFournisseur: number[]
  );
}
