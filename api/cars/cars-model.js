const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id);
};

const create = (newCar) => {
  return db("cars").insert(newCar)
  .then((ids)=>{
     return db("cars").where({id: ids[0]});
  });
};

module.exports = { getAll, getById, create };