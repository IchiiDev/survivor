export type EncounterRaw = {
  id: number;
  customer_id: number;
  date: string;
  rating: number;
  comment: string;
  source: string;
};

export class Encounter {
  private id: number;
  private customerId: number;
  private date: Date;
  private rating: number;
  private comment: string;
  private source: string;

  constructor(encounter: EncounterRaw) {
    this.id = encounter.id;
    this.customerId = encounter.customer_id;
    this.date = new Date(encounter.date);
    this.rating = encounter.rating;
    this.comment = encounter.comment;
    this.source = encounter.source;
  }

  public getId(): number {
    return this.id;
  }

  public getCustomerId(): number {
    return this.customerId;
  }

  public getDate(): Date {
    return this.date;
  }

  public getDateString(): string {
    return this.date.toISOString();
  }

  public getRating(): number {
    return this.rating;
  }

  public getComment(): string {
    return this.comment;
  }

  public getSource(): string {
    return this.source;
  }
}
