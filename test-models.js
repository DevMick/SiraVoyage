const Formula = require('./server/models/Formula');
const Flight = require('./server/models/Flight');
const Accommodation = require('./server/models/Accommodation');
const Program = require('./server/models/Program');

async function testAllModels() {
    try {
        console.log('Démarrage des tests...\n');

        // 1. Test de création d'une formule
        console.log('1. Test de création d\'une formule...');
        const formulaId = await Formula.create({
            trip_type: 'omra',
            departure_city: 'Paris',
            arrival_date: '2024-06-01',
            departure_date: '2024-06-10',
            formula_name: 'Omra Essentielle',
            duration: 10,
            madinah_accommodation: 'Hilton Madinah',
            makkah_accommodation: 'Hilton Makkah'
        });
        console.log('Formule créée avec ID:', formulaId);

        // 2. Test de création d'un vol
        console.log('\n2. Test de création d\'un vol...');
        const flightId = await Flight.create({
            formula_id: formulaId,
            departure_date: '2024-06-01',
            arrival_date: '2024-06-01',
            airport: 'CDG',
            flight_number: 'SV123'
        });
        console.log('Vol créé avec ID:', flightId);

        // 3. Test de création d'un hébergement
        console.log('\n3. Test de création d\'un hébergement...');
        const accommodationId = await Accommodation.create({
            formula_id: formulaId,
            city: 'Makkah',
            distance: 0.5,
            travel_duration: '10 minutes',
            check_out_time: '12:00',
            stay_duration: 5,
            board_type: 'Demi-pension'
        });
        console.log('Hébergement créé avec ID:', accommodationId);

        // 4. Test de création d'un programme
        console.log('\n4. Test de création d\'un programme...');
        const programId = await Program.create({
            formula_id: formulaId,
            date: '2024-06-02',
            description: 'Visite de la Mosquée Al-Haram',
            label: 'Visite guidée',
            duration: 2
        });
        console.log('Programme créé avec ID:', programId);

        // 5. Test de récupération de la formule avec ses relations
        console.log('\n5. Test de récupération de la formule...');
        const formula = await Formula.getById(formulaId);
        console.log('Formule récupérée:', formula);

        // 6. Test de récupération des vols de la formule
        console.log('\n6. Test de récupération des vols...');
        const flights = await Flight.getByFormulaId(formulaId);
        console.log('Vols de la formule:', flights);

        // 7. Test de récupération des hébergements de la formule
        console.log('\n7. Test de récupération des hébergements...');
        const accommodations = await Accommodation.getByFormulaId(formulaId);
        console.log('Hébergements de la formule:', accommodations);

        // 8. Test de récupération des programmes de la formule
        console.log('\n8. Test de récupération des programmes...');
        const programs = await Program.getByFormulaId(formulaId);
        console.log('Programmes de la formule:', programs);

        // 9. Test de mise à jour de la formule
        console.log('\n9. Test de mise à jour de la formule...');
        const updateResult = await Formula.update(formulaId, {
            trip_type: 'omra',
            departure_city: 'Paris',
            arrival_date: '2024-06-01',
            departure_date: '2024-06-12',
            formula_name: 'Omra Essentielle Plus',
            duration: 12,
            madinah_accommodation: 'Hilton Madinah',
            makkah_accommodation: 'Hilton Makkah'
        });
        console.log('Résultat de la mise à jour:', updateResult);

        // 10. Test de suppression
        console.log('\n10. Test de suppression...');
        await Program.delete(programId);
        await Accommodation.delete(accommodationId);
        await Flight.delete(flightId);
        await Formula.delete(formulaId);
        console.log('Tous les éléments ont été supprimés avec succès');

        console.log('\nTous les tests ont été effectués avec succès!');
    } catch (error) {
        console.error('Erreur lors des tests:', error);
    }
}

// Lancer les tests
testAllModels(); 