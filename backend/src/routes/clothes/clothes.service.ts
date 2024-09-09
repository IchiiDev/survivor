import { Injectable } from "@nestjs/common";
import { db } from "../../main";

@Injectable()
export class ClothesService {
    async getClothesByType(type: string): Promise<{
        id: string,
        type: string,
        image: string
    }[] | null> {
        const result = await db.query('SELECT * FROM clothes WHERE type=?', type);

        if (Array.isArray(result[0])) {
            return result[0].map((row: any) => ({
                id: row.id,
                type: row.type,
                image: row.type
            }));
        }
        return null;
    }
}
