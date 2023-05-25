const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.TABLE_REGION })

const dynamodb = new AWS.DynamoDB.DocumentClient();
const { uuid } = require('uuidv4')
class Dynamo {
  constructor(tableName, hashKey, autoIncrement = true) {
    this.tableName = tableName;
    this.hashKey = hashKey;
    this.autoIncreament = autoIncrement
  }

  allItems = async () => {
    return await dynamodb.scan({TableName : this.tableName}).promise();
  }

  getItem = async (key, attributes = null) => {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.hashKey]: key,
      },
      AttributesToGet: attributes
    }
    return await dynamodb.get(params).promise();
  }

  getItemByGSI = async(GSI, key, attributes = null) => {
    const exprKey = `:${GSI}`
    const params = {
      TableName: this.tableName,
      IndexName: GSI,
      KeyConditionExpression: `${GSI} = :${GSI}`,
      ExpressionAttributeValues: { [exprKey]: key }
    }
    return await dynamodb.query(params).promise();
  }

  createItem = async (body) => {
    if(this.autoIncreament) {
      body.id = uuid();
    }
    let params = {
      TableName: this.tableName,
      Item: body,
      ExpressionAttributeNames: {
        '#username': 'username'
      },
      ConditionExpression: 'attribute_not_exists(#username)'
    }

    return await dynamodb.put(params).promise();
  }

  updateItem = async (body) => {
    let updateExpression='set';
    let ExpressionAttributeNames={};
    let ExpressionAttributeValues = {};
    for (const property in body) {
      if(property === this.hashKey) {
        continue;
      }
      updateExpression += ` #${property} = :${property} ,`;
      ExpressionAttributeNames['#'+property] = property ;
      ExpressionAttributeValues[':'+property]=body[property];
    }

    updateExpression = updateExpression.slice(0, -1);

    const params = {
      TableName: this.tableName,
      Key: {
        [this.hashKey]: body[this.hashKey],
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues
    };

    return await dynamodb.update(params).promise();
  }

  deleteItem = async (key) => {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.hashKey]: key,
      }
    };

    return await dynamodb.delete(params).promise();
  }
}

module.exports = (tableName, hashKey, autoIncrement) => {
  return new Dynamo(tableName, hashKey, autoIncrement);
};
