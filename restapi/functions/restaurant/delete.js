'use strict';

const RestaurantRepo = require('../../repositories/restaurantrepo');
const AccountRepo = require('../../repositories/accountrepo');
const response = require('../../utils/response');

module.exports.delete = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  //const data = JSON.parse(event.body);
  const id = event.pathParameters.id
  let role = event.requestContext.authorizer.Role;
  if (role != "Administrator") {
    return response.unauthorized();
  }
  else {
    let restaurant = await RestaurantRepo.getById(id); 
    if (restaurant == null) {
      return response.notfound();
    }
    else {
      await RestaurantRepo.delete(id); 
      const response = {
        statusCode: 200,
        body: JSON.stringify({success: true} ),
      };
      return response;
    }
  }
  //console.log(context);

  //let restaurant = RestaurantRepo.getById(id);
  //await RestaurantRepo.delete(id);

};
