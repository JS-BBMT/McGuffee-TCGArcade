/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_MACHINES_ARN
	STORAGE_MACHINES_NAME
	STORAGE_MACHINES_STREAMARN
	STORAGE_USERS_ARN
	STORAGE_USERS_NAME
	STORAGE_USERS_STREAMARN
Amplify Params - DO NOT EDIT */
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const userService = require("./users/user.service");
const machineService = require("./machines/machine.service");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const sensitiveFields = require('./common/sensitive');

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/users', async function(req, res, next) {
  await handleReturn(res, next, userService.getUsers);
});

app.get('/users/:username', async function(req, res, next) {
  const username = req.params.username;
  await handleReturn(res, next, userService.getUser, username);
});


app.post('/users', async function(req, res, next) {
  const body = req.body;
  await handleReturn(res, next, userService.createUser, body);
});

app.post('/users/login', async function (req, res, next) {
  const body = req.body;
  await handleReturn(res, next, userService.loginUser, body);
})

app.post('/users/socialLogin', async function (req, res, next) {
  const body = req.body;
  await handleReturn(res, next, userService.loginSocialUser, body);
})

app.put('/users/tokens', async function (req, res, next) {
  const body = req.body;
  await handleReturn(res, next, userService.updateTokens, body);
});

app.put('/users', async function (req, res, next) {
  const body = req.body;
  await handleReturn(res, next, userService.updateUser, body);
});

app.delete('/users/:username', async function (req, res, next) {
  const username = req.params.username;
  await handleReturn(res, next, userService.deleteUser, username);
});

app.get('/machines', async function (req, res, next) {
  await handleReturn(res, next, machineService.getMachines);
});

app.get('/machines/:id', async function (req, res, next) {
  const id = req.params.id;
  await handleReturn(req, next, machineService.getMachine, id);
});

app.post('/machines', async function(req, res, next) {
  const body = req.body;
  await handleReturn(res, next, machineService.createMachine, body);
});

app.put('/machines', async function (req, res, next) {
  const body = req.body;
  await handleReturn(res, next, machineService.updateMachine, body);
});

app.delete('/machines/:id', async function (req, res, next) {
  const id = req.params.id;
  await handleReturn(res, next, machineService.deleteMachine, id);
});



app.listen(3000, function() {

});

const handleReturn = async (response, next, invocation, ...args) => {
  try {
    let result;
    if(args.length === 0) {
      result = await invocation();
    }
    else {
      result = await invocation(...args);
    }

    for(const field of sensitiveFields) {
      console.log(field);
      if(result.hasOwnProperty(field)){
        delete result[field];
      }
    }

    response.status(200).json(JSON.stringify(result))
  } catch (error) {
    const statusCode = error.statusCode || 500
    response.status(statusCode).json(JSON.stringify({message: error.message}))
  }
}

module.exports = app
