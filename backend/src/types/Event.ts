export type EventRaw = {
  id: number;
  name: string;
  date: string;
  max_participants: number;
  location_x?: string;
  location_y?: string;
  location?: string;
  type: string;
  employee_ref: number;
  location_name: string;
};

class Location {
  private x: number = 0;
  private y: number = 0;

  constructor(coordinates: string | { x: string; y: string }) {
    if (
      typeof coordinates !== 'string' &&
      coordinates.x !== undefined &&
      coordinates.y !== undefined
    ) {
      this.x = parseFloat(coordinates.x);
      this.y = parseFloat(coordinates.y);
      return;
    }

    if (typeof coordinates === 'string') {
      const parsed = (<string>coordinates).match(
        /\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/,
      );
      if (parsed === null)
        throw new Error('Invalid coordinates format. Expected (x,y)');
      this.x = parseFloat(parsed[0]);
      this.y = parseFloat(parsed[1]);
    }
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public toString(): string {
    return `(${this.x},${this.y})`;
  }
}

export class Event {
  private id: number;
  private name: string;
  private date: Date;
  private maxParticipants: number;
  private location: Location;
  private type: string;
  private employeeRef: any;
  private locationName: string;

  constructor(raw: EventRaw) {
    this.id = raw.id;
    this.name = raw.name;
    this.date = new Date(raw.date);
    this.maxParticipants = raw.max_participants;
    if (
      (raw.location_x === undefined || raw.location_y === undefined) &&
      raw.location === undefined
    )
      throw new Error('Invalid location coordinates');
    if (raw.location !== undefined) {
      this.location = new Location({
        x: raw.location_x,
        y: raw.location_y,
      });
    } else this.location = new Location(raw.location);
    this.type = raw.type;
    this.employeeRef = raw.employee_ref;
    this.locationName = raw.location_name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDate(): Date {
    return this.date;
  }

  public getMaxParticipants(): number {
    return this.maxParticipants;
  }

  public getLocation(): Location {
    return this.location;
  }

  public getType(): string {
    return this.type;
  }

  public getEmployeeRef(): any {
    return this.employeeRef;
  }

  public getLocationName(): string {
    return this.locationName;
  }

  public toJSON(): EventRaw {
    return {
      id: this.id,
      name: this.name,
      date: this.date.toISOString(),
      max_participants: this.maxParticipants,
      location_x: this.location.getX().toString(),
      location_y: this.location.getY().toString(),
      location: this.location.toString(),
      type: this.type,
      employee_ref: this.employeeRef,
      location_name: this.locationName,
    };
  }
}
