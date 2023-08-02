import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'

export default class Teacher extends BaseModel {
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
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @hasMany(() => Room)
  public rooms: HasMany<typeof Room>
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get table() {
    return 'Teachers'
  }
}