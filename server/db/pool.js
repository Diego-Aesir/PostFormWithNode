const {Pool} = require('pg');

module.exports = new Pool({
    host: 'localhost',
    user: 'diego',
    database: 'postformwnode',
    password: '123',
    port: 5432
});