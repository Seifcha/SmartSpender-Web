import { CategorieRevenu } from "../entities/CategorieRevenu";
import Buffer from "buffer";
export interface ISuggestionCategorieRevenuRepository {
  delete(id: number): Promise<boolean>;
  findAll(
    limit: number | undefined,
    offset: number
  ): Promise<CategorieRevenu[]>;
  findById(id: number): Promise<CategorieRevenu | null>;
  update(id: number): Promise<CategorieRevenu>;
}
