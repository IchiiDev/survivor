import { Injectable } from "@nestjs/common";
import { db } from "../../main";

@Injectable()
export class ClothesService {
    async getClothesByType(type: string): Promise<{
        id: string,
        type: string,
        image: string,
        customerId: string
    }[] | null> {
        const result = await db.query('SELECT * FROM clothes WHERE type=?', type);

        if (Array.isArray(result[0])) {
            return result[0].map((row: any) => ({
                id: row.id,
                type: row.type,
                image: row.image,
                customerId: row.customerId
            }));
        }
        return null;
    }

    async getClothesByCustomer(customerId: string): Promise<{
        id: string,
        type: string,
        image: string,
        customerId: string
    }[] | null> {
        const result = await db.query('SELECT * FROM clothes WHERE customer_id=?', customerId);

        if (Array.isArray(result[0])) {
            return result[0].map((row: any) => ({
                id: row.id,
                type: row.type,
                image: row.image,
                customerId: row.customerId
            }));
        }
        return null;
    }
}
