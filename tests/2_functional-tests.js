const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { get } = require('express/lib/response');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    test("GET/ request to convert 10L to gallons", (done) => {
        chai
        .request(server)
        .get('/api/convert?input=10L')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.notEqual("invalid unit", res.body.returnUnit);
            assert.notEqual("invalid number", res.body.returnNum);
            done();
        });
    });

    test("GET/ request to check for invalid units", (done) => {
        chai
        .request(server)
        .get('/api/convert?input=32g')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isTrue("invalid number" === res.text || "invalid unit" === res.text || "invalid number and unit" === res.text);
            done();
        });
    });

    test("Get/ request to test for invalid numerical values", (done) => {
        chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isTrue("invalid number" === res.text || "invalid unit" === res.text || "invalid number and unit" === res.text);
            done();
        });
    });

    test("GET/ request to look for both invalid input and number", (done) => {

        chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.strictEqual("invalid number and unit", res.text);
        });
        done();
    });

    test("GET? request to test for input with no numerical value provided", (done) => {
        chai
        .request(server)
        .get('/api/convert?input=kg')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.notEqual("invalid number", res.text);
        });
        done();
    });

});
