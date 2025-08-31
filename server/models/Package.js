const db = require('../config/database');

class Package {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM packages ORDER BY created_at DESC', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM packages WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static create(packageData) {
        const { title, description, price, duration, departure_date, departure_city, formula_type, image_url } = packageData;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO packages (title, description, price, duration, departure_date, departure_city, formula_type, image_url)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [title, description, price, duration, departure_date, departure_city, formula_type, image_url],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static update(id, packageData) {
        const { title, description, price, duration, departure_date, departure_city, formula_type, image_url } = packageData;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE packages 
                 SET title = ?, description = ?, price = ?, duration = ?, departure_date = ?, 
                     departure_city = ?, formula_type = ?, image_url = ?
                 WHERE id = ?`,
                [title, description, price, duration, departure_date, departure_city, formula_type, image_url, id],
                function(err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM packages WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Package; 