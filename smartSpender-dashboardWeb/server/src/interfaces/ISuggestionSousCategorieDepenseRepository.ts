import { SousCategorieDepense } from "../entities/SousCategorieDepense";

export interface ISuggestionSousCategorieDepenseRepository {
  findAll(
    limit: number | undefined,
    offset: number
  ): Promise<SousCategorieDepense[]>;
  findById(id: number): Promise<SousCategorieDepense | null>;
  update(id: number): Promise<SousCategorieDepense>;
  delete(id: number): Promise<boolean>;
}
