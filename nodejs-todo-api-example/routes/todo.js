// { Router } = kallas för object destructuring och plockar ut en specifik del ur ett objekt eller bibliotek 
// i detta fall.
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const router = new Router();

let todos = [];

router.get('/', (request, response) => {
  const result = {
    allTodos: todos,
    success: true
  }

  response.json(result);
});

// URL: /api/todo
// Method: POST

//Vad behöver vi skicka med i body från frontend?
router.post('/', (request, response) => {
  console.log(request.body);
  const todo = request.body;
  todo.id = uuidv4();
  console.log('Todo', todo);
  todos.push(todo);

  //Vad ska vi skicka tillbaka som svar?
  
  const result = {
    success: true,
    allTodos: todos
  }

  response.json(result);
});

// URL: /api/todo/:id
// Method: DELETE

router.delete('/:id', (request, response) => {
  const todoId = request.params.id;
  console.log(todoId);
  todos = todos.filter((todo) => {
    return todo.id !== todoId
  });
  console.log(todos);

  //Vad ska vi skicka tillbaka som svar?
  const result = {
    success: true,
    allTodos: todos
  }

  response.json(result);
});

module.exports = router;

// Exempel på object destructuring
// const obj = {
//   name: 'Christoffer'
// }

// const { name } = obj;
// console.log(name) // => Christoffer