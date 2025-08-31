const db = require('../config/database');

// Récupération de la formule principale
db.get(`
    SELECT * FROM formulas 
    WHERE id = 1
`, [], (err, formula) => {
    if (err) {
        console.error('Erreur lors de la récupération de la formule:', err);
        process.exit(1);
    }

    if (!formula) {
        console.log('Aucune formule trouvée avec l\'ID 1');
        process.exit(0);
    }

    console.log('\n=== DÉTAILS DE LA FORMULE ===');
    console.log('----------------------------');
    console.log(`ID: ${formula.id}`);
    console.log(`Type de voyage: ${formula.trip_type}`);
    console.log(`Ville de départ: ${formula.departure_city}`);
    console.log(`Date d'arrivée: ${formula.arrival_date}`);
    console.log(`Date de départ: ${formula.departure_date}`);
    console.log(`Nom de la formule: ${formula.formula_name}`);
    console.log(`Durée: ${formula.duration} jours`);
    console.log(`Hébergement à Médine: ${formula.madinah_accommodation}`);
    console.log(`Hébergement à La Mecque: ${formula.makkah_accommodation}`);
    console.log(`Prix: ${formula.price}€`);
    console.log(`Mois: ${formula.month}`);

    // Récupération des vols associés
    db.all(`
        SELECT * FROM flights 
        WHERE formula_id = 1
        ORDER BY departure_date
    `, [], (err, flights) => {
        if (err) {
            console.error('Erreur lors de la récupération des vols:', err);
            return;
        }

        console.log('\n=== VOLS ASSOCIÉS ===');
        console.log('-------------------');
        flights.forEach(flight => {
            console.log(`\nVol ${flight.id}:`);
            console.log(`Date de départ: ${flight.departure_date}`);
            console.log(`Aéroport de départ: ${flight.departure_airport}`);
            console.log(`Aéroport d'arrivée: ${flight.arrival_airport}`);
            console.log(`Numéro de vol: ${flight.flight_number}`);
        });

        // Récupération des hébergements associés
        db.all(`
            SELECT * FROM accommodations 
            WHERE formula_id = 1
        `, [], (err, accommodations) => {
            if (err) {
                console.error('Erreur lors de la récupération des hébergements:', err);
                return;
            }

            console.log('\n=== HÉBERGEMENTS ASSOCIÉS ===');
            console.log('---------------------------');
            accommodations.forEach(accommodation => {
                console.log(`\nHébergement ${accommodation.id}:`);
                console.log(`Ville: ${accommodation.city}`);
                console.log(`Distance des sites saints: ${accommodation.distance_to_holy_sites} km`);
                console.log(`Temps de trajet: ${accommodation.travel_time_to_holy_sites} minutes`);
                console.log(`Heure de check-out: ${accommodation.checkout_time}`);
                console.log(`Durée du séjour: ${accommodation.stay_duration} jours`);
                console.log(`Type de pension: ${accommodation.board_type}`);
            });

            // Récupération du programme détaillé
            db.all(`
                SELECT * FROM programs 
                WHERE formula_id = 1
                ORDER BY day_number
            `, [], (err, programs) => {
                if (err) {
                    console.error('Erreur lors de la récupération du programme:', err);
                    return;
                }

                console.log('\n=== PROGRAMME DÉTAILLÉ ===');
                console.log('------------------------');
                programs.forEach(program => {
                    console.log(`\nJour ${program.day_number}:`);
                    console.log(`Date: ${program.date}`);
                    console.log(`Label: ${program.label}`);
                    console.log(`Description: ${program.description}`);
                    console.log(`Durée: ${program.duration}`);
                });
            });
        });
    });
}); 