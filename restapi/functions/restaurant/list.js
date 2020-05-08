'use strict';

const RestaurantRepo = require('../../repositories/restaurantrepo');

module.exports.list = async (event, context, callback) => {

  let results = await RestaurantRepo.list();
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(results),
    };
    return response;
};
