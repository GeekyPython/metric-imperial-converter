'use strict';

const expect = require('chai').expect;
const router = require('express').Router();
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.get('/api/convert', (req,res) => {
    
    try
    {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      console.log(initNum, initUnit);

      if(initNum === "invalid number")
      {
        if(initUnit === "invalid unit")
        {
          return res.status(200).send("invalid number and unit");
        }

        return res.status(200).send("invalid number");
      }

      else if(initUnit === "invalid unit")
      {
        return res.status(200).send("invalid unit");
      }

      const returnNum = convertHandler.convert(initNum, initUnit).returnValue;
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      // console.log(returnString);
      const returnData = {
        initNum, initUnit, returnNum, returnUnit, string: returnString
      }

      return res.status(200).json(returnData);
    }

    catch(err)
    {
      console.log(err);
      res.status(500).json({msg: err});
    }
    
  });

};
