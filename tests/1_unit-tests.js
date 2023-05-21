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
        assert.strictEqual(Math.round(2/7 * 100000)/100000, convertHandler.getNum("2/7kg"));
    });

    test("#isDecimalValueInFractionalInputReadSuccessfully", function () {
        assert.strictEqual(Math.round(2.6/7 * 100000)/100000, convertHandler.getNum("2.6/7L"));
        assert.strictEqual(Math.round(2/7.3 * 100000)/100000, convertHandler.getNum("2/7.3L"));
    });

    test("#shouldThrowErrorOnDoubleFractionProvided", function () {
        assert.strictEqual("invalid number", convertHandler.getNum("3/2/3kg"));
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

    test("#shouldReturnCorrectReturnUnitForGivenInitUnit", function () {
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
        assert.equal(convertHandler.getReturnUnit("L"), "gal");
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    });

    test("#shouldCorrectlyConvertFromGaltoL", function () {
        assert.equal(convertHandler.convert(2, "gal"),  7.57082);
    });
    
    test("#shouldCorrectlyConvertFromLtoGal", function () {
        assert.equal(convertHandler.convert(3, "L"), 0.79252);
    });

    test("#shouldCorrectlyConvertFromKmtoMi", function () {
        assert.equal(convertHandler.convert(4, "km"), 2.48549);
    });

    test("#shouldCorrectlyConvertFromMitoKm", function () {
        assert.equal(convertHandler.convert(3, "mi"), 4.82802);
    });

    test("#shouldCorrectlyConvertFromKgtoLbs", function () {
        assert.equal(convertHandler.convert(5, "kg"), 11.02312);
    });

    test("#shouldCorrectlyConvertFromLbstoKg", function () {
        assert.equal(convertHandler.convert(7, "lbs"), 3.17514);
    }); 
});