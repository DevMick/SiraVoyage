# Instructions de Configuration FTP pour SiraVoyage

## 🚨 Problème actuel
Le site affiche la page par défaut Namecheap au lieu de l'application SiraVoyage car les fichiers sont déployés dans le mauvais répertoire.

## 🔧 Solution 1 : Correction du workflow (TESTÉE EN PREMIER)
Le workflow a été modifié pour déployer vers la racine du compte FTP (`server-dir: /`).

## 🔧 Solution 2 : Reconfiguration du compte FTP (si Solution 1 échoue)

### Étapes dans cPanel Namecheap :

1. **Supprimer l'ancien compte FTP** :
   - Allez dans cPanel → File Manager → FTP Accounts
   - Supprimez le compte `DevMick@omrahajjabidjan.com`

2. **Créer un nouveau compte FTP** :
   - Username: `DevMick` (sans @omrahajjabidjan.com)
   - Password: [Votre mot de passe sécurisé]
   - Directory: `/public_html` (IMPORTANT!)
   - Quota: Unlimited

3. **Mettre à jour les secrets GitHub** :
   - `FTP_HOST`: `ftp.omrahajjabidjan.com`
   - `FTP_USERNAME`: `DevMick` (nouveau nom sans domaine)
   - `FTP_PASSWORD`: [Nouveau mot de passe]

## 🔧 Solution 3 : Utiliser le compte principal cPanel

### Alternative recommandée :
1. **Utiliser le compte principal cPanel** :
   - Username: [Votre nom d'utilisateur cPanel principal]
   - Password: [Votre mot de passe cPanel]
   - Directory: Automatiquement `/public_html`

2. **Mettre à jour les secrets GitHub** :
   - `FTP_HOST`: `ftp.omrahajjabidjan.com`
   - `FTP_USERNAME`: [Nom d'utilisateur cPanel principal]
   - `FTP_PASSWORD`: [Mot de passe cPanel]

## 🔍 Vérification après déploiement

### Fichiers qui doivent être présents dans `/public_html/` :
- `index.html` (page d'accueil de SiraVoyage)
- `css/` (dossier avec les styles)
- `js/` (dossier avec les scripts)
- `images/` (dossier avec les images)
- `api/` (dossier avec les données JSON)
- Autres fichiers HTML (about.html, contact.html, etc.)

### Test de vérification :
1. Visitez `https://omrahajjabidjan.com`
2. Vous devriez voir la page d'accueil AL BAYT avec le logo et le menu
3. Si vous voyez encore la page Namecheap, les fichiers ne sont pas au bon endroit

## 🚀 Ordre de test des solutions :

1. **PREMIER** : Tester avec `server-dir: /` (déjà fait)
2. **SI ÉCHEC** : Reconfigurer le compte FTP avec `/public_html`
3. **SI ÉCHEC** : Utiliser le compte cPanel principal

## 📞 Support Namecheap
Si aucune solution ne fonctionne, contactez le support Namecheap pour :
- Vérifier la configuration du domaine
- Confirmer le répertoire web racine
- Vérifier les permissions FTP
