let mysql = require('mysql');
const settings = require('../settings.json')
let db;


function getDBPool() {
    if (!db) {
        db = mysql.createPool(settings);
    }
    return db;
}

module.exports = getDBPool();