const bookshelf = require('../db')
const SubTaskModel = require('./SubtaskModel');
const TodoModel = bookshelf.Model.extend({
  tableName: 'todos',
  hasTimestamps: true,
  subtasks() {
    return this.hasMany(SubTaskModel)
  }
})

module.exports = TodoModel;