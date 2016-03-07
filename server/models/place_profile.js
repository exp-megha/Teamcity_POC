var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var placeProfile = new Schema({
    "type_of_place": {"type": "string","required": true, default:null},
    "seat_with_table": {"type": ["string"],"required": true, default:null},
    "reception_or_desk": {"type": "string","required": true, default:null},
    "internet_wifi": {"type": "string","required": true, default:null},
    "sound_level": {"type": "string","required": true, default:null},
    "is_crowded": {"type": "string","required": true, default:null},
    "pets_allowed": {"type": "boolean","required": true, default:null},
    "power": {"type": "string","required": true, default:null},
    "printing": {"type": "string","required": true, default:null},
    "postal_service": {"type": "string","required": true, default:null},
    "parking": {"type": "string","required": true, default:null},
    "other_facilities": {"type": ["string"],"required": true, default:null},
    "comments_to_facilities": {"type": "string","required": true, default:null},
    "profile_image1": {"type": "string","required": true, default:null},
    "profile_image2": {"type": "string", default:null},
    "profile_image3": {"type": "string", default:null}
  }, {
	versionKey: false
})

module.exports = restful.model('placeProfile', placeProfile)
                        .methods(['get', 'post', 'put', 'delete']);
