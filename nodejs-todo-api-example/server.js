/**
 * 1. Hämta alla todos
 * 2. Lägg till en todo
 * 3. Ta bort en todo
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

console.log('UUID:', uuidv4())
app.use(express.json());

let todos = [];

// URL: /api/todo
// Method: GET
app.get('/api/todo', (request, response) => {
  const result = {
    allTodos: todos,
    success: true
  }

  response.json(result);
});

// URL: /api/todo
// Method: POST

//Vad behöver vi skicka med i body från frontend?
app.post('/api/todo', (request, response) => {
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

app.delete('/api/todo/:id', (request, response) => {
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
})

app.listen(8000, () => {
  console.log('Server started');
})


// I vår vanilla JS - fil i frontend

// const todo = {
//   task: 'Brygg kaffe'
// }
// const response = await fetch('http://localhost:8000/api/todo', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(todo)
// })
// const data = await response.json();