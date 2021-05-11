exports.up = function(knex) {
    return knex.schema
    .createTable("cars", (table)=>{
        table.increments()
        table.text("vin").unique().notNullable();
        table.text("make").notNullable();
        table.text("model").notNullable();
        table.integer("mileage").unsigned().notNullable();
        table.text("title");
        table.text("transmission");
    });
};

exports.down = function(knex){
    return knex.schema
    .dropTableIfExists("cars");
};