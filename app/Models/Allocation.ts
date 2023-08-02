import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from 'App/Models/Student'
import Room from 'App/Models/Room'
import Teacher from 'App/Models/Teacher'

export default class Alocacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public dateHour: DateTime

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>
  
  @belongsTo(() => Teacher)
  public teacher: BelongsTo<typeof Teacher>
}