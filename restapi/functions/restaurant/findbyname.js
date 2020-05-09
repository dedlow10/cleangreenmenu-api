'use strict';

const RestaurantRepo = require('../../repositories/restaurantrepo');

module.exports.findbyname = async (event, context, callback) => {
  let results = await RestaurantRepo.findByName(event.queryStringParameters.name);
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(results),
    };
    return response;
};
