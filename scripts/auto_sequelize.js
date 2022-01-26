const fs = require('fs');
const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('c1353623c_chroflix', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
});

// auto.run().then(data => {
//   console.log(data.tables);      // table and field list
//   console.log(data.foreignKeys); // table foreign key list
//   console.log(data.indexes);     // table indexes
//   console.log(data.hasTriggerTables); // tables that have triggers
//   console.log(data.relations);   // relationships between models
//   console.log(data.text)         // text of generated models

// });

console.log('DB Name is : c1353623c_chroflix')
