import { Injectable } from "@nestjs/common";

@Injectable()
export class EncountersService {
    getAllEncounters(): string {
        return 'This service returns all encounters';
    }

    createEncounter(): string {
        return 'This service creates a new encounter';
    }

    getEncounter(id: number): string {
        return `This service returns an encounter with id ${id}`;
    }

    updateEncounter(id: number): string {
        return `This service updates an encounter with id ${id}`;
    }

    deleteEncounter(id: number): string {
        return `This action deletes an encounter with id ${id}`;
    }
}
