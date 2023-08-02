import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const student = await Student.create(body)
    response.status(201)

    return {
      message: 'Aluno criado com sucesso',
      data: student,
    }
  }
  public async index() {
    const students = await Student.all()

    return { data: students }
  }
  public async show({ params, response }: HttpContextContract) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Student not exist.' })
    }
    return {
      data: student,
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Student not exist.' })
    }
    await student.delete()
    return {
      message: 'Student disconnected successfully',
      data: student,
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Students not found.' })
    }
    student.name = body.name
    student.email = body.email
    student.registry = body.registry
    student.birth_date = body.birth_date
    await student.save()

    return {
      message: 'Student updated successfully',
      data: student,
    }
  }
}