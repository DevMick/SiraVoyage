#!/usr/bin/env node

/**
 * Script de vérification pré-déploiement pour SiraVoyage
 * Vérifie que tous les fichiers et configurations sont prêts pour la production
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification pré-déploiement SiraVoyage...\n');

let errors = 0;
let warnings = 0;

function checkError(condition, message) {
    if (!condition) {
        console.log(`❌ ERREUR: ${message}`);
        errors++;
        return false;
    }
    console.log(`✅ ${message}`);
    return true;
}

function checkWarning(condition, message) {
    if (!condition) {
        console.log(`⚠️  ATTENTION: ${message}`);
        warnings++;
        return false;
    }
    console.log(`✅ ${message}`);
    return true;
}

// 1. Vérification des fichiers essentiels
console.log('📁 Vérification des fichiers essentiels:');
checkError(fs.existsSync('package.json'), 'package.json existe');
checkError(fs.existsSync('app.js'), 'app.js existe');
checkError(fs.existsSync('public/index.html'), 'public/index.html existe');
checkError(fs.existsSync('.github/workflows/deploy.yml'), 'Workflow GitHub Actions existe');
checkError(fs.existsSync('public/.htaccess'), 'Fichier .htaccess existe');

// 2. Vérification du package.json
console.log('\n📦 Vérification du package.json:');
try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    checkError(pkg.homepage === '.', 'Homepage configurée correctement');
    checkError(pkg.scripts && pkg.scripts.start, 'Script start défini');
    checkError(pkg.scripts && pkg.scripts.build, 'Script build défini');
    checkError(pkg.dependencies && pkg.dependencies.express, 'Express installé');
    checkError(pkg.dependencies && pkg.dependencies.helmet, 'Helmet installé');
    checkError(pkg.dependencies && pkg.dependencies.compression, 'Compression installée');
} catch (e) {
    checkError(false, 'package.json valide');
}

// 3. Vérification des fichiers d'environnement
console.log('\n🔧 Vérification des fichiers d\'environnement:');
checkError(fs.existsSync('.env.example'), '.env.example existe');
checkError(fs.existsSync('.env.production'), '.env.production existe');
checkWarning(!fs.existsSync('.env'), '.env local non commité (normal)');

// 4. Vérification du .gitignore
console.log('\n🚫 Vérification du .gitignore:');
if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    checkError(gitignore.includes('node_modules'), 'node_modules ignoré');
    checkError(gitignore.includes('.env'), 'Fichiers .env ignorés');
    checkError(gitignore.includes('*.log'), 'Fichiers de log ignorés');
} else {
    checkError(false, '.gitignore existe');
}

// 5. Vérification des assets CSS
console.log('\n🎨 Vérification des assets CSS:');
checkError(fs.existsSync('public/css/output.css'), 'CSS compilé existe');
checkWarning(fs.existsSync('tailwind.config.js'), 'Configuration Tailwind existe');

// 6. Vérification de la structure des données
console.log('\n📊 Vérification des données:');
if (fs.existsSync('data/formulas.json')) {
    try {
        const formulas = JSON.parse(fs.readFileSync('data/formulas.json', 'utf8'));
        checkError(formulas.formulas && Array.isArray(formulas.formulas), 'Structure des formules valide');
        checkError(formulas.formulas.length > 0, 'Au moins une formule existe');
    } catch (e) {
        checkError(false, 'data/formulas.json valide');
    }
} else {
    checkWarning(false, 'data/formulas.json existe');
}

// 7. Vérification de la sécurité
console.log('\n🔒 Vérification de la sécurité:');
checkError(fs.existsSync('SECURITY.md'), 'Guide de sécurité existe');

// Résumé final
console.log('\n' + '='.repeat(50));
console.log('📋 RÉSUMÉ DE LA VÉRIFICATION');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
    console.log('🎉 PARFAIT! Votre projet est prêt pour le déploiement!');
    process.exit(0);
} else if (errors === 0) {
    console.log(`✅ PRÊT avec ${warnings} attention(s) à considérer`);
    console.log('💡 Vous pouvez déployer, mais vérifiez les points d\'attention ci-dessus');
    process.exit(0);
} else {
    console.log(`❌ ${errors} erreur(s) et ${warnings} attention(s) trouvées`);
    console.log('🚫 Corrigez les erreurs avant de déployer!');
    process.exit(1);
}
