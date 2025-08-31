const db = require('../config/database');

db.all("SELECT name, sql FROM sqlite_master WHERE type='table'", [], (err, rows) => {
    if (err) {
        console.error('Erreur lors de la récupération des schémas:', err);
        process.exit(1);
    }
    console.log('Tables dans la base de données:');
    rows.forEach(row => {
        console.log(`\nTable ${row.name}:`);
        console.log(row.sql);
    });
    process.exit(0);
}); 