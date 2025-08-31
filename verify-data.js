const Formula = require('./server/models/Formula');
const Flight = require('./server/models/Flight');
const Accommodation = require('./server/models/Accommodation');
const Program = require('./server/models/Program');

async function verifyData() {
    try {
        console.log('Vérification des données...\n');

        // Récupérer toutes les formules
        const formulas = await Formula.getAll();
        console.log(`Nombre de formules trouvées: ${formulas.length}`);
        
        // Afficher les détails de chaque formule
        for (const formula of formulas) {
            console.log('\n=== Détails de la formule ===');
            console.log(`Nom: ${formula.formula_name}`);
            console.log(`Type: ${formula.trip_type}`);
            console.log(`Ville de départ: ${formula.departure_city}`);
            console.log(`Dates: ${formula.departure_date} - ${formula.arrival_date}`);
            
            // Récupérer les vols
            const flights = await Flight.getByFormulaId(formula.id);
            console.log(`\nVols (${flights.length}):`);
            flights.forEach(flight => {
                console.log(`- Vol ${flight.flight_number} depuis ${flight.airport}`);
            });

            // Récupérer les hébergements
            const accommodations = await Accommodation.getByFormulaId(formula.id);
            console.log(`\nHébergements (${accommodations.length}):`);
            accommodations.forEach(acc => {
                console.log(`- ${acc.city}: ${acc.board_type}, ${acc.stay_duration} nuits`);
            });

            // Récupérer les programmes
            const programs = await Program.getByFormulaId(formula.id);
            console.log(`\nProgramme (${programs.length} activités):`);
            programs.forEach(prog => {
                console.log(`- ${prog.date}: ${prog.label} (${prog.duration}h)`);
            });

            console.log('\n================================\n');
        }

    } catch (error) {
        console.error('Erreur lors de la vérification:', error);
    }
}

// Lancer la vérification
verifyData(); 