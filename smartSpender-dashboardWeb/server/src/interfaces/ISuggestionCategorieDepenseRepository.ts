import { CategorieDepense } from "../entities/CategorieDepense";
import Buffer from "buffer";
export interface ISuggestionCategorieDepenseRepository {
  delete(id: number): Promise<boolean>;
  findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieDepense[]>;
  findById(id: number): Promise<CategorieDepense | null>;
  update(id: number): Promise<CategorieDepense>;
}
