import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './menu/settings/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
