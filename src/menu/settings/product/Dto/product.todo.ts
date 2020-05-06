import { IsString, IsObject } from 'class-validator';
import { Category } from '../../category/Entity/category.entity';

export class ProductDto{
    @IsString()
    readonly name: string;

    readonly category: Category;
}