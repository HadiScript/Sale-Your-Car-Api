import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Report } from '../reports/report.entities'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];


}