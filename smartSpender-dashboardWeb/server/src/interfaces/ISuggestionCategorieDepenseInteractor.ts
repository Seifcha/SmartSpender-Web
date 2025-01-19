import { CategorieDepense } from "../entities/CategorieDepense";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";
import Buffer from "buffer";
export interface ISuggestionCategorieDepenseInteractor {
  validerSuggestionCategorieDepense(id: number);
  supprimerSuggestionCategorieDepense(id: number);
  getSuggestionCategorieDepenses(limit: number | undefined, offset: number);
  getSuggestionCategorieDepense(id: number);
  // a voir si le promise est obligatoir ou non
}
