import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../../category/Entity/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Category, category => category.product)
  category: Category;

  @Column()
  name: string;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  update: Date;
}