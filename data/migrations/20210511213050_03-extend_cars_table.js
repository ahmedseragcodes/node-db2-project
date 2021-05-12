
exports.up = function(knex) {
    return knex.schema
      .table("cars", (table)=>{
          table.integer("trade_in_value");
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .table("cars", (table)=>{
        table.dropColumn("trade_in_value")
    })
  };
  