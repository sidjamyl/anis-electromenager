# Déploiement cPanel avec MySQL

Cette version utilise SQLite sur Dokploy. Pour cPanel, utilisez le schéma MySQL fourni : il n’y a aucune donnée à copier automatiquement entre les deux bases.

## 1. Créer la base

Dans **cPanel → MySQL Databases**, créez une base et un utilisateur, puis donnez à cet utilisateur **ALL PRIVILEGES** sur la base. Notez les noms complets ajoutés par cPanel, par exemple `cpuser_dzshop` et `cpuser_shop`.

## 2. Créer l’application Node.js

Dans **Setup Node.js App**, choisissez Node.js 20 ou plus, le dossier du projet comme *Application root*, `server.js` comme *Application startup file* et votre domaine comme URL. Ne placez jamais `.env` dans `public_html`.

Copiez `.env.mysql.example` vers `.env` dans la racine du projet, puis remplacez toutes les valeurs. La chaîne MySQL doit être :

```env
DATABASE_URL="mysql://UTILISATEUR:MOT_DE_PASSE@localhost:3306/NOM_BASE"
```

Encodez les caractères spéciaux du mot de passe dans cette URL (`@` devient `%40`, `#` devient `%23`, `/` devient `%2F`).

## 3. Installer et initialiser

Ouvrez le terminal cPanel dans le dossier du projet et lancez une seule fois :

```bash
npm ci --ignore-scripts
npx prisma generate --schema prisma/schema.mysql.prisma
npx prisma db push --schema prisma/schema.mysql.prisma
npm run db:seed
npm run build
```

Redémarrez ensuite l’application depuis **Setup Node.js App**. Pour une mise à jour ultérieure : `git pull`, puis les trois dernières commandes ci-dessus et redémarrez.

## Variables nécessaires

`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, les 6 variables e-mail et les 3 variables Cloudinary sont obligatoires. Gardez les secrets seulement dans cPanel, jamais dans GitHub.
