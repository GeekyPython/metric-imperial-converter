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
    let isNumberPresent = /\d/g;
    let startsWithChars = /^[\D]/ig;
    let nonChars = /[\W_]/ig;

    let inputArray = input.split('');

    //if there is no numerical value provided
    if(!isNumberPresent.test(input))
    {
      result = 1;
      console.log(`No number provided in input, setting number to 1`);
      return result;
    }

    //Check if there are falsy numerical values
    else if(startsWithChars.test(input) || (input.match(nonChars) && input.match(nonChars).length >= 2))
    {
      console.log("Invalid number provided");
      return "invalid number";
    }

    //Getting numerical value from from the provided input
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
    let isNumberPresent = /\d/g;
    let inputArray = input.split('');

    if(!isNumberPresent.test(input))
    {
      return (conversionUnits.hasOwnProperty(input)) ? input : "invalid unit";
    }

    let index = inputArray.length - 1;
    while(!isDigit.test(inputArray[index]))
    {
      index--;
    }
    result = inputArray.splice(index+1, inputArray.length-1).join('');

    if(!conversionUnits.hasOwnProperty(result))
    {
      result = "invalid unit";
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
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
    
    if(initNum == "invalid number")
    {
      return "invalid number"
    }

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
      
      default:
        result = "invalid unit";
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
