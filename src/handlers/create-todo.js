const {dbConnection} = require("../mongo.client");

const createTodo = async (event) => {
  const {todo} = JSON.parse(event.body);
  const date = new Date().toISOString();

  const newTodo = {
    todo,
    createdAt: date,
    updatedAt: date,
    complete: false
  }

  await dbConnection.collection('todos').insertOne(newTodo);

  return {
    statusCode: 200,
    body: JSON.stringify('Created')
  };
};

module.exports = {
  handler: createTodo,
}