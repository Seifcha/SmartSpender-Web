import { CategorieRevenu } from "../entities/CategorieRevenu";

export interface ICategorieRevenuRepository {
  create(categorie: CategorieRevenu): Promise<CategorieRevenu>;
  modifierCategorieRevenu(
    id: number,
    nomCategorie: string,
    image: string,
    possedeFournisseurRevenu: number
  );
  ajouterNouvellesLignesCategoriesRevenuFournisseur(
    idCategorieRevenu: number,
    idCategoriesFournisseurSelected: number[]
  );
  supprimerToutesAssociations(idCategorieRevenu: number);
  supprimerAssociationsNonIncluses(
    idCategorieRevenu: number,
    idCategoriesFournisseurSelected: number[]
  );
  validate(id: number): Promise<CategorieRevenu>;
  findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieRevenu[]>;
  findById(id: number): Promise<CategorieRevenu | null>;
  createCategoriesRevenuFournisseur(
    categoryId: number,
    categoriesFournisseur: number[]
  );
  supprimerCategorieRevenu(id: number): Promise<void>;
}
