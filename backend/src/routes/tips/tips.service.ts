import { Injectable } from "@nestjs/common";
import { db } from "../../main";

@Injectable()
export class TipsService {
    async getAllTips(): Promise<{ id: number, title: string, tip: string }[] | null> {
        const result = await db.query('SELECT * FROM tips');

        if (Array.isArray(result[0])) {
            return result[0].map((row: any) => ({
                id: row.id,
                title: row.title,
                tip: row.tip,
            }));
        }

        return null;
    }

    async createTip(title: string, tip: string): Promise<string> {
        await db.query(
            'INSERT INTO tips (title, tip) VALUES (?, ?)',
            [title, tip],
        );
        return `New tip created.`;
    }
}

