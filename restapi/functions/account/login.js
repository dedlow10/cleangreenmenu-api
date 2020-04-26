'use strict';

const AccountRepo = require('../../repositories/accountrepo');
const jwt = require('jsonwebtoken');

module.exports.login = async (event, context, callback) => {
  const data = JSON.parse(event.body);
 
  let isValid = await AccountRepo.validateUserPassword(data.EmailAddress, data.Password);

  if (isValid != null) {
    let account = await AccountRepo.getByEmail(data.EmailAddress);
    const token = jwt.sign({ Id: account.Id, Email: data.EmailAddress }, process.env.JWT_SECRET, { expiresIn: '10h'})
    const response = {
        statusCode: 200,
        body: JSON.stringify({token : token} ),
      };
      callback(null, response);
  }
  else {
    const response = {
        statusCode: 404,
      };
      callback(null, response);
  } 
};
