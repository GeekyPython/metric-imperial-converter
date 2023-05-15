const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("#isWholeNumberInputReadSuccessfully", () => {
        assert.strictEqual(2, convertHandler.getNum("2mi"));
    });

    test("#isDecimalInputReadSuccessfully", function () {
        assert.strictEqual(3.1, convertHandler.getNum("3.1gal"));
    });

    test("#isFractionalInputReadSuccessfully", function () {
        assert.strictEqual(2/7, convertHandler.getNum("2/7kg"));
    });

    test("#isDecimalValueInFractionalInputReadSuccessfully", function () {
        assert.strictEqual(2.6/7, convertHandler.getNum("2.6/7L"));
        assert.strictEqual(2/7.3, convertHandler.getNum("2/7.3L"));
    });

    test("#isDecimalValueInFractionalInputReadSuccessfully", function () {
        assert.strictEqual(2.6/7, convertHandler.getNum("2.6/7L"));
        assert.strictEqual(2/7.3, convertHandler.getNum("2/7.3L"));
    });

    test("#shouldFailForInvalidNumberProvided", function () {
        assert.fail(0.5, convertHandler.getNum("3/2/3L"));
    });

    test
});