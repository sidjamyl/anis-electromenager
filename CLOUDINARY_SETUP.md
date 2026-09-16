# Configuration Cloudinary - Guide Complet

## 📋 Étapes de Configuration

### 1. Créer un compte Cloudinary

1. Allez sur [cloudinary.com](https://cloudinary.com)
2. Créez un compte gratuit (donne 25 crédits/mois)
3. Une fois connecté, allez dans **Dashboard**

### 2. Récupérer vos identifiants

Dans le Dashboard Cloudinary, vous trouverez :
- **Cloud Name** : Votre nom de cloud unique
- **API Key** : Votre clé API
- **API Secret** : Votre secret API (cliquez sur "Reveal" pour le voir)

### 3. Configurer les variables d'environnement

Créez ou modifiez votre fichier `.env` à la racine du projet :

```env
# Database
DATABASE_URL="file:./dev.db"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary - REMPLACEZ PAR VOS VRAIES VALEURS
CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"

```

⚠️ **IMPORTANT** : Ajoutez `.env` dans votre `.gitignore` pour ne pas publier vos secrets !

### 4. Fichiers créés

Les fichiers suivants ont été créés automatiquement :

#### 📁 `lib/cloudinary.ts`
Configuration Cloudinary avec fonction d'upload

#### 📁 `app/api/upload/route.ts`
API endpoint pour uploader les images :
- `POST /api/upload` : Upload une image vers Cloudinary
- `DELETE /api/upload` : Supprime une image de Cloudinary

#### 📁 `lib/prisma.ts`
Client Prisma singleton pour éviter les connexions multiples

#### 📁 `.env.example`
Exemple de fichier d'environnement (à partager avec l'équipe)

### 5. Modifications du code

#### Dans `app/admin/page.tsx` :
- Ajout du state `uploadingImage`
- Nouvelle fonction `handleImageUpload()` pour gérer l'upload
- Interface améliorée avec :
  - Zone de drag & drop pour uploader
  - Aperçu de l'image
  - Bouton de suppression
  - Option manuelle pour entrer une URL

## 🚀 Utilisation

### Pour uploader une image :

1. Allez dans l'admin panel (`/admin`)
2. Créez ou modifiez un produit
3. Dans la section "Image du produit" :
   - **Option 1** : Cliquez sur la zone d'upload et sélectionnez une image depuis votre ordinateur
   - **Option 2** : Entrez manuellement une URL d'image

### L'upload fait automatiquement :
- ✅ Vérification du type de fichier (images uniquement)
- ✅ Vérification de la taille (max 5MB)
- ✅ Upload vers Cloudinary
- ✅ Stockage de l'URL sécurisée dans la base de données
- ✅ Affichage d'un aperçu

### Organisation dans Cloudinary :
Toutes les images sont stockées dans le dossier `aniss_electromenager` sur votre compte Cloudinary.

## 🔒 Sécurité

- ✅ Vérification de l'authentification (admin uniquement)
- ✅ Validation du type et taille de fichier
- ✅ API secrets stockés dans `.env` (non versionnés)
- ✅ Upload sécurisé via API backend

## 🎨 Avantages de Cloudinary

1. **Optimisation automatique** : Les images sont optimisées automatiquement
2. **CDN global** : Chargement rapide partout dans le monde
3. **Transformations** : Possibilité de redimensionner les images à la volée
4. **Gratuit** : 25 crédits/mois suffisent pour un site moyen

## 🔧 Dépannage

### Erreur "Cloudinary credentials not found"
➡️ Vérifiez que votre `.env` contient bien les 3 variables Cloudinary

### Erreur "Unauthorized"
➡️ Vérifiez que vous êtes connecté en tant qu'admin

### Image trop grande
➡️ La limite est 5MB. Compressez votre image avant l'upload

### L'upload ne fonctionne pas
➡️ Vérifiez dans la console du navigateur (F12) pour voir les erreurs

## 📝 Prochaines étapes recommandées

1. Testez l'upload avec une image
2. Vérifiez dans votre Dashboard Cloudinary que l'image apparaît
3. Créez un produit avec cette image
4. Testez sur la page catalogue

## 🆘 Support

Si vous avez des problèmes :
1. Vérifiez les logs dans la console
2. Vérifiez que `npm install cloudinary` a bien été exécuté
3. Redémarrez le serveur de dev après avoir modifié `.env`
