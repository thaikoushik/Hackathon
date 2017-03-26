var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    expenditure:{type: String,required:true},
    expenditure2:{type: String},
    expenditure3:{type: String},
    expenditure4:{type: String},
    expenditure5:{type: String},        
    income:{type: String,required:true},
    feessix:{type: String,required:true}
});

module.exports = mongoose.model('profile', schema);