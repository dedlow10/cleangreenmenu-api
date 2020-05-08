'use strict';

const MenuRepo = require('../../repositories/menurepo');

module.exports.get = async (event, context, callback) => {
    // create a response
    let result = await MenuRepo.getByRestaurant(event.pathParameters.id);
    console.log(result);
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    return response;
};
