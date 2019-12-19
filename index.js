const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
let students = [];
let student_id = 0;

// redirect to base app
app.get('/', (req, res) => {
  res.redirect('/students');
});

// render index of app
app.get('/students', (req, res) => {
  res.render('index', { students });
});

// add student to list
app.post('/students', (req, res) => {
  let data = req.body;
  data.id = ++student_id;
  students.push(data);
  res.status(200).send(students);
});

// update student in list by id
app.put('/students/:id', (req, res) => {
  let id = req.params.id;
  students.forEach((student, index) => {
    if (student.id == id) {
      students[index] = req.body;
      students[index].id = id;
    }
  });
  res.status(200).send(students);
});

// get student by id
app.get('/students/:id', (req, res) => {
  let id = req.params.id;
  res.status(200).send(students.filter(student => student.id == id));
});

app.delete('/students/:id', (req, res) => {
  let id = req.params.id;
  students = students.filter(student => student.id != id);
  res.status(200).send(students);
});

const server = app.listen(8888, 'localhost', () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Server running at http://${host}:${port}/`)
})