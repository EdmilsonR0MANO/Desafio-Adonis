import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'
import Student from './Student'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public capacity: number

  @column()
  public  availability:  boolean

  @column()
  public teacherId: number

  @belongsTo(() => Teacher)
  public teacher: BelongsTo<typeof Teacher>

  @manyToMany(() => Student, {
    localKey: 'id',
    pivotForeignKey: 'room_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'student_id',
    pivotTable: 'allocations',
    pivotTimestamps: true,
  })
  public students: ManyToMany<typeof Student>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}