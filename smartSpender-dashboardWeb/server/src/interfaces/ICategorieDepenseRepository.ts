import { CategorieDepense } from "../entities/CategorieDepense";
import Buffer from "buffer";
export interface ICategorieDepenseRepository {
  create(categorie: CategorieDepense): Promise<CategorieDepense>;
  modifierCategorieDepense(
    id: number,
    nomCategorie: string,
    image: string,
    possedeFournisseurDepense: number
  );
  ajouterNouvellesLignesCategoriesDepenseFournisseur(
    idCategorieDepense: number,
    idCategoriesFournisseurSelected: number[]
  );
  supprimerToutesAssociations(idCategorieDepense: number);
  supprimerAssociationsNonIncluses(
    idCategorieDepense: number,
    idCategoriesFournisseurSelected: number[]
  );

  // supprimerCategorieDepense(id: number): Promise<void>;
  // supprimerAssociationsCategorieDepense(
  //   idCategorieDepense: number
  // ): Promise<void>;
  // supprimerToutesAssociations(idCategorieDepense: number): Promise<void>;

  validate(id: number): Promise<CategorieDepense>;
  findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieDepense[]>;
  findById(id: number): Promise<CategorieDepense | null>;
  createCategoriesDepenseFournisseur(
    categoryId: number,
    categoriesFournisseur: number[]
  );
  supprimerCategorieDepense(id: number): Promise<void>;
}
