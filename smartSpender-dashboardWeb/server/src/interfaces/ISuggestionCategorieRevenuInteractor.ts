import { CategorieRevenu } from "../entities/CategorieRevenu";
import Buffer from "buffer";
export interface ISuggestionCategorieRevenuInteractor {
  validerSuggestionCategorieRevenu(id: number);
  supprimerSuggestionCategorieRevenu(id: number);
  getSuggestionCategorieRevenus(limit: number | undefined, offset: number);
  getSuggestionCategorieRevenu(id: number);
  // a voir si le promise est obligatoir ou non
}
