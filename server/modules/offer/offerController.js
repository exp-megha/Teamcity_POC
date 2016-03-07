/**
 * offerContoller is to manage the offer  APIs
 * @version 1.0
 * @package Webservices
 * @author joseph lawrence
 * @createdOn 5-mar-2016
 */

 var OfferService = require('./offerService');


 /**
  * load sample data into table from csv file
  * @author joseph lawrence
  * @return json
  * @createdOn 5-mar-2016
  */

 function combine(req, res, next) {
     OfferService.Combine(req, function (err, response) {
         if (err) return res.send("response");
         return res.send(response);
     });
 }


 module.exports = {
     combine: combine
 }
