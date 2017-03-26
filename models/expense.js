var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type:Date,default:Date.now},
    ExpenseType:{type: String,required:true},
    ExpenseAmount:{type: Number,required:true},
    comments:{type: String}
});

module.exports = mongoose.model('expense', schema);