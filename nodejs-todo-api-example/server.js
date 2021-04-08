/**
 * 1. Hämta alla todos
 * 2. Lägg till en todo
 * 3. Ta bort en todo
 */

const express = require('express');
const app = express();
//Importera våra routes
const todoRouter = require('./routes/todo');

app.use(express.json());
//En middleware som körs innan ett request går in i en matchande route
//next() triggar att gå vidare i koden till matchande route
app.use((request, response, next) => {
  console.log(`I middleware innan route ${request.url}`);
  next();
});
//Sätt en basurl till alla routes så alla startar med /api/todo
//Sen säg att det är de routes som ligger i todoRouter som kopplas till denna basurl 
app.use('/api/todo', todoRouter);

//Om ingen route matchas så går request in i nedanstående funktion och skickar tillbaka ett
//felmeddelande
app.use((request, response) => {
  const result = {
    success: false,
    message: 'No endpoint found'
  }

  response.status(404).json(result);
});

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