'use strict';

const MenuRepo = require('../../repositories/menurepo');
const response = require('../../utils/response');

module.exports.create = async (event, context, callback) => {
  const date = new Date();
  const data = JSON.parse(event.body);
  data.CreatedOn = date;
  data.RestaurantId = event.pathParameters.id;
  data.MenuData = JSON.stringify(data.MenuData);
  let role = event.requestContext.authorizer.Role;
  if (role != "Administrator") {
    return response.unauthorized();
  }
  else {
    
    let id = await MenuRepo.create(data);
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify({MenuId: id} ),
      };
      return response;
  }
};
