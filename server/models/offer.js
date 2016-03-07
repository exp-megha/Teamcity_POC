var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var offer = new Schema({
    "Offer_Type": { "type": "string","required": true},
    "Offer_Booking_type": {"type": "string","required": true},
    "Offer_Name": {"type": "string","required": true},
    "Offer_Included_short": {"type": "string","required": true},
    "Offer_Details": {"type": "string", "required": true},
    "Offer_Time_start": {"type": "date","required": true},
    "Offer_Time_end": {"type": "date","required": true},
    "Offer_Time_length": {"type": "number","required": true},
    "Offer_Inactive_dates": {"type": ["date"],"required": true},
    "Offer_Days": {"type": ["string"],"required": true},
    "Offer_Numbers": {"type": "number","required": true},
    "Price_today": {"type": "number","required": true},
    "Offer_Price_to_Guests": {"type": "number","required": true},
    "Offer_How_to_book": {"type": "string","required": true},
    "Offer_Active_Inactive": {"type": "string","required": true},
    "Offer_Image": {"type": "string","required": true}
  }, {
	versionKey: false
})

module.exports = restful.model('Offer', offer)
                        .methods(['get', 'post', 'put', 'delete']);
