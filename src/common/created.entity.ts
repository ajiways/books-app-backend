import { ObjectId } from 'mongoose';
import { CreateDateColumn, ObjectIdColumn } from 'typeorm';

export class CreatedEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @CreateDateColumn()
  createdAt: Date;
}
