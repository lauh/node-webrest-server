import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy bread', completedAt: null },
  { id: 3, text: 'Buy butter', completedAt: new Date() }
]

export class TodosController {



  constructor () {

  }

  public getTodos = (req: Request, res: Response) => {
   return res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find(todo => todo.id === id);
    
    if(isNaN(id)) {
      res.status(400).json({error: 'ID is not a number'});
      return;
    }
    
    if(todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: `Todo with ID ${id} not found` })
    }


  }


  public createTodo = (req: Request, res: Response) => {
    const {text} = req.body;
    if(!text) {
      res.status(404).json({ error: 'Text property is required'});
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null
    };
    todos.push(newTodo);

    res.json(newTodo);
  }


  public updateTodo = (req: Request, res: Response) => {
  
    const id = +req.params.id;
    const todo = todos.find(todo => todo.id === id);
    
    if(isNaN(id)) {
      res.status(400).json({error: 'ID is not a number'});
      return;
    }

    if(!todo) {
      res.status(404).json({error: `Todo with ID ${id} not found`});
      return;
    }

    const {text, completedAt: completedAt} = req.body;
    
    // if(!text) {
    //   res.status(400).json({ error: 'Text property is required' });
    //   return;
    // }

    todo.text = text || todo.text;

    if(completedAt === 'null') {
      todo.completedAt = null;
    } else {
      todo.completedAt = new Date(completedAt) || todo.completedAt;
    }

    res.json(todo);
    
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find(todo => todo.id === id);
    
    if(!todo) {
      res.status(404).json({error: `Todo with ID ${id} not found`});
      return;  
    
    }

    todos.splice(todos.indexOf(todo), 1);
    res.json(todo)
  }

}