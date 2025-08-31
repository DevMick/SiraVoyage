const db = require('../config/database');

class Testimonial {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM testimonials ORDER BY created_at DESC', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM testimonials WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static create(testimonialData) {
        const { customer_name, rating, comment, image_url } = testimonialData;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO testimonials (customer_name, rating, comment, image_url)
                 VALUES (?, ?, ?, ?)`,
                [customer_name, rating, comment, image_url],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static update(id, testimonialData) {
        const { customer_name, rating, comment, image_url } = testimonialData;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE testimonials 
                 SET customer_name = ?, rating = ?, comment = ?, image_url = ?
                 WHERE id = ?`,
                [customer_name, rating, comment, image_url, id],
                function(err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM testimonials WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    }

    static getAverageRating() {
        return new Promise((resolve, reject) => {
            db.get('SELECT AVG(rating) as average FROM testimonials', [], (err, row) => {
                if (err) reject(err);
                resolve(row.average || 0);
            });
        });
    }
}

module.exports = Testimonial; 