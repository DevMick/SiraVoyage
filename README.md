# SiraVoyage - AL BAYT

🕌 Site web professionnel pour les voyages Omra et Hajj

[![Déploiement](https://github.com/DevMick/SiraVoyage/actions/workflows/deploy.yml/badge.svg)](https://github.com/DevMick/SiraVoyage/actions/workflows/deploy.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌟 Fonctionnalités

- ✈️ Catalogue de formules Omra et Hajj
- 🏨 Présentation des hébergements et services
- 📱 Design responsive et moderne
- 🔒 Sécurisé avec Helmet.js
- ⚡ Optimisé pour les performances
- 🚀 Déploiement automatique via GitHub Actions

## 🛠️ Technologies utilisées

- **Backend** : Node.js, Express.js
- **Frontend** : HTML5, CSS3, JavaScript, Tailwind CSS
- **Sécurité** : Helmet.js, CORS
- **Performance** : Compression GZIP, Cache optimisé
- **Déploiement** : GitHub Actions, FTP vers Namecheap

## 📋 Prérequis

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

## 🚀 Installation locale

### 1. Cloner le repository
```bash
git clone https://github.com/DevMick/SiraVoyage.git
cd SiraVoyage
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos valeurs
nano .env
```

### 4. Construire les assets CSS
```bash
npm run build:css
```

### 5. Démarrer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 🌐 Déploiement en production

### Configuration des secrets GitHub

1. Allez dans **Settings** → **Secrets and variables** → **Actions**
2. Ajoutez les secrets suivants :

#### Obligatoires
- `FTP_HOST` : Adresse du serveur FTP Namecheap
- `FTP_USERNAME` : Nom d'utilisateur FTP
- `FTP_PASSWORD` : Mot de passe FTP

#### Optionnels (pour fonctionnalités avancées)
- `SMTP_USER` : Email pour l'envoi de mails
- `SMTP_PASSWORD` : Mot de passe email
- `GOOGLE_MAPS_API_KEY` : Clé API Google Maps
- `ANALYTICS_ID` : ID Google Analytics

### Déploiement automatique

Le déploiement se fait automatiquement à chaque push sur la branche `main` :

```bash
# Ajouter tous les fichiers
git add .

# Commiter les changements
git commit -m "Configure production deployment"

# Pousser vers GitHub (déclenche le déploiement)
git push origin main
```

## 📁 Structure du projet

```
SiraVoyage/
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml        # Configuration de déploiement
├── public/               # Fichiers statiques
│   ├── css/             # Styles CSS
│   ├── js/              # Scripts JavaScript
│   ├── images/          # Images et assets
│   ├── index.html       # Page d'accueil
│   └── .htaccess        # Configuration Apache
├── routes/              # Routes API
│   └── api.js           # API REST pour les formules
├── data/                # Données JSON
│   └── formulas.json    # Base de données des formules
├── models/              # Modèles de données
├── app.js               # Serveur principal Express
├── package.json         # Dépendances et scripts
├── .env.example         # Variables d'environnement exemple
├── .env.production      # Variables de production
├── .gitignore          # Fichiers à ignorer
├── SECURITY.md         # Guide de sécurité
└── README.md           # Documentation
```

## 🔧 Scripts disponibles

- `npm start` : Démarre le serveur en production
- `npm run dev` : Démarre le serveur en mode développement avec nodemon
- `npm run build` : Construit les assets pour la production
- `npm run build:css` : Compile et minifie le CSS avec Tailwind

## 🌍 Variables d'environnement

### Développement (.env)
```env
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
```

### Production (.env.production)
```env
NODE_ENV=production
PORT=3000
SITE_URL=https://omrahajjabidjan.com
```

## 🔒 Sécurité

- Headers de sécurité avec Helmet.js
- Protection CORS configurée
- Validation des entrées utilisateur
- Fichiers sensibles exclus du versioning
- HTTPS forcé en production

Consultez [SECURITY.md](SECURITY.md) pour plus de détails.

## 🚨 Dépannage

### Erreur de build CSS
```bash
npm install tailwindcss --save-dev
npm run build:css
```

### Erreur de déploiement FTP
1. Vérifiez les secrets GitHub (FTP_HOST, FTP_USERNAME, FTP_PASSWORD)
2. Vérifiez que le dossier de destination existe sur le serveur
3. Consultez les logs GitHub Actions

### Site inaccessible après déploiement
1. Vérifiez que les fichiers sont bien uploadés dans `/public_html/`
2. Vérifiez les permissions des fichiers (644 pour les fichiers, 755 pour les dossiers)
3. Vérifiez le fichier `.htaccess`

## 📞 Support

- **Site web** : [omrahajjabidjan.com](https://omrahajjabidjan.com)
- **Repository** : [GitHub](https://github.com/DevMick/SiraVoyage)
- **Issues** : [GitHub Issues](https://github.com/DevMick/SiraVoyage/issues)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ pour AL BAYT - SiraVoyage**