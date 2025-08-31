const db = require('../config/database');

class Program {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT p.*, f.formula_name
                FROM programs p
                JOIN formulas f ON p.formula_id = f.id
                ORDER BY p.date ASC
            `, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT p.*, f.formula_name
                FROM programs p
                JOIN formulas f ON p.formula_id = f.id
                WHERE p.id = ?
            `, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static getByFormulaId(formulaId) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT * FROM programs 
                WHERE formula_id = ? 
                ORDER BY date ASC
            `, [formulaId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static create(programData) {
        const { formula_id, date, month, description, label, duration, image_url } = programData;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO programs (formula_id, date, month, description, label, duration, image_url)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [formula_id, date, month, description, label, duration, image_url],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static update(id, programData) {
        const { date, month, description, label, duration, image_url } = programData;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE programs 
                 SET date = ?, month = ?, description = ?, label = ?, duration = ?, image_url = ?
                 WHERE id = ?`,
                [date, month, description, label, duration, image_url, id],
                function(err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM programs WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    }

    static getByDateRange(startDate, endDate) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT p.*, f.formula_name
                FROM programs p
                JOIN formulas f ON p.formula_id = f.id
                WHERE p.date BETWEEN ? AND ?
                ORDER BY p.date ASC
            `, [startDate, endDate], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Program; 