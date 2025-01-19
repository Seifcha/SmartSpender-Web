import { CategorieRevenu } from "../entities/CategorieRevenu";

export interface ICategorieRevenuInteractor {
  ajouterCategorieRevenu(input: any);
  ajouterCategoriesRevenuFournisseur(
    categoryId: number,
    categoriesFournisseur: number[]
  );
  modifierCategorieRevenu(
    id: number,
    nomCategorie: string,
    image: string,
    possedeFournisseurRevenu: number,
    idCategoriesFournisseurSelected: number[]
  );

  supprimerCategorieRevenu(id: number);
  validerCategorieRevenu(id: number);
  getCategorieRevenus(limit: number | undefined, offset: number);
  getCategorieRevenu(id: number);

  // a voir si le promise est obligatoir ou non
}
