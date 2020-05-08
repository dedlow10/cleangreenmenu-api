'use strict';

const MenuRepo = require('../../repositories/menurepo');
const response = require('../../utils/response');

module.exports.delete = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  //const data = JSON.parse(event.body);
  const id = event.pathParameters.menuid
  let role = event.requestContext.authorizer.Role;
  if (role != "Administrator") {
    callback(null, response.unauthorized());
  }
  else {
    let restaurant = await MenuRepo.getById(id); 
    if (restaurant == null) {
      callback(null, response.notfound());
    }
    else {
      await MenuRepo.delete(id); 
      const response = {
        statusCode: 200,
        body: JSON.stringify({success: true} ),
      };
      callback(null, response);
    }
  }
};
