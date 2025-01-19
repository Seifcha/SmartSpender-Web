import { CategorieFournisseur } from "../entities/CategorieFournisseur";

export interface ICategorieFournisseurRepository {
  create(categorie: CategorieFournisseur): Promise<CategorieFournisseur>;
  update(
    IdCategorieFournisseur: number,
    nomCategorie: string,
    image: string
  ): Promise<CategorieFournisseur>;
  findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieFournisseur[]>;
  findById(id: number): Promise<CategorieFournisseur | null>;
  delete(id: number): Promise<boolean>;
  findByCategorieDepense(id: number): Promise<CategorieFournisseur[]>;
  findByCategorieRevenu(id: number): Promise<CategorieFournisseur[]>;
}
