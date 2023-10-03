export class CreateUserDto {
  readonly Username: string;
  readonly Password: string;
  readonly Name: string;
  readonly Vorname: string;
  readonly Alter: number;
  readonly Geschlecht: string;
}
