const pool = require('./pool');

async function getAllUsers() {
    const {rows} = await pool.query('SELECT * FROM users');
    return rows;
}

async function insertUser(username, password) {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
}

module.exports = {
    getAllUsers,
    insertUser
};