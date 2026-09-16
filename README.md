# Aniss Électroménager

Boutique bilingue FR/AR d’électroménager, avec catalogue, panier, commandes e-mail et administration.

## Local

```bash
npm ci
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Créez un fichier `.env` :

```env
DATABASE_URL="file:./prisma/dev.db"
EMAIL_USER="votre-compte@gmail.com"
EMAIL_PASSWORD="mot-de-passe-application"
ADMIN_EMAIL="commandes@votre-domaine.com"
```

## Dokploy

Le projet se déploie directement avec le `Dockerfile`.

- Ajoutez les variables d’environnement ci-dessus dans Dokploy.
- Pour SQLite, montez un volume persistant sur `/app/data` et utilisez `DATABASE_URL=file:/app/data/aniss.db`.
- Le conteneur applique les migrations Prisma avant de démarrer Next.js sur le port `3000`.
