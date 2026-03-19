import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsNotEmpty, IsBoolean } from 'class-validator'

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string

  @Column({ default: false })
  @IsBoolean()
  completed!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
