import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

/**
 * Principio KISS - Keep It Simple & Stupid - mantenha simples seus código
 */
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  /**
   * Tipos de Relacionamentos
   * Um para Um (OneToOne)
   * Um para Muitos (OneToMany)
   * Muitos para Muitos(ManyToMany)
   */
  // propriedade de User pode ser qualquer nome
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'provider_id',
  })
  provider: User;

  @Column('time without time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Appointment;
