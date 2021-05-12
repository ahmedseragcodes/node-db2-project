const express = require("express");
const Cars = require("./cars-model");
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware");

const router = express.Router();


//ENDPOINTS

//[GET] All Cars
router.get("/", (req, res, next)=>{
    Cars.getAll()
    .then((cars)=>{
        console.log("SUCCEEDED GETTING ALL CARS", cars);
        res.status(200).json(cars);
    })
    .catch((err)=>{
        console.log("FAILED TO GET ALL CARS", err);
        next(err);
    });
});

//[GET] Car By ID

router.get("/:id", checkCarId, (req, res, next)=>{

    const { id }=req.params;

    Cars.getById(id)
    .then((car)=>{
        console.log("SUCCEEDED GETTING A CAR BY ID", car);
        res.status(200).json(car);
    })
    .catch((err)=>{
        console.log("FAILED TO GET A CAR BY ID", err);
        next(err);
    });
});

//[GET] By Vin
router.get("/vins/:vin", (req, res, next)=>{
    
    const { vin } = req.params;
    
    Cars.getByVin(vin)
    .then((specificVehicle)=>{
        res.status(200).json(specificVehicle);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

//[POST] New Car
router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next)=>{

    const newCar = req.body;


    Cars.create(newCar)
    .then((car)=>{
        console.log("SUCCEEDED POSTING NEW CAR", car);
        res.status(200).json(car);
    })
    .catch((err)=>{
        console.log("FAILED TO POST NEW CAR", err);
        next(err);
    });
});

module.exports = router;