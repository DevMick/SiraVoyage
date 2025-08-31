const db = require('../config/database');

class Flight {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT f.*, fr.formula_name, fr.departure_city
                FROM flights f
                JOIN formulas fr ON f.formula_id = fr.id
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
                SELECT f.*, fr.formula_name, fr.departure_city
                FROM flights f
                JOIN formulas fr ON f.formula_id = fr.id
                WHERE f.id = ?
            `, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static getByFormulaId(formulaId) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM flights WHERE formula_id = ? ORDER BY departure_date', [formulaId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static create(flightData) {
        const { formula_id, departure_date, arrival_date, airport, flight_number } = flightData;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO flights (formula_id, departure_date, arrival_date, airport, flight_number)
                 VALUES (?, ?, ?, ?, ?)`,
                [formula_id, departure_date, arrival_date, airport, flight_number],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static update(id, flightData) {
        const { formula_id, departure_date, arrival_date, airport, flight_number } = flightData;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE flights 
                 SET formula_id = ?, departure_date = ?, arrival_date = ?, airport = ?, flight_number = ?
                 WHERE id = ?`,
                [formula_id, departure_date, arrival_date, airport, flight_number, id],
                function(err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM flights WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Flight; 