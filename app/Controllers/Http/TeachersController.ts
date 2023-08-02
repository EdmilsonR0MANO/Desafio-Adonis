import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'

export default class TeacherController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const teacher = await Teacher.create(body)
    response.status(201)

    return {
      message: 'Teacher successfully created',
      data: teacher,
    }
  }
  public async index() {
    const teachers = await Teacher.all()

    return { data: teachers }
  }
  public async show({ params }: HttpContextContract) {
    const teacher = await Teacher.findOrFail(params.id)
    return {
      data: teacher,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()
    return {
      message: 'Teacher deleted successfully',
      data: teacher,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const teacher = await Teacher.findOrFail(params.id)
    teacher.name = body.nome
    teacher.email = body.email
    teacher.registry = body.registry
    teacher.birth_date = body.birth_date
    await teacher.save()

    return {
      message: 'Teacher updated successfully!',
      data: teacher,
    }
  }
}