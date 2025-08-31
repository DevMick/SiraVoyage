const db = require('../config/database');

db.all("PRAGMA table_info(programs)", [], (err, rows) => {
    if (err) {
        console.error('Erreur lors de la récupération de la structure de la table:', err);
        process.exit(1);
    }

    console.log('Structure de la table programs:');
    console.log('--------------------------------');
    rows.forEach(row => {
        console.log(`${row.name}: ${row.type} ${row.notnull ? 'NOT NULL' : ''} ${row.dflt_value ? `DEFAULT ${row.dflt_value}` : ''}`);
    });

    // Afficher un exemple de données
    db.get("SELECT * FROM programs WHERE id = 1", [], (err, row) => {
        if (err) {
            console.error('Erreur lors de la récupération des données:', err);
            return;
        }

        console.log('\nExemple de données:');
        console.log('------------------');
        console.log(row);
    });

    process.exit(0);
}); 