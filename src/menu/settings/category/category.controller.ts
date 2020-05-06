import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryDto } from './Dto/category.todo';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get()
    showAllItems() {
        return this.categoryService.showAll();
    }

    @Post()
    createItem(@Body() data: CategoryDto) {
        return this.categoryService.create(data);
    }

    @Put(':id')
    updateItem(@Param('id') id: number, @Body() data: Partial<CategoryDto>) {
        return this.categoryService.updata(id, data);
    }

    @Delete(':id')
    deleteItem(@Param('id') id: number) {
        return this.categoryService.delete(id);
    }

    @Delete()
    deleteMenyItems(@Body() array) {
        return this.categoryService.delateManyItems(array.ids);
    }

}
