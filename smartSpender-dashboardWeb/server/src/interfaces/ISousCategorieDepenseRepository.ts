import { SousCategorieDepense } from "../entities/SousCategorieDepense";

export interface ISousCategorieDepenseRepository {
  create(categorie: SousCategorieDepense): Promise<SousCategorieDepense>;
  update(id: number, nomCategorie: string, image :string, idCategorieDepense: number): Promise<SousCategorieDepense>;
  delete(id: number): Promise<boolean>;
  findAll(limit: number | undefined, offset: number): Promise<SousCategorieDepense[]>;
  findById(id: number): Promise<SousCategorieDepense | null>;
  validate(id: number): Promise<SousCategorieDepense>;

}