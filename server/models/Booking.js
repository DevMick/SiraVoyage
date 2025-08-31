const db = require('../config/database');

class Booking {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT b.*, p.title as package_title 
                FROM bookings b 
                JOIN packages p ON b.package_id = p.id 
                ORDER BY b.created_at DESC
            `, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT b.*, p.title as package_title 
                FROM bookings b 
                JOIN packages p ON b.package_id = p.id 
                WHERE b.id = ?
            `, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static create(bookingData) {
        const { package_id, customer_name, customer_email, customer_phone, number_of_people } = bookingData;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO bookings (package_id, customer_name, customer_email, customer_phone, number_of_people)
                 VALUES (?, ?, ?, ?, ?)`,
                [package_id, customer_name, customer_email, customer_phone, number_of_people],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE bookings SET status = ? WHERE id = ?',
                [status, id],
                function(err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM bookings WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Booking; 