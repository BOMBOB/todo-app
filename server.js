const express = require('express');
const bodyParser = require('body-parser')

const { TodoModel, SubTaskModel } = require('./models')

const app = express();

app.use(bodyParser.json())
app.post('/todos/:id/subtasks', async (req,res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id || !name ) {
    res.status(404).json({

    })
    return;
  }
  const todo = await new TodoModel({ id }).fetch();
  if (!todo){
    return;
  }
  console.log('>>todo')

  const subtask = await new SubTaskModel({ todo_id: todo.get('id'), name }).save(null, { method: 'insert' });
 
  res.json({
    success: true, 
    code: 200,
    message: 'Success',
    data: subtask.toJSON(),
  })
})
app.get('/', (req, res) => {
  res.send('Get Method')
})
app.get('/:id', async (req,res) => {
  const { id } = req.params;
  const todo = new TodoModel({ id });
  await todo.fetch();
  res.status(200).json({
    success: true,
    message: 'Success',
    code: 200,
    data: todo.toJSON(),
  })
})
app.get('/subtasks/:id', async(req, res) => {
  const subtask = await new SubTaskModel.fetch({ withRelated: ['todo']})
  res.json({
    data: subtask.toJSON(),
  })
})
app.get('/todos/:id/subtasks', async (req,res) => {
  const { id } = req.params;
  const todo = await new TodoModel({ id }).fetch({ withRelated: ['subtasks']})
  console.log('>>todo: ', todo)
  console.log('>>todo.toJSON(): ', todo.toJSON());
  res.status(200).json({
    success: true,
    message: 'Success', 
    code: 200,
    data: todo.toJSON(),
  })
})
app.post('/', async (req, res) => {
  console.log('req.body:', req.body);
  const { name } = req.body
  if (!name) {
    res.status(404).json({
      success: false,
      message: 'Name is undefined',
      code: 404,
      data: null,
    })
    return
  }
  const todo = new TodoModel({ name })
  await todo.save(null, { method: 'insert' })

  console.log('>>todo: ', todo);
  console.log('>>todo>JSON: ', todo.toJSON())
  res.status(200).json({
    success: true,
    message: 'Success',
    code: 200,
    data: todo.toJSON(),
  })
})
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const todo = await new TodoModel({ id }).fetch();
  if( !todo) {
    res.status(404).json({
      success:false,
      message: "Not Found",
      code: 404,
      data: null,
    })
    return
  }
  todo.save({ name }, { method: 'update', patch: true });
  res.status(200).json({
    success: true,
    message: 'Success',
    code: 200,
    data: todo.toJSON(),
  })
  
})
app.delete('/', (req, res) => {
  res.send('Delete Method')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listen: ', PORT);
})

// get /todos?page=1
// post /todos
// get put /todos/:id
// delete /todos/:id
  
// get /todos/:id/sub_tasks
// post /todos/:id/sub_tasks
// get, put, delete /todos/:id/sub_tasks/:subTaskId

