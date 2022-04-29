const request = require('supertest')('http://localhost:4000');
const expect = require('chai').expect;

//Test for API: POST /reports
describe("POST /reports", function(){
    it("Stores the report in db, sent from the user", async function(){
        const response = await request.post('/reports').send({
            "reportDetails":{
            "userID": "user1",
            "marketID": "market-1",
            "marketName": "Vashi Navi Mumbai",
            "cmdtyID": "cmdty-1",
            "marketType": "Mandi",
            "cmdtyName": "Potato",
            "priceUnit": "Pack",
            "convFctr": 50,
            "price": 700
            }
        });

        //Check for success status
        expect(response.status).to.eql(200);

        //Check if response contains reportID key
        const attributes = response.body;
        expect(attributes).to.include.keys("status", "reportID");        
    });
});

//Test for API: GET /reports?qs
describe("GET /reports?qs", function(){
    it("Returns the aggregate report of particular id", async function(){
        const reportID = "c5472049-7c0c-497e-ab88-5882d935d9e3"
        const response = await request.get('/reports?reportID='+reportID);

        //Check for success status
        expect(response.status).to.eql(200);

        //Checking if response has required keys
        const attributes = response.body;
        expect(attributes).to.include.keys("_id", "cmdtyName","cmdtyID", "marketID","marketName","users","timestamp","priceUnit","price");
    });
});

module.exports = describe;