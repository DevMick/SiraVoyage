# Test des Chemins de Déploiement - SiraVoyage

## 🎯 Objectif
Trouver le bon chemin `server-dir` pour que l'application React s'affiche sur omrahajjabidjan.com

## 🔍 Chemins à tester (dans l'ordre)

### Test 1 : `/public_html/` (EN COURS)
```yaml
server-dir: /public_html/
```
**Résultat attendu** : Fichiers dans le répertoire web principal
**Status** : 🔄 En test

### Test 2 : `./public_html/` (si Test 1 échoue)
```yaml
server-dir: ./public_html/
```
**Résultat attendu** : Répertoire relatif depuis la racine du compte FTP

### Test 3 : `../public_html/` (si Test 2 échoue)
```yaml
server-dir: ../public_html/
```
**Résultat attendu** : Répertoire parent puis public_html

### Test 4 : `../../public_html/` (si Test 3 échoue)
```yaml
server-dir: ../../public_html/
```
**Résultat attendu** : Deux niveaux au-dessus puis public_html

### Test 5 : `/home/omrapvkf/public_html/` (chemin absolu)
```yaml
server-dir: /home/omrapvkf/public_html/
```
**Résultat attendu** : Chemin absolu vers le répertoire web

## 📊 Diagnostic avec les logs FTP

Le workflow inclut maintenant :
1. **Test de connexion FTP** avec `lftp`
2. **Exploration des répertoires** disponibles
3. **Vérification de l'existence** de `public_html`
4. **Listage du contenu** pour comprendre la structure

## 🔧 Comment modifier le chemin

Si le test actuel échoue, modifiez cette ligne dans `.github/workflows/deploy.yml` :
```yaml
server-dir: /public_html/  # ← Changer cette valeur
```

## ✅ Critères de succès

Le test réussit quand :
1. ✅ Le déploiement GitHub Actions se termine sans erreur
2. ✅ https://omrahajjabidjan.com affiche l'application SiraVoyage
3. ✅ La page d'accueil AL BAYT est visible
4. ❌ Plus de page par défaut Namecheap

## 🚨 Si tous les tests échouent

Alternatives à considérer :
1. **Utiliser le compte cPanel principal**
2. **Recréer le compte FTP** avec le bon répertoire
3. **Contacter le support Namecheap** pour vérifier la configuration

## 📝 Notes de test

- **Test 1** (`/public_html/`) : [À compléter après déploiement]
- **Logs FTP** : [À analyser après exécution]
- **Structure découverte** : [À documenter]
