import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../Entity/product.entity';
import { ProductDto } from '../Dto/product.todo';
import { Category } from '../../category/Entity/category.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async showAll(): Promise<ProductDto[]> {
        return await this.productRepository.find({ relations: ['category'] });
    }

    async create(data: ProductDto): Promise<ProductDto> {    
        const categoryId: number = await data.category.id;
        const categoryValue = await this.categoryRepository.findOne({ where: {id: categoryId} });
        if (!categoryValue) {
            throw new HttpException(`Not found item by category id: ${categoryId}`, HttpStatus.NOT_FOUND);
        }
        const item = await this.productRepository.create({ name: data.name, category: categoryValue});
        await this.productRepository.save(item);
        return item;
    }

    async updata(id: number, data: Partial<ProductDto>): Promise<ProductDto> {
        let item = await this.productRepository.findOne({ where: { id } });
        if (!item) {
            throw new HttpException(`Not found item by id: ${id}`, HttpStatus.NOT_FOUND);
        }
        await this.productRepository.update({id}, data);
        item = await this.productRepository.findOne({ where: {id} });
        return item;
    }

    async delete(id: number): Promise<any> {
        const item = await this.productRepository.findOne({ where: { id } });
        if (!item) {
            throw new HttpException(`Not found item by id: ${id}`, HttpStatus.NOT_FOUND);
        }
        await this.productRepository.delete({ id });
        return { delete: true };
    }

    async delateManyItems(arrayIds: number[]): Promise<any> {
        await arrayIds.forEach(id => {
            const item = this.productRepository.findOne({ where: { id } });
            if (!item) {
                throw new HttpException(`Not found item by id: ${id}`, HttpStatus.NOT_FOUND);
            }
        });
        await this.productRepository.delete(arrayIds);
        return { delete: true };
    }
}
