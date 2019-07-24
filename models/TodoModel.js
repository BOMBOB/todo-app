const bookshelf = require('../db')
const SubtaskModel = require("./SubtaskModel");

const TodoModel = bookshelf.Model.extend({
  tableName: 'todos',
  hasTimestamps: true,
  subTask() {
    return this.hasMany(SubtaskModel);
  }
})

module.exports = TodoModel;