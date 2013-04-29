#!/usr/bin/env node

var pg = require("pg");

var conString = "pg://edvert:edvert_p4ssword@localhost:5430/rr";

var client = new pg.Client(conString);
client.connect();

var query = client.query("select * from management.object_versions where canonical_id = 1039 and site_id = 150 and object_type = (select id from management.object_types where name = 'Page Area')");

query.on("row", function(row, result) {
  console.log("Fired query");
  result.addRow(row);
});
query.on("end", function(result) {
  console.log(JSON.stringify(result.rows, null, "  "));
  client.end();
});