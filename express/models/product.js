const db = require('./db');

class Product {
    static databaseName = 'products';

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static load(id) {
        return new Promise((resolve, reject) => {
            let query;
            let params;

            if (Array.isArray(id)) {
                if (id.length === 0) {
                    resolve([]);
                }
                query = `SELECT * from ${Product.databaseName} where id in (?);`
                params = [id];
            } else {
                query = `SELECT * from ${Product.databaseName} where id=?;`;
                params = [id];
            }
            return db.query(query, params, (err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    if (resp.length > 0) {
                        resolve(resp.map((e) => new Product(e.id, e.name)));
                    }
                    else {
                        reject(null);
                    }
                }
            });
        });
    }

    static loadAll() {
        return new Promise((resolve, reject) => {
            return db.query(`SELECT * from ${Product.databaseName};`, (err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resp.map((e) => new Product(e.id, e.name)));
                }
            });
        });
    }

    url(action = null) {
        let base = `/product?id=${this.id}`;
        if (action) {
            base += `&action=${action}`
        }
        return base;
    }
}

module.exports = Product;