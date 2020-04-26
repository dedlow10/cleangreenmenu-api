'use strict';

const RestaurantRepo = require('../../repositories/restaurantrepo');

module.exports.get = async (event, context, callback) => {
    // create a response
    let result = await RestaurantRepo.getById(event.pathParameters.id);
    console.log(result);
    const response = {
      statusCode: 200,
      body: JSON.stringify({result}),
    };
    callback(null, response);
};
