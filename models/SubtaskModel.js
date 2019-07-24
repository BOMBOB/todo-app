const bookshelf = require('../db')

const SubTaskModel = bookshelf.Model.extend({
  tableName: 'sub_tasks',
  hasTimestamps: true,
  
})

module.exports = SubTaskModel;