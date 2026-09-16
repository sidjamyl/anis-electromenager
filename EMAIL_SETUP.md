# Configuration de l'envoi d'emails avec Nodemailer

## 📧 Configuration Gmail

Pour envoyer des emails de notification de commandes, vous devez configurer un compte Gmail :

### Étapes :

1. **Activer l'authentification à 2 facteurs** sur votre compte Gmail
   - Allez sur https://myaccount.google.com/security
   - Activez la "Validation en deux étapes"

2. **Créer un mot de passe d'application**
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Autre (nom personnalisé)"
   - Entrez "Aniss Électroménager"
   - Copiez le mot de passe généré (16 caractères)

3. **Configurer les variables d'environnement**
   
   Modifiez le fichier `.env` :
   ```env
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Le mot de passe d'application (sans espaces)
   ADMIN_EMAIL=adresse-qui-recoit-les-commandes@example.com
   ```

4. **Redémarrer le serveur**
   ```bash
   npm run dev
   ```

## 🎯 Fonctionnement

Chaque fois qu'un client passe une commande :
1. La commande est créée dans la base de données
2. **Un email est automatiquement envoyé à `ADMIN_EMAIL`** avec :
   - Numéro de commande
   - Informations du client
   - Détails des produits
   - Total de la commande

## 🎨 Template d'email

L'email envoyé est au format HTML avec :
- Design aux couleurs de la marque
- Tableau détaillé des produits
- Informations complètes du client
- Résumé financier

## 🔧 Autres fournisseurs d'email

Si vous voulez utiliser un autre service que Gmail, modifiez dans `lib/utils/email.ts` :

### Outlook/Hotmail
```typescript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
```

### Yahoo
```typescript
const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
```

### Serveur SMTP personnalisé
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.votredomaine.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
```

## ⚠️ Dépannage

### L'email ne part pas
- Vérifiez que `EMAIL_USER` et `EMAIL_PASSWORD` sont correctement configurés
- Vérifiez que vous utilisez un mot de passe d'application (pas votre mot de passe Gmail)
- Vérifiez les logs du serveur pour voir les erreurs

### Emails dans les spams
- Utilisez un domaine personnalisé au lieu de Gmail
- Configurez SPF, DKIM et DMARC pour votre domaine
- Demandez au destinataire de marquer comme "pas spam"

## 📝 Notes

- L'envoi d'email n'empêche pas la création de commande (même si l'email échoue)
- Les erreurs d'email sont loggées dans la console
- La commande reste enregistrée localement, même si l’e-mail échoue.
