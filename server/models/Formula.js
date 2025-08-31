const db = require('../config/database');

class Formula {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT f.*, 
                    GROUP_CONCAT(DISTINCT fl.id) as flight_ids,
                    GROUP_CONCAT(DISTINCT a.id) as accommodation_ids,
                    GROUP_CONCAT(DISTINCT p.id) as program_ids
                FROM formulas f
                LEFT JOIN flights fl ON f.id = fl.formula_id
                LEFT JOIN accommodations a ON f.id = a.formula_id
                LEFT JOIN programs p ON f.id = p.formula_id
                GROUP BY f.id
                ORDER BY f.created_at DESC
            `, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT f.*, 
                    GROUP_CONCAT(DISTINCT fl.id) as flight_ids,
                    GROUP_CONCAT(DISTINCT a.id) as accommodation_ids,
                    GROUP_CONCAT(DISTINCT p.id) as program_ids
                FROM formulas f
                LEFT JOIN flights fl ON f.id = fl.formula_id
                LEFT JOIN accommodations a ON f.id = a.formula_id
                LEFT JOIN programs p ON f.id = p.formula_id
                WHERE f.id = ?
                GROUP BY f.id
            `, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static getByTripType(tripType) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM formulas WHERE trip_type = ? ORDER BY created_at DESC', [tripType], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static create(formulaData) {
        const {
            trip_type,
            departure_city,
            arrival_date,
            departure_date,
            formula_name,
            duration,
            madinah_accommodation,
            makkah_accommodation
        } = formulaData;

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO formulas (
                    trip_type, departure_city, arrival_date, departure_date,
                    formula_name, duration, madinah_accommodation, makkah_accommodation
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [trip_type, departure_city, arrival_date, departure_date,
                 formula_name, duration, madinah_accommodation, makkah_accommodation],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static update(id, formulaData) {
        const {
            trip_type,
            departure_city,
            arrival_date,
            departure_date,
            formula_name,
            duration,
            madinah_accommodation,
            makkah_accommodation
        } = formulaData;

        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE formulas 
                 SET trip_type = ?, departure_city = ?, arrival_date = ?, departure_date = ?,
                     formula_name = ?, duration = ?, madinah_accommodation = ?, makkah_accommodation = ?
                 WHERE id = ?`,
                [trip_type, departure_city, arrival_date, departure_date,
                 formula_name, duration, madinah_accommodation, makkah_accommodation, id],
                function(err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM formulas WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Formula; 