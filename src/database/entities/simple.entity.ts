import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('Simple')
export class Simple {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @CreateDateColumn({ type: 'timestamp', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 6, nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', precision: 6, nullable: true })
  deletedAt?: Date;
}
