import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import Teacher from 'App/Models/Teacher'

export default class RoomController {
  public async store({ response, request }: HttpContextContract) {
    const data = request.body()
    const teacher = await Teacher.find(data.teacherId)
    if (!teacher) {
      return response.notFound({ message: 'teacher does not exist.' })
    }
    const room = new Room()
    room.number = data.number
    room.capacity = data.capacity
    room.availability = data.availability
    await teacher.related("rooms").save(room)
    return response.status(201).send(room)
  }

  public async index({ response }: HttpContextContract) {
    const rooms = await Room.query().preload('teacher')
    return response.status(200).send(rooms)
  }

  public async update({ response, request, params }: HttpContextContract) {
    const { id } = params
    const room = await Room.find(id)
    if (!room) {
      return response.notFound({ message: 'room not found.' })
    }
    const data = request.only(['number', 'capacity'])
    room.number = data.number
    room.capacity = data.capacity
    await room.save()
    return response.status(200).send({ message: 'Room updated successfully.' })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params
    const room = await Room.find(id)
    if (!room) {
      return response.notFound({ message: 'Room not found.' })
    }
    await room.delete()
    return response.status(200).send({ message: 'Room deleted successfully' })
  }
}