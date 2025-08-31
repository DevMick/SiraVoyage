-- Suppression de l'ancienne table
DROP TABLE IF EXISTS programs;

-- Création de la nouvelle table programmes
CREATE TABLE programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formula_id INTEGER,
    date TEXT NOT NULL,
    month TEXT NOT NULL,
    description TEXT NOT NULL,
    label TEXT NOT NULL,
    duration INTEGER NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (formula_id) REFERENCES formulas(id)
);

-- Insertion des données de test pour la formule 1 (Omra Janvier - Paris)
INSERT INTO programs (formula_id, date, month, description, label, duration, image_url) VALUES
(1, '2024-01-15', 'JAN', 'Rendez-vous à l''aéroport Charles de Gaulle. Enregistrement et départ vers Djeddah. Arrivée à Djeddah, accueil par notre représentant et transfert vers Médine.', 'Jour 1 - Départ de Paris', 8, '/images/program1.jpg'),
(1, '2024-01-16', 'JAN', 'Installation à l''hôtel. Visite de la Mosquée du Prophète (ﷺ) et des lieux saints. Temps libre pour les prières et les visites.', 'Jour 2 - Arrivée à Médine', 4, '/images/program2.jpg'),
(1, '2024-01-17', 'JAN', 'Visite des sites historiques de Médine : Mont Uhud, Mosquée Quba, Mosquée des deux Qiblas, etc.', 'Jour 3 - Visite de Médine', 6, '/images/program3.jpg'),
(1, '2024-01-18', 'JAN', 'Journée libre à Médine pour les prières et les visites personnelles.', 'Jour 4 - Médine', 4, '/images/program4.jpg'),
(1, '2024-01-19', 'JAN', 'Dernière journée à Médine. Temps libre pour les prières et les visites.', 'Jour 5 - Médine', 4, '/images/program5.jpg'),
(1, '2024-01-20', 'JAN', 'Transfert vers Makkah. Installation à l''hôtel. Temps libre pour les prières.', 'Jour 6 - Transfert vers Makkah', 5, '/images/program6.jpg'),
(1, '2024-01-21', 'JAN', 'Accomplissement de l''Omra. Ihram, Talbiyah, Tawaf et Sa''y.', 'Jour 7 - Omra', 6, '/images/program7.jpg'),
(1, '2024-01-22', 'JAN', 'Visite des sites saints de Makkah : Mont Safa et Marwa, Grotte Hira, etc.', 'Jour 8 - Makkah', 4, '/images/program8.jpg'),
(1, '2024-01-23', 'JAN', 'Journée libre à Makkah pour les prières et les visites personnelles.', 'Jour 9 - Makkah', 4, '/images/program9.jpg'),
(1, '2024-01-24', 'JAN', 'Dernière journée à Makkah. Temps libre pour les prières et les visites.', 'Jour 10 - Makkah', 4, '/images/program10.jpg'),
(1, '2024-01-25', 'JAN', 'Transfert vers l''aéroport de Djeddah. Vol retour vers Paris.', 'Jour 11 - Retour à Paris', 8, '/images/program11.jpg');

-- Insertion des données de test pour la formule 2 (Omra Mars - Paris)
INSERT INTO programs (formula_id, date, month, description, label, duration, image_url) VALUES
(2, '2024-03-10', 'MAR', 'Rendez-vous à l''aéroport Charles de Gaulle. Enregistrement et départ vers Djeddah via Istanbul. Arrivée à Djeddah, accueil par notre représentant et transfert vers Médine.', 'Jour 1 - Départ de Paris', 8, '/images/program12.jpg'),
(2, '2024-03-11', 'MAR', 'Installation à l''hôtel. Visite de la Mosquée du Prophète (ﷺ) et des lieux saints. Temps libre pour les prières et les visites.', 'Jour 2 - Arrivée à Médine', 4, '/images/program13.jpg'),
(2, '2024-03-12', 'MAR', 'Visite des sites historiques de Médine : Mont Uhud, Mosquée Quba, Mosquée des deux Qiblas, etc.', 'Jour 3 - Visite de Médine', 6, '/images/program14.jpg'),
(2, '2024-03-13', 'MAR', 'Journée libre à Médine pour les prières et les visites personnelles.', 'Jour 4 - Médine', 4, '/images/program15.jpg'),
(2, '2024-03-14', 'MAR', 'Dernière journée à Médine. Temps libre pour les prières et les visites.', 'Jour 5 - Médine', 4, '/images/program16.jpg'),
(2, '2024-03-15', 'MAR', 'Transfert vers Makkah. Installation à l''hôtel. Temps libre pour les prières.', 'Jour 6 - Transfert vers Makkah', 5, '/images/program17.jpg'),
(2, '2024-03-16', 'MAR', 'Accomplissement de l''Omra. Ihram, Talbiyah, Tawaf et Sa''y.', 'Jour 7 - Omra', 6, '/images/program18.jpg'),
(2, '2024-03-17', 'MAR', 'Visite des sites saints de Makkah : Mont Safa et Marwa, Grotte Hira, etc.', 'Jour 8 - Makkah', 4, '/images/program19.jpg'),
(2, '2024-03-18', 'MAR', 'Journée libre à Makkah pour les prières et les visites personnelles.', 'Jour 9 - Makkah', 4, '/images/program20.jpg'),
(2, '2024-03-19', 'MAR', 'Dernière journée à Makkah. Temps libre pour les prières et les visites.', 'Jour 10 - Makkah', 4, '/images/program21.jpg'),
(2, '2024-03-20', 'MAR', 'Transfert vers l''aéroport de Djeddah. Vol retour vers Paris via Istanbul.', 'Jour 11 - Retour à Paris', 8, '/images/program22.jpg');

-- Insertion des données de test pour la formule 3 (Omra Avril - Lyon)
INSERT INTO programs (formula_id, date, month, description, label, duration, image_url) VALUES
(3, '2024-04-10', 'AVR', 'Rendez-vous à l''aéroport de Lyon-Saint Exupéry. Enregistrement et départ vers Djeddah via Dubaï. Arrivée à Djeddah, accueil par notre représentant et transfert vers Médine.', 'Jour 1 - Départ de Lyon', 8, '/images/program23.jpg'),
(3, '2024-04-11', 'AVR', 'Installation à l''hôtel. Visite de la Mosquée du Prophète (ﷺ) et des lieux saints. Temps libre pour les prières et les visites.', 'Jour 2 - Arrivée à Médine', 4, '/images/program24.jpg'),
(3, '2024-04-12', 'AVR', 'Visite des sites historiques de Médine : Mont Uhud, Mosquée Quba, Mosquée des deux Qiblas, etc.', 'Jour 3 - Visite de Médine', 6, '/images/program25.jpg'),
(3, '2024-04-13', 'AVR', 'Journée libre à Médine pour les prières et les visites personnelles.', 'Jour 4 - Médine', 4, '/images/program26.jpg'),
(3, '2024-04-14', 'AVR', 'Dernière journée à Médine. Temps libre pour les prières et les visites.', 'Jour 5 - Médine', 4, '/images/program27.jpg'),
(3, '2024-04-15', 'AVR', 'Transfert vers Makkah. Installation à l''hôtel. Temps libre pour les prières.', 'Jour 6 - Transfert vers Makkah', 5, '/images/program28.jpg'),
(3, '2024-04-16', 'AVR', 'Accomplissement de l''Omra. Ihram, Talbiyah, Tawaf et Sa''y.', 'Jour 7 - Omra', 6, '/images/program29.jpg'),
(3, '2024-04-17', 'AVR', 'Visite des sites saints de Makkah : Mont Safa et Marwa, Grotte Hira, etc.', 'Jour 8 - Makkah', 4, '/images/program30.jpg'),
(3, '2024-04-18', 'AVR', 'Journée libre à Makkah pour les prières et les visites personnelles.', 'Jour 9 - Makkah', 4, '/images/program31.jpg'),
(3, '2024-04-19', 'AVR', 'Dernière journée à Makkah. Temps libre pour les prières et les visites.', 'Jour 10 - Makkah', 4, '/images/program32.jpg'),
(3, '2024-04-20', 'AVR', 'Transfert vers l''aéroport de Djeddah. Vol retour vers Lyon via Dubaï.', 'Jour 11 - Retour à Lyon', 8, '/images/program33.jpg');

-- Insertion des données de test pour la formule 4 (Omra Avril - Marseille)
INSERT INTO programs (formula_id, date, month, description, label, duration, image_url) VALUES
(4, '2024-04-05', 'AVR', 'Rendez-vous à l''aéroport de Marseille-Provence. Enregistrement et départ vers Djeddah via Doha. Arrivée à Djeddah, accueil par notre représentant et transfert vers Médine.', 'Jour 1 - Départ de Marseille', 8, '/images/program34.jpg'),
(4, '2024-04-06', 'AVR', 'Installation à l''hôtel. Visite de la Mosquée du Prophète (ﷺ) et des lieux saints. Temps libre pour les prières et les visites.', 'Jour 2 - Arrivée à Médine', 4, '/images/program35.jpg'),
(4, '2024-04-07', 'AVR', 'Visite des sites historiques de Médine : Mont Uhud, Mosquée Quba, Mosquée des deux Qiblas, etc.', 'Jour 3 - Visite de Médine', 6, '/images/program36.jpg'),
(4, '2024-04-08', 'AVR', 'Journée libre à Médine pour les prières et les visites personnelles.', 'Jour 4 - Médine', 4, '/images/program37.jpg'),
(4, '2024-04-09', 'AVR', 'Journée libre à Médine pour les prières et les visites personnelles.', 'Jour 5 - Médine', 4, '/images/program38.jpg'),
(4, '2024-04-10', 'AVR', 'Dernière journée à Médine. Temps libre pour les prières et les visites.', 'Jour 6 - Médine', 4, '/images/program39.jpg'),
(4, '2024-04-11', 'AVR', 'Transfert vers Makkah. Installation à l''hôtel. Temps libre pour les prières.', 'Jour 7 - Transfert vers Makkah', 5, '/images/program40.jpg'),
(4, '2024-04-12', 'AVR', 'Accomplissement de l''Omra. Ihram, Talbiyah, Tawaf et Sa''y.', 'Jour 8 - Omra', 6, '/images/program41.jpg'),
(4, '2024-04-13', 'AVR', 'Visite des sites saints de Makkah : Mont Safa et Marwa, Grotte Hira, etc.', 'Jour 9 - Makkah', 4, '/images/program42.jpg'),
(4, '2024-04-14', 'AVR', 'Journée libre à Makkah pour les prières et les visites personnelles.', 'Jour 10 - Makkah', 4, '/images/program43.jpg'),
(4, '2024-04-15', 'AVR', 'Journée libre à Makkah pour les prières et les visites personnelles.', 'Jour 11 - Makkah', 4, '/images/program44.jpg'),
(4, '2024-04-16', 'AVR', 'Dernière journée à Makkah. Temps libre pour les prières et les visites.', 'Jour 12 - Makkah', 4, '/images/program45.jpg'),
(4, '2024-04-17', 'AVR', 'Transfert vers l''aéroport de Djeddah. Vol retour vers Marseille via Doha.', 'Jour 13 - Retour à Marseille', 8, '/images/program46.jpg'); 