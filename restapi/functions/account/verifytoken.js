'use strict';

const jwt = require('jsonwebtoken');

const generatePolicy = (principalId, effect, resource, userData) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  authResponse.context = userData;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

module.exports.verifytoken = async (event, context, callback) => {
  let token = event.authorizationToken.slice("7"); //parse token format = bearer: token
  var decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded != null) {
    callback(null, generatePolicy(decoded.Id, 'Allow', event.methodArn, decoded))
  }
  else {
    callback(null, 'Unauthorized');
  } 
};
