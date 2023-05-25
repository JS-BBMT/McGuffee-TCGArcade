let tableName = "machines";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const dynamodb = require('../common/dynamo')(tableName,'id', true);

const getMachines = async () => {
  return (await dynamodb.allItems()).Items;
}

const getMachine = async (id)=> {
  return (await dynamodb.getItem(id)).Item;
}

const createMachine = async (machine) => {
  await dynamodb.createItem(machine);
  return await getMachine(machine.id);
}

const updateMachine = async (machine) => {
  await dynamodb.updateItem(machine);
  return await getMachine(machine.id);
}

const deleteMachine = async (username) => {
  return (await dynamodb.deleteItem(username));
}

const UserService = {
  getMachines,
  getMachine,
  createMachine,
  updateMachine,
  deleteMachine,
}

module.exports = UserService;
