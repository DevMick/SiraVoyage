const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

async function testFormulas() {
    try {
        // Test de création d'une formule
        console.log('Test de création d\'une formule...');
        const createResponse = await axios.post(`${API_URL}/formulas`, {
            label: 'Omra Essentielle',
            trip_type: 'omra',
            duration: 10,
            price: 1290,
            description: 'Formule Omra de base avec les services essentiels'
        });
        console.log('Formule créée:', createResponse.data);

        const formulaId = createResponse.data.id;

        // Test de récupération de toutes les formules
        console.log('\nTest de récupération de toutes les formules...');
        const getAllResponse = await axios.get(`${API_URL}/formulas`);
        console.log('Liste des formules:', getAllResponse.data);

        // Test de récupération d'une formule par ID
        console.log('\nTest de récupération d\'une formule par ID...');
        const getByIdResponse = await axios.get(`${API_URL}/formulas/${formulaId}`);
        console.log('Formule trouvée:', getByIdResponse.data);

        // Test de récupération des formules par type de voyage
        console.log('\nTest de récupération des formules par type de voyage...');
        const getByTypeResponse = await axios.get(`${API_URL}/formulas/trip-type/omra`);
        console.log('Formules Omra:', getByTypeResponse.data);

        // Test de mise à jour d'une formule
        console.log('\nTest de mise à jour d\'une formule...');
        const updateResponse = await axios.put(`${API_URL}/formulas/${formulaId}`, {
            label: 'Omra Essentielle Plus',
            trip_type: 'omra',
            duration: 12,
            price: 1490,
            description: 'Formule Omra améliorée avec services supplémentaires'
        });
        console.log('Formule mise à jour:', updateResponse.data);

        // Test de suppression d'une formule
        console.log('\nTest de suppression d\'une formule...');
        const deleteResponse = await axios.delete(`${API_URL}/formulas/${formulaId}`);
        console.log('Formule supprimée:', deleteResponse.data);

        console.log('\nTous les tests ont été effectués avec succès!');
    } catch (error) {
        console.error('Erreur lors des tests:', error.response ? error.response.data : error.message);
    }
}

// Installer axios si nécessaire
const installAxios = async () => {
    try {
        await axios.get('http://localhost:3001');
    } catch (error) {
        console.log('Installation d\'axios...');
        require('child_process').execSync('npm install axios');
    }
};

// Lancer les tests
installAxios().then(() => {
    console.log('Démarrage des tests...');
    testFormulas();
}); 