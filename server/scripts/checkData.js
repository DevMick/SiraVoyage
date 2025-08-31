const db = require('../config/database');

// Fonction pour obtenir la dernière formule insérée
function getLastFormula() {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM formulas ORDER BY id DESC LIMIT 1', [], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

// Fonction pour obtenir les vols d'une formule
function getFlights(formulaId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM flights WHERE formula_id = ?', [formulaId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

// Fonction pour obtenir les hébergements d'une formule
function getAccommodations(formulaId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM accommodations WHERE formula_id = ?', [formulaId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

// Fonction pour obtenir le programme d'une formule
function getPrograms(formulaId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM programs WHERE formula_id = ?', [formulaId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

// Fonction principale pour vérifier les données
async function checkData() {
    try {
        console.log('Vérification des données insérées...\n');

        // Obtenir la dernière formule
        const formula = await getLastFormula();
        console.log('Dernière formule insérée:');
        console.log(formula);
        console.log('\n');

        if (formula) {
            // Obtenir les vols
            const flights = await getFlights(formula.id);
            console.log('Vols associés:');
            console.log(flights);
            console.log('\n');

            // Obtenir les hébergements
            const accommodations = await getAccommodations(formula.id);
            console.log('Hébergements associés:');
            console.log(accommodations);
            console.log('\n');

            // Obtenir le programme
            const programs = await getPrograms(formula.id);
            console.log('Programme associé:');
            console.log(programs);
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des données:', error);
    }
}

// Exécuter la vérification
checkData(); 