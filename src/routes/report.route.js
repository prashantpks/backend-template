const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const Report = require('../models/report.model');
const AggReport = require('../models/aggregateReport.model');
const { response } = require('express');

//ROUTE 1: POST /reports
router.post('/reports', async (req,res)=>{
    let status = "failed";

    try{
        const reportDetails = req.body.reportDetails;
        const {userID, marketID, marketName, cmdtyID, marketType, cmdtyName, priceUnit, convFctr, price} = reportDetails;
        const report = await Report.findOne({marketID: marketID, cmdtyID: cmdtyID});

        let repD;

        if(report == null){
            repD = uuidv4(); 
        }else{
            repD = report.repID;
        }
        console.log(repD);
        

        const savedReport = await Report.create({
            _id: uuidv4(),
            userID,
            repID: repD,
            marketID,
            marketName,
            cmdtyID,
            marketType,
            cmdtyName,
            priceUnit,
            convFctr,
            price
        });
        //console.log(savedReport);
        status = "success";
        return res.status(200).json({status, reportID: repD});

    }catch(err){
        return res.status(500).json({status,error:err.message,message:"Internal server error"});
    }
});

//ROUTE 2: GET /reports?qs
router.get('/reports',async (req, res)=>{
    let status = "failed";

    try{
        const reportID = req.query.reportID;
        const reports = await Report.find({repID: reportID});

        if(!reports[0]){
            return res.status(400).json({status, message:"report doesn't exist"});
        }else{
            const {marketID, marketName, cmdtyID, cmdtyName,repID} = reports[0];
            let prices = [];
            let users = [];
            //console.log(reports);
            for(let x in reports){
                users.push(reports[x].userID);
                const convertedPrice = convFctr(reports[x].price, reports[x].convFctr);
                prices.push(convertedPrice);
            }

            const price = calcAvgPrice(prices);
            const newAggReport = {
                _id: uuidv4(),
                repID,
                cmdtyName,
                cmdtyID,
                marketID,
                marketName,
                timestamp: Date.now(),
                users,
                price
            };

            const savedAggReport = await AggReport.create(newAggReport);
            let responseAggReport = JSON.parse(JSON.stringify(savedAggReport));
            console.log(savedAggReport);
            delete responseAggReport._id;
            delete responseAggReport.__v;
            delete responseAggReport.repID;
            const id = {_id: repID};
            responseAggReport = {...id, ...responseAggReport};
            responseAggReport.timestamp = Date.parse(responseAggReport.timestamp);
            // console.log(savedReport);
            return res.status(200).json(responseAggReport);
        }
    }catch(err){
       // console.error({status},err.message)
       return res.status(500).json({error:err.message,message:"Internal server error"});
    }
});

//Function to convert the price
function convFctr(price, factor){
    return price/factor;
}

//Function to calculate average
function calcAvgPrice(prices){
    let sum = 0;
    for(let x = 0; x<prices.length; x++){
        sum = sum + prices[x];
    }
    // console.log(sum, prices.length);
    return sum/prices.length;
}

module.exports = router;