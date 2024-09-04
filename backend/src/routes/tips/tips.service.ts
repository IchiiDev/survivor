import { Injectable } from "@nestjs/common";

@Injectable()
export class TipsService {
    getAllTips(): string {
        return 'This service returns all tips';
    }

    createTip(): string {
        return 'This service creates a new tip';
    }
}

