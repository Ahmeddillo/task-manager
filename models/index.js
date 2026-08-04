const User = require('./User');
const Task = require('./Task');

// İlişki Tanımı: One-to-Many
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Task,
};
