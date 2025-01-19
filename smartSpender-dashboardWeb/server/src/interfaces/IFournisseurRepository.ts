import { Fournisseur } from "../entities/Fournisseur";

export interface IFournisseurRepository {
  create(categorie: Fournisseur): Promise<Fournisseur>;
  update(
    id: number,
    nom: string,
    logo: string,
    mail: string,
    phone: number,
    idCategorieFournisseur: number
  ): Promise<Fournisseur>;
  delete(IdFournisseur: number): Promise<boolean>;
  validate(IdFournisseur: number): Promise<Fournisseur>;
  findAll(limit: number | undefined, offset: number): Promise<Fournisseur[]>;
  findById(IdFournisseur: number): Promise<Fournisseur | null>;
}
