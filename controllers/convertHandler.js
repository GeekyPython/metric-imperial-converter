const conversionUnits = {
  kg : "lbs",
  lbs : "kg",
  km: "mi",
  mi: "km",
  gal: "L",
  L: "gal"
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let isDigit = /\d/;
    let inputArray = input.split('');

    let index = inputArray.length - 1;
    while(!isDigit.test(inputArray[index]))
    {
      index--;
    }
    result = eval(inputArray.splice(0, index+1).join(''));
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let isDigit = /\d/;
    let inputArray = input.split('');

    let index = inputArray.length - 1;
    while(!isDigit.test(inputArray[index]))
    {
      index--;
    }
    result = inputArray.splice(index+1, inputArray.length-1).join('');
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    console.log(initUnit, conversionUnits[initUnit])
    result = conversionUnits[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch(unit)
    {
      case "kg":
          result = "kilograms";
      break;

      case "lbs":
          result = "pounds";
      break;

      case "mi":
          result = "miles";
      break;

      case "km":
          result = "kilometers";
      break;

      case "L":
          result = "liters";
      break;

      case "gal":
          result = "gallons";
      break;

      default:
          result = "undefined";
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit)
    {
      case "kg":
          result = initNum / lbsToKg;
      break;

      case "lbs":
          result = initNum * lbsToKg;
      break;

      case "mi":
          result = initNum * miToKm;
      break;

      case "km":
          result = initNum / miToKm;
      break;

      case "L":
          result = initNum / galToL;
      break;

      case "gal":
          result = initNum * galToL;
      break;
    }

    result = Math.round(result * 100000)/100000;
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOuterReturnUnit = this.spellOutUnit(returnUnit);
    result = `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOuterReturnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
