const db = require('../config/database');

class Accommodation {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT a.*, h.name as hotel_name, h.city, h.description, h.rating, 
                       h.distance_from_mosque, h.travel_duration, fr.formula_name
                FROM accommodations a
                JOIN hotels h ON a.hotel_id = h.id
                JOIN formulas fr ON a.formula_id = fr.id
                ORDER BY a.created_at DESC
            `, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT a.*, h.name as hotel_name, h.city, h.description, h.rating, 
                       h.distance_from_mosque, h.travel_duration, fr.formula_name
                FROM accommodations a
                JOIN hotels h ON a.hotel_id = h.id
                JOIN formulas fr ON a.formula_id = fr.id
                WHERE a.id = ?
            `, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static getByFormulaId(formulaId) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT a.*, h.name as hotel_name, h.city, h.description, h.rating, 
                       h.distance_from_mosque, h.travel_duration
                FROM accommodations a
                JOIN hotels h ON a.hotel_id = h.id
                WHERE a.formula_id = ? 
                ORDER BY h.city
            `, [formulaId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static create(accommodationData) {
        const {
            formula_id,
            hotel_id,
            check_in_date,
            check_out_date,
            stay_duration,
            board_type
        } = accommodationData;

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO accommodations (
                    formula_id, hotel_id, check_in_date, check_out_date,
                    stay_duration, board_type
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [formula_id, hotel_id, check_in_date, check_out_date,
                 stay_duration, board_type],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static update(id, accommodationData) {
        const {
            formula_id,
            hotel_id,
            check_in_date,
            check_out_date,
            stay_duration,
            board_type
        } = accommodationData;

        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE accommodations 
                 SET formula_id = ?, hotel_id = ?, check_in_date = ?, 
                     check_out_date = ?, stay_duration = ?, board_type = ?
                 WHERE id = ?`,
                [formula_id, hotel_id, check_in_date, check_out_date,
                 stay_duration, board_type, id],
                function(err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM accommodations WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    }

    // Nouvelle méthode pour obtenir les hôtels par ville
    static getHotelsByCity(city) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT * FROM hotels 
                WHERE city = ? 
                ORDER BY distance_from_mosque
            `, [city], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Accommodation; 