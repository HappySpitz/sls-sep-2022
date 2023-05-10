const {dbConnection} = require("../mongo.client");
const {ObjectId} = require("mongodb");

const updateTodo = async (event) => {
  const {complete} = JSON.parse(event.body);
  const {todoId} = event.pathParameters;

  const todo = await dbConnection
      .collection('todos')
      .findOne({_id: new ObjectId(todoId)} );

  if (!todo) return {
      statusCode: 422,
      body: "Entity not found"
    }

  await dbConnection.collection('todos').updateOne(
      {_id: new ObjectId(todoId)},
      {
        $set: {
          updateAt: new Date().toISOString(),
          complete
        }
      }
  )

  return {
    statusCode: 200,
    body: JSON.stringify('Updated')
  };
};

module.exports = {
  handler: updateTodo,
}