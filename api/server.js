const express = require("express");
const CarsRouter = require("./cars/cars-router");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/cars", CarsRouter);

//SANITY CHECK ENDPOINT 
server.get("*", (req, res, next)=>{
    res.json({message: "API Up"});
});

//Error Handling Middleware 
server.use((err, req, res, next)=>{
    res.status(500).json({message: err.message});
});


module.exports = server
