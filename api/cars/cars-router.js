const express = require("express");
const Cars = require("./cars-model");

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
    })
});


//ERROR CATCH ALL
router.use((err, req, res, next)=>{
    res.status(500).json({message: err.message});
});

module.exports = router;