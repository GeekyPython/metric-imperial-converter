'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.get("/api/convert", (req, res) => {

    try{
      
      const initNum =  convertHandler.getNum(req.query.input);
      const initUnit =  convertHandler.getUnit(req.query.input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit =  convertHandler.getReturnUnit(initUnit);
      const fullString =  convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      if(initNum == "invalid number" || initUnit == "invalid unit")
      {
        return res.status(500).send((initNum == "invalid number" && initUnit == "invalid unit") ? 
                                    "invalid number and unit" : initUnit == "invalid unit" ? 
                                    "invalid unit" : "invalid number");
      }

      console.log(returnUnit);
      res.status(200).json({initNum, initUnit, returnNum, returnUnit, string: fullString});
    }
    catch(err)
    {
      console.log(err);
      res.json({msg: err});
    }  
  });
};
