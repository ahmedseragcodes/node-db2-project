const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  
  const { id } = req.params;
  const car = Cars.getById(id);
  if (car){
    next();
  } else {
    res.status(404).json({message: `car with id ${id} is not found`});
  }
};

const checkCarPayload = (req, res, next) => {
  const newCar = req.body;

  if (newCar.vin){
    if (newCar.make){
      if (newCar.model){
        if (newCar.mileage){
          next();
        } else {
          res.status(400).json({message: "Mileage is missing"});
        }
      } else {
        res.status(400).json({message: "Model is missing"});
      }
    } else {
      res.status(400).json({message: "Make is missing"});
    }
  } else {
    res.status(400).json({message: "Vin is missing"});
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const newCar = req.body;
  if (vinValidator.validate(newCar.vin)){
    next();
  } else {
    res.status(400).json({message: `vin ${newCar.vin} is invalid`});
  }
}

const checkVinNumberUnique = (req, res, next) => {
  
  const vinToCheck = req.body.vin;
  if (vinToCheck){
    Cars.getAll()
    .then((resolvedCars)=>{
      resolvedCars.data.filter((car)=>{
        return car.vin === vinToCheck ? res.status(400).json({message: `vin ${vinToCheck} already exists`}) : next(); 
      })
    })
    .catch((err)=>{
      res.status(500).json({message: "Failed to get all cars"});
    })
  } else {
    res.status(400).json({message: "Vin is missing"});
  }
}

module.exports = {
  checkCarId, 
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}