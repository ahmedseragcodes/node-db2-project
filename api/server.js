const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const carsRouter = require("../api/cars/cars-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/cars", carsRouter);
server.use("/", (req, res)=>{
    res.send("<h2>Success</h2>");
});

module.exports = server;
