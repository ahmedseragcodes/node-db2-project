exports.seed = function(knex){
    return knex("cars").truncate()
    .then(()=>{
        return knex("cars").insert([
            {id: 1, vin: "1111", make: "chevorlet", model: "cobalt", mileage: "100,000"},
            {id: 2, vin: "2222", make: "chevorlet", model: "malibu", mileage: "100,000"},
            {id: 3, vin: "3333", make: "chevorlet", model: "corvette", mileage: "100,000"},
            {id: 4, vin: "4444", make: "chevorlet", model: "silverado", mileage: "100,000"}
        ]);
    });
}; 