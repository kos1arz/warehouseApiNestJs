import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../Entity/category.entity';
import { CategoryDto } from '../Dto/category.todo';
import { isNotEmpty } from 'class-validator';


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async showAll(): Promise<any> {
        return await this.categoryRepository.find();
    }

    async create(data: CategoryDto): Promise<any> {
        const item = await this.categoryRepository.create(data);
        await this.categoryRepository.save(item);
        return item;
    }

    async updata(id: number, data: Partial<CategoryDto>): Promise<any> {
        let item = await this.categoryRepository.findOne({ where: { id } });
        if (!item) {
            throw new HttpException(`Not found item by id: ${id}`, HttpStatus.NOT_FOUND);
        }
        await this.categoryRepository.update({id}, data);
        item = await this.categoryRepository.findOne({ where: {id} });
        return item;
    }

    async delete(id: number): Promise<any> {
        const item = await this.categoryRepository.findOne({ where: { id } });
        if (!item) {
            throw new HttpException(`Not found item by id: ${id}`, HttpStatus.NOT_FOUND);
        }
        await this.categoryRepository.delete({ id });
        return { delete: true };
    }
}
