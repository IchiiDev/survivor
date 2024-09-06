import { ApiProperty } from '@nestjs/swagger';

export type EmployeeRaw = {
  id: number;
  email: string;
  name: string;
  surname: string;
  birth_date: string;
  gender: string;
  work: string;
};

export class Employee {
  @ApiProperty()
  private id: number;

  @ApiProperty()
  private email: string;

  @ApiProperty()
  private name: string;

  @ApiProperty()
  private surname: string;

  @ApiProperty({ type: 'string', format: 'date' })
  private birthDate: Date;

  @ApiProperty()
  private gender: string;

  @ApiProperty()
  private work: string;

  constructor(employee: EmployeeRaw) {
    this.id = employee.id;
    this.email = employee.email;
    this.name = employee.name;
    this.surname = employee.surname;
    this.birthDate = new Date(employee.birth_date);
    this.gender = employee.gender;
    this.work = employee.work;
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
    return this.birthDate;
  }

  public getBirthDateString(): string {
    return this.birthDate.toISOString();
  }

  public getGender(): string {
    return this.gender;
  }

  public getWork(): string {
    return this.work;
  }
}
