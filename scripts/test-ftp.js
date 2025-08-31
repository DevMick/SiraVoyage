#!/usr/bin/env node

/**
 * Script de test de connexion FTP pour SiraVoyage
 * Utilise les mêmes paramètres que le workflow GitHub Actions
 */

const ftp = require('basic-ftp');

async function testFTPConnection() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
        console.log('🔍 Test de connexion FTP...');
        console.log('Host:', process.env.FTP_HOST || 'ftp.omrahajjabidjan.com');
        console.log('Username:', process.env.FTP_USERNAME || 'DevMick@omrahajjabidjan.com');
        console.log('Port: 21');
        
        await client.access({
            host: process.env.FTP_HOST || 'ftp.omrahajjabidjan.com',
            user: process.env.FTP_USERNAME || 'DevMick@omrahajjabidjan.com',
            password: process.env.FTP_PASSWORD || 'YOUR_PASSWORD_HERE',
            port: 21,
            secure: false
        });
        
        console.log('✅ Connexion FTP réussie !');
        
        // Lister le contenu du répertoire racine
        console.log('\n📁 Contenu du répertoire racine :');
        const list = await client.list();
        list.forEach(item => {
            console.log(`${item.type === 1 ? '📁' : '📄'} ${item.name}`);
        });
        
        // Vérifier si le dossier public_html existe
        try {
            await client.cd('public_html');
            console.log('✅ Dossier public_html trouvé !');
            
            const publicList = await client.list();
            console.log('\n📁 Contenu de public_html :');
            publicList.forEach(item => {
                console.log(`${item.type === 1 ? '📁' : '📄'} ${item.name}`);
            });
        } catch (error) {
            console.log('❌ Dossier public_html non trouvé');
            console.log('Erreur:', error.message);
        }
        
    } catch (error) {
        console.error('❌ Erreur de connexion FTP:');
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        
        if (error.code === 530) {
            console.log('\n💡 Suggestions pour l\'erreur 530 (Authentification échouée):');
            console.log('1. Vérifiez le nom d\'utilisateur et le mot de passe');
            console.log('2. Assurez-vous que le compte FTP est actif dans cPanel');
            console.log('3. Vérifiez que l\'adresse IP n\'est pas bloquée');
            console.log('4. Essayez de vous connecter avec un client FTP comme FileZilla');
        }
    } finally {
        client.close();
    }
}

// Exécuter le test si le script est appelé directement
if (require.main === module) {
    testFTPConnection().catch(console.error);
}

module.exports = { testFTPConnection };
