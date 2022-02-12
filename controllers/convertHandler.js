function ConvertHandler() {
  
  //Returns numerical value of the metric from given string input
  this.getNum = function(input) {
    let result, num;
    let arr = input.split('');
    let count = 0;

    for(let char of arr)
    {
      if(char === "/")
      {
        count++;
      }
    }

    if(count > 1)
    {
      num = "invalid number";
    }

    else if(!/\d/.test(input))
    {
      num = 1;
    }

    else if(/\//.test(input))
    {
      num = eval(input.split('').filter(elem => /[^a-zA-Z]/.test(elem)).join(''));
    }

    else if(/[.]/.test(input))
    {
      num = parseFloat(input.split('').filter(elem => /[^a-zA-Z]/.test(elem)).join(''));
    }

    else
    {
      num = parseInt(input.split('').filter(elem => /[^a-zA-Z]/.test(elem)).join(''));
    }

    result = num;
    return result;
  };
  
  //Returns the unit of measurement from the given input
  this.getUnit = function(input) {
    let result;

    let validUnits = ["mi", "kg", "lbs", "gal", "km"];
    let unit = input.split('').filter(elem => /[a-zA-Z]/.test(elem)).join('');
    
    if(unit === "L")
    {
      return unit;
    }
    unit  = unit.toLowerCase();
    for(u of validUnits)
    {
      if(u === unit)
      {
        return unit;
      }
    }
    
    result = "invalid unit";
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch(initUnit)
    {
      case "L":
        result = "gal";
      break;

      case "gal":
        result = "L";
      break;

      case "mi":
        result = "km";
      break;

      case "km":
        result = "mi";
      break;

      case "lbs":
        result = "kg";
      break;

      case "kg":
        result = "lbs";
      break;

      default:
        result = "invalid unit";
    }

    return result;
  };

  //Assumed to give full word for a unit's abbreviation
  this.spellOutUnit = function(unit) {
    let result;
    
    switch(unit)
    {
      case "gal":
        result = "gallons"
      break;

      case "km":
        result = "kilometers"
      break;

      case "L":
        result = "litres"
      break;

      case "mi":
        result = "miles"
      break;

      case "lbs":
        result = "pounds"
      break;

      case "kg":
        result = "kilograms"
      break;

      default:
        result = "invalid unit";
    }

    return result;
  };
  
  //Main unit conversion take place here
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = {};

    result.returnUnit = this.getReturnUnit(initUnit);

    if(initNum === "invalid number")
    {
      if(initUnit === "invalid unit")
      {
        return "invalid number and unit";
      }

      return "invalid number";
    }

    else if(initUnit === "invalid unit")
    {
      return "invalid unit";
    }

    switch(initUnit)
    {
      case "L":
        result.returnValue = Math.round(initNum/galToL * 100000) / 100000;
      break;

      case "gal":
        result.returnValue = Math.round(initNum*galToL *100000) / 100000;
      break;

      case "lbs":
        result.returnValue = Math.round(initNum*lbsToKg * 100000) / 100000;
      break;

      case "kg":
        result.returnValue = Math.round(initNum/lbsToKg * 100000) /100000;
      break;

      case "mi":
        result.returnValue = Math.round(initNum*miToKm * 100000) / 100000;
      break;

      case "km":
        result.returnValue = initNum/miToKm;
      break;
    }
    return result;
  };
  
  //Gets a string to convert the above derived results into a single string output
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let fullInitUnit = this.spellOutUnit(initUnit);
    let fullReturnUnit = this.spellOutUnit(returnUnit);
    result = `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
    return result;
  };
  
}

//Test outputs
// const converter = new ConvertHandler;
// console.log(converter.getReturnUnit("3/7.2/4kilomegagram"));
// console.log(converter.convert(converter.getNum("8.4/2g"), converter.getUnit("8.4/2g")));


module.exports = ConvertHandler;
