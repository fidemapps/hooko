module.exports = function () {
  var db = require('../../db');

  function dropDatabase() {
    console.info('Dropping database...');
    db.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      console.info('Database dropped');
      db.connection.close();
    });
  }

  // Mongo is connected.
  if (db.connection.readyState === 1)
    return dropDatabase();

  console.info('Waiting for connection...');
  db.connection.on('open', dropDatabase);
};
