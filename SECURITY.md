# Guide de Sécurité - SiraVoyage

## Variables d'environnement sensibles à configurer dans GitHub Secrets

### Obligatoires pour le déploiement
- `FTP_HOST` : Adresse du serveur FTP Namecheap
- `FTP_USERNAME` : Nom d'utilisateur FTP
- `FTP_PASSWORD` : Mot de passe FTP

### Recommandées pour la production
- `JWT_SECRET` : Clé secrète pour les tokens JWT (32+ caractères aléatoires)
- `SESSION_SECRET` : Clé secrète pour les sessions (32+ caractères aléatoires)
- `SMTP_USER` : Email pour l'envoi de mails
- `SMTP_PASSWORD` : Mot de passe email ou app password
- `GOOGLE_MAPS_API_KEY` : Clé API Google Maps (si utilisée)
- `PAYMENT_API_KEY` : Clé API de paiement (si utilisée)
- `ANALYTICS_ID` : ID Google Analytics

### Configuration des secrets dans GitHub

1. Allez dans votre repository GitHub
2. Settings → Secrets and variables → Actions
3. Cliquez sur "New repository secret"
4. Ajoutez chaque secret avec sa valeur

## Checklist de sécurité avant déploiement

### ✅ Fichiers sensibles
- [ ] Aucun fichier `.env` n'est commité
- [ ] Les mots de passe ne sont pas en dur dans le code
- [ ] Le `.gitignore` exclut tous les fichiers sensibles
- [ ] Les clés API sont dans les variables d'environnement

### ✅ Configuration serveur
- [ ] Helmet.js configuré pour la sécurité
- [ ] CORS configuré correctement
- [ ] HTTPS forcé en production
- [ ] Headers de sécurité configurés

### ✅ Validation des données
- [ ] Validation des entrées utilisateur
- [ ] Limitation de taille des uploads
- [ ] Sanitisation des données

### ✅ Monitoring
- [ ] Logs configurés
- [ ] Monitoring des erreurs
- [ ] Alertes de sécurité

## Bonnes pratiques

1. **Mots de passe forts** : Utilisez des générateurs de mots de passe
2. **Rotation des clés** : Changez régulièrement les clés API
3. **Principe du moindre privilège** : Accordez uniquement les permissions nécessaires
4. **Mise à jour** : Maintenez les dépendances à jour
5. **Backup** : Sauvegardez régulièrement les données

## En cas de compromission

1. Changez immédiatement tous les mots de passe
2. Révoquez les clés API compromises
3. Vérifiez les logs pour détecter les activités suspectes
4. Mettez à jour tous les secrets GitHub
5. Redéployez l'application
