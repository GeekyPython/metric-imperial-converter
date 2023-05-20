const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    const expectedResponse = {
        initNum: 10,
        initUnit: "L",
        returnNum: 2.90589,
        returnUnit: "gal",
        string: "10 liters converts to 2.90589 gallons"
    };

    test("#isReadingCorrectDataFromGetRequest", function () {
        chai.request("http://localhost:3000").get("/api/convert")
            .query({input: "10L"})
            .end((err, res) => {
                assert.equal(expectedResponse, res);
            });
    });
});
