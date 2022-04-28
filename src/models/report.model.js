const mongoose = require('mongoose');

const {Schema} = mongoose;

const reportSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    repID: {
        type: String
    },
    marketID: {
        type: String,
        required: true
    },
    marketName: {
        type: String,
        required: true
    },
    cmdtyID: {
        type: String,
        required: true
    },
    marketType:{
        type: String,
        required: true
    },
    cmdtyName:{
        type: String,
        required: true
    },
    priceUnit:{
        type: String,
        required: true
    },
    convFctr: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('report',reportSchema);