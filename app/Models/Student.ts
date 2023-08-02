import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public email: string
  @column()
  public registry: number
  @column.dateTime()
  public birth_date: DateTime
  
  @manyToMany(() => Room, {
    localKey: 'id',
    pivotForeignKey: 'student_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'room_id',
    pivotTable: 'allocations',
  })
  public rooms: ManyToMany<typeof Room>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}