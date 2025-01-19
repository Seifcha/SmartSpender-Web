import Buffer from "buffer";

export class SousCategorieDepense {
  constructor(
    public readonly IdSousCategorie: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deleted: boolean,
    public readonly deletedAt: Date,
    public readonly nomSousCategorie: string,
    public readonly isPublic: boolean,
    public readonly validated: boolean,
    public readonly image: Buffer,
    public readonly seuil: number,
    public readonly idCategorieDepense: number,
    public readonly userEmail: string
  ) {}
}
