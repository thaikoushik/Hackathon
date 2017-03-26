var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    expenditure:{type: Number,required:true},
    expenditure2:{type: Number, required:true},
    expenditure3:{type: Number, required:true},
    expenditure4:{type: Number, required:true},
    expenditure5:{type: Number, required:true},        
    income:{type: Number,required:true},
    feessix:{type: Number,required:true}
});

module.exports = mongoose.model('profile', schema);