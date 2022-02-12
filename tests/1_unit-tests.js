const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Input Tests', () => {

        test("#isWholeNumber, #isNotWholeNumber", () => {
            assert.isTrue(/\d/.test(convertHandler.getNum("10L")),"convertHandler not reading a whole number properly");
        });

        test("#isDecimal, #isNotDecimal", () => {
            const regex = /\./g;
            assert.isTrue(regex.test(convertHandler.getNum("8.2513gal").toString()),"initNum is not a decimal");
        });

        test('#isFraction, #isNotFraction', () => {
            const fraction = /\./g;
            assert.isTrue(fraction.test(convertHandler.getNum("1/2kg").toString()), "initNum is a valid fraction");
        });

        test('#isDecimalFraction, #isNotDecimalFraction', () => {
           const decimal = /\./;
           assert.isTrue(decimal.test(convertHandler.getNum("8.4/2kg").toString()), "initNum is not a decimal fraction"); 
        });

        test("isDoubleFraction, isNotDoubleFraction", () => {
            assert.strictEqual("invalid number", convertHandler.getNum("8/4/2kg"));
        });

        test("#defaultToOne, #notDefaultToOne", () => {
            assert.strictEqual(1,convertHandler.getNum("kg"));
        });

        test("#isValidInput, #isNotValidInput", () => {
            const n1 = convertHandler.getNum("8kg"), n2 = convertHandler.getNum("8.4/2lbs"), n3 = convertHandler.getNum("4.2mi");
            assert.isTrue(n1 !== "invalid number" && n2 !== "invalid number" && n3 !== "invalid number", "initNum is not a valid number");
        });

        test("#isInvalidInput, #notIsInvalidInput", () => {
            assert.strictEqual("invalid number", convertHandler.getNum("8/6/3kg"));
        });

        test("#validReturnUnit #isNotValidReturnUnit", () => {
            assert.notEqual("invalid unit", convertHandler.getReturnUnit(convertHandler.getUnit("6kg")));
        });

        test("#isValidFullUnit, #isNotValidFullUnit", () => {
            assert.notEqual("invalid unit", convertHandler.spellOutUnit(convertHandler.getReturnUnit(convertHandler.getUnit("6kg"))));
        });
    })

    suite("Unit Conversion Tests", () => {

        test("#isLbs, #isNotLbs", () => {
            assert.isTrue(/lbs/i.test(convertHandler.getReturnUnit("kg")))
        });

        test("#isKgs. #isNotKgs", () => {
            assert.isTrue(/kg/i.test(convertHandler.getReturnUnit("lbs")));
        });

        test("#isKms. #isNotKms", () => {
            assert.isTrue(/km/i.test(convertHandler.getReturnUnit("mi")));
        });

        test("#isMi. #isNotMi", () => {
            assert.isTrue(/mi/i.test(convertHandler.getReturnUnit("km")));
        });

        test("#isLtrs. #isNotLtrs", () => {
            assert.isTrue(/L/.test(convertHandler.getReturnUnit("gal")));
        });

        test("#isGal. #isNotGal", () => {
            assert.isTrue(/gal/i.test(convertHandler.getReturnUnit("L")));
        });

    })
});