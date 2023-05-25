const { NotFoundError, EntityExistsError } = require('../common/error')
const constants = require('../common/constants');
let tableName = "users";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const dynamodb = require('../common/dynamo')(tableName,'username', false);

const getUsers = async () => {
  return (await dynamodb.allItems()).Items;
}

const getUser = async (username) => {
  const user = (await dynamodb.getItem(username)).Item;
  if(!user) {
    throw new NotFoundError("Could not find user");
  }
  return user;
}

const getByFacebookId = async (facebookId) => {
  const user = (await dynamodb.getItemByGSI('facebookId', facebookId)).Items;
  if(user.length < 1) {
    return null;
  }
  return user[0];
}

const getByGoogleId = async (googleId) => {
  const user = (await dynamodb.getItemByGSI('googleId', googleId)).Items;
  if(user.length < 1) {
    return null;
  }
  return user[0];
}

const createUser = async (user) => {
  if(!user.hasOwnProperty('tokens')) {
    user.tokens = 0;
  }
  try {
    await dynamodb.createItem(user);
    return await getUser(user.username);
  } catch(err) {
    if(err.code === 'ConditionalCheckFailedException') {
      throw new EntityExistsError('Username already in use');
    }
    throw err;
  }

}

const updateUser = async (user) => {
  await dynamodb.updateItem(user);
  return await getUser(user.username);
}

const updateTokens = async (body) => {
  const user = await getUser(body.username);
  user.tokens += body.tokens;
  await dynamodb.updateItem(user);
  return user;
}

const deleteUser = async (username) => {
  return (await dynamodb.deleteItem(username));
}

const loginUser = async (body) => {
   const user = (await dynamodb.getItem(body.username)).Item;
   if(!user || user.password !== body.password) {
     throw new NotFoundError("Invalid username/password");
   }
   return user;
}

const loginSocialUser = async (body) => {
  let user;
  switch(body.platform) {
    case 'facebook':
      user = await getByFacebookId(body.id);
      break;
    case 'google':
      user = await getByGoogleId(body.id);
      break;
    default:
      throw new Error("Invalid login Platform");
  }

  if(user === null) {
    try {
      await getUser(body.email);
      return constants.socialStatus.INVALID;
    } catch (err) {
      return constants.socialStatus.CREATE;
    }
  }

  return constants.socialStatus.EXISTS;
}

const UserService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateTokens,
  loginUser,
  loginSocialUser
}

module.exports = UserService;
