const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../db/sira_voyage.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
    } else {
        console.log('Connexion à la base de données SQLite établie avec succès');
        initDatabase();
    }
});

function initDatabase() {
    // Création des tables
    db.serialize(() => {
        // Table des formules
        db.run(`CREATE TABLE IF NOT EXISTS formulas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trip_type TEXT NOT NULL,
            departure_city TEXT NOT NULL,
            arrival_date TEXT NOT NULL,
            departure_date TEXT NOT NULL,
            formula_name TEXT NOT NULL,
            duration INTEGER NOT NULL,
            madinah_accommodation TEXT NOT NULL,
            makkah_accommodation TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Table des vols
        db.run(`CREATE TABLE IF NOT EXISTS flights (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER,
            departure_date TEXT NOT NULL,
            arrival_date TEXT NOT NULL,
            airport TEXT NOT NULL,
            flight_number TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id)
        )`);

        // Table des hébergements
        db.run(`CREATE TABLE IF NOT EXISTS accommodations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER,
            city TEXT NOT NULL,
            distance REAL NOT NULL,
            travel_duration TEXT NOT NULL,
            check_out_time TEXT NOT NULL,
            stay_duration INTEGER NOT NULL,
            board_type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id)
        )`);

        // Table des programmes
        db.run(`CREATE TABLE IF NOT EXISTS programs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER,
            date TEXT NOT NULL,
            description TEXT NOT NULL,
            label TEXT NOT NULL,
            duration INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id)
        )`);

        // Table des réservations
        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT NOT NULL,
            number_of_people INTEGER NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id)
        )`);

        // Table des témoignages
        db.run(`CREATE TABLE IF NOT EXISTS testimonials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            rating INTEGER NOT NULL,
            comment TEXT NOT NULL,
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    });
}

module.exports = db; 