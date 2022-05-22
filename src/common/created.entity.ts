import { CreateDateColumn, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export class CreatedEntity {
  @PrimaryColumn()
  @ObjectIdColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;
}
