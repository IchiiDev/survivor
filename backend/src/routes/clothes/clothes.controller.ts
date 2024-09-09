import { Controller, Get, HttpException, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ClothesService } from "./clothes.service";

@Controller('clothes')
@ApiTags('clothes')
export class ClothesController {
    constructor(private readonly clothesService: ClothesService) { }

    @Get()
    getClothesByType(@Param('type') type: string): Promise<{
        id: string,
        type: string,
        image: string
    }[]> {
        const result = this.clothesService.getClothesByType(type);

        if (!result) {
            throw new HttpException("Type not valid", 404);
        }
        return result;
    }
}
