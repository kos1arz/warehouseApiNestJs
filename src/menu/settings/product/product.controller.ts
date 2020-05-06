import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductDto } from './Dto/product.todo';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    showAllItems() {
        return this.productService.showAll();
    }

    @Post()
    createItem(@Body() data: ProductDto) {
        return this.productService.create(data);
    }

    @Put(':id')
    updateItem(@Param('id') id: number, @Body() data: Partial<ProductDto>) {
        return this.productService.updata(id, data);
    }

    @Delete(':id')
    deleteItem(@Param('id') id: number) {
        return this.productService.delete(id);
    }

    @Delete()
    deleteMenyItems(@Body() array: number[]) {
        return this.productService.delateManyItems(array);
    }

}
