import Buffer from "buffer";

export class CmsUser {
  constructor(
    public readonly id: number,
    public readonly nom: string,
    public readonly prenom: string,
    public readonly username: string,
    public readonly hashedPwd: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly photoProfil: Buffer,
    public readonly resetCodePhone: string,
    public readonly resetCodeMail: string,
    public readonly isMailValidated: boolean,
    public readonly isPhoneValidated: boolean,
    public readonly actif: boolean,
    public readonly refreshToken: string
  ) {}
}
