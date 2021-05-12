const db = require("../../data/db-config");

const getAll = () => {
  
  return db("cars");

};

const getById = (id) => {
  
  return db("cars")
          .where("id", id);

};

const getByVin = (vin) => {
  return db("cars")
          .where({vin})
          .first()
}

const create = async(newCar) => {
  
  const newCardId = await db("cars").insert(newCar);

  return getById(newCardId);


};

const remove = (id) =>{

  return db("cars")
          .where("id", id)
          .del()
}


module.exports = { getAll, getById, getByVin, create, remove }