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

    // test("#shouldFailForInvalidNumberProvided", function () {
    //     assert.fail(0.5, convertHandler.getNum("3/2/3L"));
    // });

    test("#shouldReadCorrectUnitFromInput", function () {
        assert.equal("kg", convertHandler.getUnit("3kg"));
        assert.equal("lbs", convertHandler.getUnit("3/4lbs"));
        assert.equal("km", convertHandler.getUnit("3.5/6km"));
        assert.equal("mi", convertHandler.getUnit("4mi"));
        assert.equal("L", convertHandler.getUnit("10L"));
        assert.equal("gal", convertHandler.getUnit("12gal"));
    });

    test("#shouldFailOnIncorrectInput", function () {
        assert.notEqual(convertHandler.getUnit("3.4"), "kg");
        assert.notEqual(convertHandler.getUnit("3.4kgs"), "kg");
        assert.notEqual(convertHandler.getUnit("3.4"), "kg");
    });

    test("#shouldReturnCorrectReturnUnitForGivenInput", function () {
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
        assert.equal(convertHandler.getReturnUnit("L"), "gal");
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
    });

    
});