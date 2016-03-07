/**
 * offerService is to manage the offer  APIs of offerContoller
 * @version 1.0
 * @package Webservices
 * @author joseph lawrence
 * @createdOn 5-mar-2016
 */

 var http = require('http');
 var fs = require("fs");
 var failure = require('../../middleware/responsehelpers').failure;
 var success = require('../../middleware/responsehelpers').success;
 var PlaceProfile = require('../../models/place_profile');
 var Offer = require('../../models/offer');
 /**
  * definition of custom API
  * @author joseph lawrence
  * @return json
  * @createdOn 5-mar-2016
  * @modifiedOn 5-mar-2016
  */

  function Combine(req, cb) {


    //   PlaceProfile.findOne({invoice_number: invoice_number}).exec(function (err, doc) {
    //           if (doc != null) {
    //               Offer.findOne({officer_id: doc.officer_id}).exec(function (err, user) {
      //
    //                   doc.invoice_notes.push({
    //                       notes: notes,
    //                       notes_by: admin_notes_by,
    //                       notes_date: admin_notes_date,
    //                       notes_type: "admin_notes"
    //                   });
      //
    //                   doc['admin_notes'] = notes;
    //                   doc['admin_notes_by'] = admin_notes_by;
    //                   doc['admin_notes_date'] = admin_notes_date;
      //
    //                   doc.save(function (err) {
    //                       if (!err) {
    //                           if (sent == 1) {
    //                               var result = {
    //                                   status: 1,
    //                                   message: "Notes saved and emailed successfully",
    //                                   data: null
    //                               }
    //                               // GenerateInvoicePDF(invoice_number, sent);
    //                           } else {
    //                               var result = {
    //                                   status: 1,
    //                                   message: "Notes saved successfully",
    //                                   data: null
    //                               }
    //                           }
    //                       }
    //                       cb(err, result);
    //                   });
    //               });
    //           } else {
    //               var result = {
    //                   status: 0,
    //                   message: "Invalid Invoice Number",
    //                   data: null
    //               }
    //               cb(err, result);
    //           }
    //       });






            cb(null, success('from cutom API', 1,"hiiii"));
  }

 module.exports = {
     Combine: Combine
  }
