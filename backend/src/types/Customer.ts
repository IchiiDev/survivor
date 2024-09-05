export type CustomerRaw = {
  id: number;
  email: string;
  name: string;
  surname: string;
  birthdate: Date;
  gender: string;
  description: string;
  astrological_sign: string;
};

export class Customer {
  private id: number;

  private email: string;

  private name: string;

  private surname: string;

  private birthdate: Date;

  private gender: string;

  private description: string;

  private astrologicalSign: string;

  constructor(customer: CustomerRaw) {
    this.id = customer.id;
    this.email = customer.email;
    this.name = customer.name;
    this.surname = customer.surname;
    this.birthdate = new Date(customer.birthdate);
    this.gender = customer.gender;
    this.description = customer.description;
    this.astrologicalSign = customer.astrological_sign;
  }

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getSurname(): string {
    return this.surname;
  }

  public getBirthDate(): Date {
    return this.birthdate;
  }

  public getBirthDateString(): string {
    return this.birthdate.toISOString();
  }

  public getGender(): string {
    return this.gender;
  }

  public getDescription(): string {
    return this.description;
  }

  public getAstrologicalSign(): string {
    return this.astrologicalSign;
  }
}
