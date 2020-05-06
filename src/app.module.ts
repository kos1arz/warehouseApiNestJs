import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './menu/settings/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './menu/settings/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    CategoryModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
