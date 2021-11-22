import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Password {
  @PrimaryColumn()
  userId: number;

  @Column()
  salt: string;

  @Column()
  hash: string;
}
