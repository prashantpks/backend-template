const mongoose = require('mongoose');
const {Schema} = mongoose;

const aggReportSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    repID: {
        type: String,
        required: true
    },
    cmdtyName: {
        type: String,
        required: true
    },
    cmdtyID:{
        type: String,
        required: true
    },
    marketID:{
        type: String,
        required: true
    },
    marketName: {
        type: String,
        required: true
    },
    users: [{
        type: String
    }],
    timestamp: {
        type: Date,
        default: Date.now()
    },
    priceUnit: {
        type: String,
        default: "Kg"
    },
    price: {
        type: Number,
        required: true
    }
},{timestamp: true});

module.exports = mongoose.model('aggregate_report', aggReportSchema);