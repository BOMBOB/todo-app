const bookshelf = require('../db')


const TodoModel = bookshelf.Model.extend({
  tableName: 'todos',
  hasTimestamps: true,
})

module.exports = TodoModel;