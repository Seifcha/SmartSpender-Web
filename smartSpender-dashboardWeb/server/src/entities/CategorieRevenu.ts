export class CategorieRevenu {
  constructor(
    public readonly IdCategorie: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deleted: boolean,
    public readonly deletedAt: Date,
    public readonly nomCategorie: string,
    public readonly isPublic: boolean,
    public readonly validated: boolean,
    public readonly image: Buffer,
    public readonly possedeFournisseurRevenuInt: number,
    public readonly userEmail: string
  ) {}
}
