const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test("#isReadingCorrectDataFromGetRequest", function () {
        chai.request("http://localhost:3001").get("/api/convert?input=10L")
            .end((err, res) => {
                assert.equal(10, res.body.initNum);
                assert.equal("L", res.body.initUnit);
                assert.equal(2.64172, res.body.returnNum);
                assert.equal("gal", res.body.returnUnit);
            });
    });

    test("#isReadingCorrectDataWithNoNumericalInputGiven", function () {
        chai.request("http://localhost:3001").get("/api/convert?input=kg")
            .end((err, res) => {
                assert.equal(1, res.body.initNum);
                assert.equal("kg", res.body.initUnit);
                assert.equal(2.20462, res.body.returnNum);
                assert.equal("lbs", res.body.returnUnit);
            });
    });

    test("#shouldDetectInvalidUnit", function () {
        chai.request("http://localhost:3001")
        .get("/api/convert?input=32g")
        .end((err, res) => {
            assert.strictEqual("invalid unit", res.text);
        });
    });

    test("#shouldDetectInvalidNumber", function () {
        chai.request("http://localhost:3001")
        .get("/api/convert?input=3/7.2/4kg")
        .end((err, res) => {
            assert.strictEqual("invalid number", res.text);
        });
    });

    test("#shouldDetectInvalidNumberAndUnit", function () {
        chai.request("http://localhost:3001")
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end((err, res) => {
            assert.strictEqual("invalid number and unit", res.text);
        });
    });
});
