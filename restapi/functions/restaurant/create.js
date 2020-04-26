'use strict';

const RestaurantRepo = require('../../repositories/restaurantrepo');

module.exports.create = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  console.log(data);
  /*if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the todo item.',
    });
    return;
  }*/

  let id = await RestaurantRepo.create(data);
  console.log(id);
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({RestaurantId: id} ),
    };
    callback(null, response);
 
};
