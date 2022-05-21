import { CreateDateColumn, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export class CreatedEntity {
  @ObjectIdColumn()
  @PrimaryColumn()
  _id: string;

  @CreateDateColumn()
  createdAt: Date;
}
