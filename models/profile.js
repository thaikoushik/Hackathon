var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    expenditure:{type: String,required:true},
    income:{type: String,required:true},
    savingsMin:{type: String,required:true},
    feessix:{type: String,required:true}
});

module.exports = mongoose.model('profile', schema);