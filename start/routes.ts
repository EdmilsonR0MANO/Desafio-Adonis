import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.resource('/students', 'StudentsController').apiOnly()
  Route.resource('/allocations', 'AllocationsController').apiOnly()
  Route.resource('/teachers', 'TeachersController').apiOnly()
  Route.resource('/rooms', 'RoomsController').apiOnly()
  Route.get('/allocations/:id/rooms', 'AllocationsController.indexRooms')
  Route.delete(
    '/allocations/:studentId/rooms/:roomId/teachers/:teacherId',
    'AllocationsController.remove'
  )
  Route.get('/allocations/:roomId/students', 'AllocationsController.indexStudents')
}).prefix('/api')