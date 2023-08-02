import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import Room from 'App/Models/Room'
import Teacher from 'App/Models/Teacher'
export default class AllocationsController {
  public async store({ response, request }: HttpContextContract) {
    const data = request.only(['studentId', 'roomId', 'teacherId'])
    const teacher = await Teacher.find(data.teacherId)
    if (!teacher) {
      return response.notFound({ message: 'Professor não existe.' })
    }

    const room = await Room.query()
      .where('id', data.roomId)
      .andWhere('teacher_id', teacher.id)
      .preload('students')
      .first()

    if (!room) {
      return response.notFound({ message: 'room not found.' })
    }

    const student = await Student.find(data.studentId)
    if (!student) {
      return response.notFound({ message: 'student not found.' })
    }
    if (!room.availability) {
      return response.badRequest({ message: 'The room is not available.' })
    }
    if (room.students.find((a) => a.id === student.id)) {
      return response.badRequest({ message: 'The student is already allocated in this room.' })
    }

    if (room.students.length >= room.capacity) {
      return response.badRequest({ message: 'The maximum capacity of the room has been reached.' })
    }

    await room.related('students').attach([student.id])

    return response.status(200).send({ message: 'Student allocated successfully' })
  }
  public async indexRooms({ params, response }: HttpContextContract) {
    const student = await Student.query()
      .where('id', params.id)
      .preload('rooms', (query) => query.where('availability', true).preload('teacher'))
      .first()

    if (!student) {
      return response.notFound({ message: 'Aluno não encontrado.' })
    }
    const rooms = student.rooms.map((rooms) => {
      return {
        number: rooms.number,
        students: rooms.teacher.name,
      }
    })

    return {
      nomeAluno: student.name,
      salas: rooms,
    }
    // return aluno.salas
  }

  public async remove({ response, params }: HttpContextContract) {
    const {  roomId, studentId, teacherId } = params

    const room = await Room.query()
      .where('id', roomId)
      .andWhere('teacher_id', teacherId)
      .preload('students')
      .first()

    if (!room) {
      return response.notFound({ message: 'room not found.' })
    }

    const student = await Student.find(studentId)
    if (!student) {
      return response.notFound({ message: 'Aluno não encontrado.' })
    }

    const studentInRoom = room.students.filter((a) => a.id === student.id)
    if (studentInRoom.length === 0) {
      return response.badRequest({ message: 'The student is not allocated in this room.' })
    }

    await room.related('students').detach([student.id])

    return response.status(200).send({ message: 'Aluno removido da sala.' })
  }
  public async indexStudents({ response, params }: HttpContextContract) {
    const { roomId } = params
    const room = await Room.query().where('id', roomId).preload('students').first()

    if (!room) {
      return response.notFound({ message: 'room not found.' })
    }

    return room.students
  }
}