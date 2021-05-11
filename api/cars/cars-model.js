const db = require("../../data/db-config");

const getAll = () => {
  
  return db("cars");

};

const getById = (id) => {
  
  return db("cars")
          .where("id", id);

};

const create = async(newCar) => {
  
  const newCardId = await db("cars").insert(newCar);

  return getById(newCardId);


};

module.exports = { getAll, getById, create }