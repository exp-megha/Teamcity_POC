/*
 * Routes file
 * @version 1.0
 * @package Webservices
 * @author Joseph Lawrence
 */
var offer_ctrlr = require('./modules/offer/offerController');
var Offer_model = require('./models/offer');
var PlaceProfile_model = require('./models/place_profile');
var config = require('./config');

module.exports = function(app) {

  var config = app.get('config');
  console.log(config);

  // Root
  app.get("/", function(req, res) {
      res.json({
          api: config.project_name,
          version: config.version,
          env: app.get('env')
      });
  });

  Offer_model.register(app, '/offer');
  app.get("/offer/custom", offer_ctrlr.combine);
  PlaceProfile_model.register(app, '/place_profile');

}
