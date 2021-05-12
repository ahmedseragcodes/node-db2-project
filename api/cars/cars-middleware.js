const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  
  const { id } = req.params;

  Cars.getById(id)
  .then((specificCar)=>{
    if(specificCar){
      next();
    } else {
      res.status(404).json({message: `car with id ${id} is not found`});
    }
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

}

const checkCarPayload = (req, res, next) => {
  
  const carToCheck = req.body;

  if(!carToCheck.vin){
    res.status(400).json({message: "vin is missing"})
  } else {
    if (!carToCheck.make){
      res.status(400).json({message: "make is missing"})
    } else {
      if(!carToCheck.model){
        res.status(400).json({message: "model is missing"})
      } else {
        if(!carToCheck.mileage){
          res.status(400).json({message: "mileage is missing"})
        } else {
          next();
        }
      }
    }
  }

}

const checkVinNumberValid = (req, res, next) => {
  
  const vinToValidate = req.body.vin;

  if(vinToValidate){
    if(vinValidator.validate(vinToValidate)){
      next();
    } else {
      res.status(400).json({message: `vin ${vinToValidate} is invalid`})
    }
  } else {
    res.status(400).json({message: "vin is missing"});
  }
}

const checkVinNumberUnique = (req, res, next) => {
  
  const { vin } = req.params;

  Cars.getByVin(vin)
  .then((specificVehicle)=>{
    if(specificVehicle){
      res.status(400).json({message: `vin ${vin} already exists`});
    } else {
      next();
    }
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }