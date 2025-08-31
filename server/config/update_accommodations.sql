-- Suppression des anciennes tables
DROP TABLE IF EXISTS accommodations;
DROP TABLE IF EXISTS hotels;

-- Création de la table des hôtels
CREATE TABLE hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL CHECK (city IN ('Makkah', 'Medina')),
    name TEXT NOT NULL,
    description TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    distance_from_mosque REAL NOT NULL,
    travel_duration TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des hébergements
CREATE TABLE accommodations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formula_id INTEGER,
    hotel_id INTEGER,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    stay_duration INTEGER NOT NULL,
    board_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (formula_id) REFERENCES formulas(id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- Insertion des hôtels de Makkah
INSERT INTO hotels (city, name, description, rating, distance_from_mosque, travel_duration) VALUES
('Makkah', 'Hilton Suites Makkah', 'Hôtel 5 étoiles avec vue sur la Grande Mosquée', 5, 0.2, '5 minutes'),
('Makkah', 'VOCO Makkah', 'Hôtel moderne avec accès direct à la Grande Mosquée', 4, 0.4, '5 minutes'),
('Makkah', 'Swissotel Al Maqam', 'Hôtel luxueux avec vue panoramique sur la Kaaba', 5, 0.3, '5 minutes'),
('Makkah', 'Raffles Makkah Palace', 'Hôtel de luxe avec service personnalisé', 5, 0.5, '8 minutes'),
('Makkah', 'Fairmont Makkah Clock Royal Tower', 'Hôtel emblématique avec vue sur la Grande Mosquée', 5, 0.1, '3 minutes');

-- Insertion des hôtels de Medina
INSERT INTO hotels (city, name, description, rating, distance_from_mosque, travel_duration) VALUES
('Medina', 'Pullman Zamzam Madina', 'Hôtel moderne près de la Mosquée du Prophète', 4, 0.5, '10 minutes'),
('Medina', 'Nusk Al Hijrah', 'Hôtel confortable avec accès facile à la Mosquée', 4, 0.6, '7 minutes'),
('Medina', 'Crown Plaza Madinah', 'Hôtel 5 étoiles avec service premium', 5, 0.4, '8 minutes'),
('Medina', 'Anwar Al Madinah Mövenpick', 'Hôtel luxueux avec vue sur la Mosquée', 5, 0.3, '5 minutes'),
('Medina', 'Le Meridien Medina', 'Hôtel moderne avec excellent service', 4, 0.7, '12 minutes');

-- Insertion des données de test pour les hébergements
INSERT INTO accommodations (formula_id, hotel_id, check_in_date, check_out_date, stay_duration, board_type) VALUES
(1, 6, '2024-05-05', '2024-05-10', 5, 'Petit-déjeuner'),  -- Pullman Zamzam Madina
(1, 1, '2024-05-10', '2024-05-15', 5, 'Petit-déjeuner'),  -- Hilton Suites Makkah
(2, 7, '2024-05-10', '2024-05-15', 5, 'Petit-déjeuner'),  -- Nusk Al Hijrah
(2, 2, '2024-05-15', '2024-05-20', 5, 'Petit-déjeuner');  -- VOCO Makkah 