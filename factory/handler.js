'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

function parseBody(body) {
  return body.split('&').reduce(function(prev, s) {
    var pair = s.split('=')
    prev[pair[0]] = decodeURIComponent(pair[1])
    return prev
  }, {})
}

module.exports.addUser = (event, context, cb) => {
  const body = parseBody(event.body)
  const params = {
    TableName: process.env.TABLE_USERS,
    Item: {name: body.nameValue, password: body.passwordValue},
  };
  return dynamo.put(params, function(err, res) {
    if (err) { return cb(err) }
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(res),
    })
  });
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
  return dynamo.get(params, function(err, res) {
    console.log(res)
    if (err) { return cb(err) }
    if (res.Item.password == body.passwordValue) {
      cb(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true
        },
        body: JSON.stringify({success: true}),
      })
    } else {
      cb(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true
        },
        body: JSON.stringify({success: false}),
      })
    }
  });
};

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({message: 'Hello'}),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
