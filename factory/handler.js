'use strict';

const AWS = require('aws-sdk');
var uuid = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const helpers = require('./helpers')
const parseBody = helpers.parseBody
const handleCORS = helpers.handleCORS


module.exports.addUser = (event, context, cb) => {
  const body = parseBody(event.body)
  const params = {
    TableName: process.env.TABLE_USERS,
    Item: {name: body.nameValue, password: body.passwordValue},
  };
  return dynamo.put(params, handleCORS(cb));
};

module.exports.addAdvert = (event, context, cb) => {
  const body = parseBody(event.body)
  const params = {
    TableName: process.env.TABLE_ADVERTS,
    Item: {id: uuid.v4(), title: body.title, description: body.description},
  };
  return dynamo.put(params, handleCORS(cb));
};

module.exports.getAdverts = (event, context, cb) => {
  const params = {
    TableName: process.env.TABLE_ADVERTS,
  };
  var items = []
  var callback = handleCORS(cb)
  var scanExecute = function() {
    dynamo.scan(params,function(err,result) {
      if(err) {
        callback(err);
      } else {
        items = items.concat(result.Items);
        if(result.LastEvaluatedKey) {
          params.ExclusiveStartKey = result.LastEvaluatedKey;
          scanExecute(callback);
        } else {
          callback(err, items);
        }
      }
    });
  }
  scanExecute();
};

module.exports.logIn = (event, context, cb) => {
  const body = parseBody(event.body)
  const params = {
    TableName: process.env.TABLE_USERS,
    AttributesToGet: [
      "password"
    ],
    Key : {
      "name" : body.nameValue
    }
  };
  var callback = handleCORS(cb)
  return dynamo.get(params, function(err, res) {
    if (err) { return callback(err) }
    callback({success: res.Item.password == body.passwordValue})
  });
};

module.exports.hello = (event, context, callback) => {
  handleCORS(cb)(null, {message: 'Hello'})
};
