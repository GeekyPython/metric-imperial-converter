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
        assert.equal("invalid number", convertHandler.getNum("/2/3L"));
    });

    test("#shouldDefaultTo1OnNoNumericalInputProvided", function () {
        assert.equal(1, convertHandler.getNum("kg"));
    });

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

    test("#shouldReturnCorrectSpelledOutUnitForAGivenUnit", function () {
        assert.equal("liters", convertHandler.spellOutUnit("L"));
        assert.equal("kilograms", convertHandler.spellOutUnit("kg"));
        assert.equal("pounds", convertHandler.spellOutUnit("lbs"));
        assert.equal("miles", convertHandler.spellOutUnit("mi"));
        assert.equal("kilometers", convertHandler.spellOutUnit("km"));
        assert.equal("gallons", convertHandler.spellOutUnit("gal"));
    });

    test("#shouldCorrectlyConvertFromGaltoL", function () {
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
    });
    
    test("#shouldCorrectlyConvertFromLtoGal", function () {
        assert.equal(convertHandler.getReturnUnit("L"), "gal");
    });

    test("#shouldCorrectlyConvertFromKmtoMi", function () {
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
    });

    test("#shouldCorrectlyConvertFromMitoKm", function () {
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
    });

    test("#shouldCorrectlyConvertFromKgtoLbs", function () {
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });

    test("#shouldCorrectlyConvertFromLbstoKg", function () {
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    });  
});