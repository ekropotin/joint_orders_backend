const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

module.exports = function (modelName) {
  return function (schema) {
    schema.set('toJSON', { virtuals: true });
    schema.set('toObject', { virtuals: true });
    schema.set('_id', false);
    schema.plugin(mongooseHidden);
    schema.plugin(autoIncrement.plugin, modelName);
  };
};
