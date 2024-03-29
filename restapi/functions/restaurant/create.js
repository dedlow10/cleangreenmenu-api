'use strict';

const RestaurantRepo = require('../../repositories/restaurantrepo');
const response = require('../../utils/response');

module.exports.create = async (event, context, callback) => {
  const date = new Date();
  const data = JSON.parse(event.body);
  data.CreatedOn = date;
  let role = event.requestContext.authorizer.Role;
  if (role != "Administrator") {
    return response.unauthorized();
  }
  else {
    let id = await RestaurantRepo.create(data);
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify({RestaurantId: id} ),
      };
      return response;
  }
};
