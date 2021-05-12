
exports.up = function(knex) {
  return knex.schema
    .table("cars", (table)=>{
        table.integer("value");
    })
};

exports.down = function(knex) {
  return knex.schema
  .table("cars", (table)=>{
      table.dropColumn("value")
  })
};
