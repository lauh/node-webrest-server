import { Router } from 'express';
import { TodosController } from './controller';


export class TodosRoutes {

  static get routes (): Router {
    const router = Router();
    const todosController = new TodosController();
    router.get('/', (req, res) => { todosController.getTodos(req, res); });
    //* La línea anterior pruede resumirse en:
    //* router.get('/api/todos', todosController.getTodos);
    router.get('/:id', todosController.getTodoById);
    router.post('/', todosController.createTodo);
    router.put('/:id', todosController.updateTodo);
    router.delete('/:id', todosController.deleteTodo);
    return router;
  }




}