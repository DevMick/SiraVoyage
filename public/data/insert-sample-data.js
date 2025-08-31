const Formula = require('./server/models/Formula');
const Flight = require('./server/models/Flight');
const Accommodation = require('./server/models/Accommodation');
const Program = require('./server/models/Program');

const formulas = [
    // Offres Omra - Formule Confort
    {
        trip_type: 'omra',
        departure_city: 'Paris',
        arrival_date: '2024-05-05',
        departure_date: '2024-05-15',
        formula_name: 'Omra Mai - Paris',
        duration: 10,
        madinah_accommodation: 'Le Meridien Medina',
        makkah_accommodation: 'Swissotel Al Maqam',
        price: 1490.00
    },
    {
        trip_type: 'omra',
        departure_city: 'Lyon',
        arrival_date: '2024-05-10',
        departure_date: '2024-05-20',
        formula_name: 'Omra Mai - Lyon',
        duration: 10,
        madinah_accommodation: 'Pullman Zamzam Madina',
        makkah_accommodation: 'Hilton Suites Makkah',
        price: 1490.00
    },
    {
        trip_type: 'omra',
        departure_city: 'Marseille',
        arrival_date: '2024-05-15',
        departure_date: '2024-05-25',
        formula_name: 'Omra Mai - Marseille',
        duration: 10,
        madinah_accommodation: 'Crown Plaza Madinah',
        makkah_accommodation: 'Raffles Makkah Palace',
        price: 1490.00
    },
    // Offres Omra - Formule Essentielle
    {
        trip_type: 'omra',
        departure_city: 'Paris',
        arrival_date: '2024-06-01',
        departure_date: '2024-06-11',
        formula_name: 'Omra Juin - Paris',
        duration: 10,
        madinah_accommodation: 'Nusk Al Hijrah',
        makkah_accommodation: 'VOCO Makkah',
        price: 1290.00
    },
    {
        trip_type: 'omra',
        departure_city: 'Nice',
        arrival_date: '2024-06-05',
        departure_date: '2024-06-15',
        formula_name: 'Omra Juin - Nice',
        duration: 10,
        madinah_accommodation: 'Nusk Al Hijrah',
        makkah_accommodation: 'VOCO Makkah',
        price: 1290.00
    },
    // Offres Omra Ramadan - Formule Confort
    {
        trip_type: 'omra_ramadan',
        departure_city: 'Paris',
        arrival_date: '2024-03-10',
        departure_date: '2024-03-22',
        formula_name: 'Omra Ramadan Mars - Paris',
        duration: 12,
        madinah_accommodation: 'Anwar Al Madinah Mövenpick',
        makkah_accommodation: 'Fairmont Makkah Clock Royal Tower',
        price: 1840.00
    },
    {
        trip_type: 'omra_ramadan',
        departure_city: 'Lyon',
        arrival_date: '2024-03-15',
        departure_date: '2024-03-27',
        formula_name: 'Omra Ramadan Mars - Lyon',
        duration: 12,
        madinah_accommodation: 'Anwar Al Madinah Mövenpick',
        makkah_accommodation: 'Fairmont Makkah Clock Royal Tower',
        price: 1840.00
    },
    // Offres Omra Ramadan - Formule Essentielle
    {
        trip_type: 'omra_ramadan',
        departure_city: 'Paris',
        arrival_date: '2024-03-01',
        departure_date: '2024-03-13',
        formula_name: 'Omra Ramadan Mars - Paris',
        duration: 12,
        madinah_accommodation: 'Nusk Al Hijrah',
        makkah_accommodation: 'VOCO Makkah',
        price: 1590.00
    },
    {
        trip_type: 'omra_ramadan',
        departure_city: 'Marseille',
        arrival_date: '2024-03-05',
        departure_date: '2024-03-17',
        formula_name: 'Omra Ramadan Mars - Marseille',
        duration: 12,
        madinah_accommodation: 'Nusk Al Hijrah',
        makkah_accommodation: 'VOCO Makkah',
        price: 1590.00
    },
    {
        trip_type: 'omra_ramadan',
        departure_city: 'Nice',
        arrival_date: '2024-03-20',
        departure_date: '2024-04-01',
        formula_name: 'Omra Ramadan Mars - Nice',
        duration: 12,
        madinah_accommodation: 'Nusk Al Hijrah',
        makkah_accommodation: 'VOCO Makkah',
        price: 1590.00
    },
    {
        trip_type: 'omra_ramadan',
        departure_city: 'Bordeaux',
        arrival_date: '2024-03-25',
        departure_date: '2024-04-06',
        formula_name: 'Omra Ramadan Mars - Bordeaux',
        duration: 12,
        madinah_accommodation: 'Nusk Al Hijrah',
        makkah_accommodation: 'VOCO Makkah',
        price: 1590.00
    }
];

const flights = [
    { airport: 'CDG', flight_number: 'SV123' },
    { airport: 'LYS', flight_number: 'SV456' },
    { airport: 'MRS', flight_number: 'SV789' },
    { airport: 'NCE', flight_number: 'SV321' },
    { airport: 'BOD', flight_number: 'SV654' }
];

const accommodations = [
    {
        city: 'Makkah',
        distance: 0.2,
        travel_duration: '5 minutes',
        check_out_time: '12:00',
        stay_duration: 5,
        board_type: 'Pension complète'
    },
    {
        city: 'Madinah',
        distance: 0.5,
        travel_duration: '10 minutes',
        check_out_time: '12:00',
        stay_duration: 5,
        board_type: 'Demi-pension'
    }
];

const programs = [
    {
        description: 'Arrivée à Médine et installation à l\'hôtel',
        label: 'Jour 1 - Arrivée',
        duration: 2,
        day_number: 1
    },
    {
        description: 'Visite de la Mosquée du Prophète et sites historiques',
        label: 'Jour 2 - Visite de Médine',
        duration: 6,
        day_number: 2
    },
    {
        description: 'Départ pour La Mecque et Umrah',
        label: 'Jour 3 - Direction La Mecque',
        duration: 8,
        day_number: 3
    },
    {
        description: 'Tawaf et Saï, visite de la Kaaba',
        label: 'Jour 4 - Rituels',
        duration: 6,
        day_number: 4
    },
    {
        description: 'Visite des sites historiques de La Mecque',
        label: 'Jour 5 - Découverte',
        duration: 4,
        day_number: 5
    }
];

async function insertSampleData() {
    try {
        console.log('Insertion des données de test...\n');

        for (let i = 0; i < formulas.length; i++) {
            // Création de la formule
            const formulaId = await Formula.create(formulas[i]);
            console.log(`Formule ${i + 1} créée avec ID:`, formulaId);

            // Création du vol aller
            const departureFlight = {
                formula_id: formulaId,
                departure_date: formulas[i].departure_date,
                arrival_date: formulas[i].arrival_date,
                airport: flights[i % flights.length].airport,
                flight_number: flights[i % flights.length].flight_number
            };
            await Flight.create(departureFlight);

            // Création du vol retour
            const returnFlight = {
                formula_id: formulaId,
                departure_date: formulas[i].arrival_date,
                arrival_date: formulas[i].departure_date,
                airport: flights[i % flights.length].airport,
                flight_number: flights[i % flights.length].flight_number
            };
            await Flight.create(returnFlight);

            // Création des hébergements
            for (const accommodation of accommodations) {
                const accommodationData = { ...accommodation, formula_id: formulaId };
                await Accommodation.create(accommodationData);
            }

            // Création des programmes
            for (const program of programs) {
                const programDate = new Date(formulas[i].arrival_date);
                programDate.setDate(programDate.getDate() + program.day_number - 1);
                
                const programData = {
                    ...program,
                    formula_id: formulaId,
                    date: programDate.toISOString().split('T')[0]
                };
                await Program.create(programData);
            }
        }

        console.log('\nToutes les données ont été insérées avec succès!');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error);
    }
}

// Lancer l'insertion des données
insertSampleData(); 