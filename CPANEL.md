# Déploiement Octenium cPanel sans terminal

## Prérequis obligatoire

Dans **cPanel → Setup Node.js App**, le menu de version doit proposer **Node.js 20 ou 22**. Cette application utilise Next.js 16 et ne fonctionne pas avec Node.js 10 ou moins. Si Octenium ne propose que Node.js 6 à 10, contactez leur support pour Node.js 20+ ou gardez le déploiement Dokploy.

## 1. Mettre le code sur cPanel

Dans **Git Version Control**, créez un dépôt depuis `https://github.com/sidjamyl/anis-electromenager.git`, avec le chemin `anis-electromenager`.

Si le menu Git n'existe pas : téléchargez le ZIP GitHub, chargez-le dans le **File Manager**, puis utilisez **Extract**. Le dossier final doit contenir directement `package.json` et `server.js`; ne le placez pas dans `public_html`.

## 2. Créer la base

Dans **MySQL Database Wizard**, créez la base et l'utilisateur, puis cochez **ALL PRIVILEGES**. Pour ce compte :

```env
DATABASE_URL="mysql://kvcccvwd_dzshop:VOTRE_MOT_DE_PASSE_MYSQL@localhost:3306/kvcccvwd_dzshopping"
```

## 3. Créer `.env`

Dans le **File Manager**, ouvrez `anis-electromenager`, activez **Show Hidden Files**, puis créez `.env`. Collez vos valeurs de production. Les deux URLs doivent utiliser votre domaine réel, par exemple :

```env
NODE_ENV=production
BETTER_AUTH_URL="https://dz-shopping.com"
BETTER_AUTH_TRUSTED_ORIGINS="https://dz-shopping.com,https://www.dz-shopping.com"
```

Ajoutez aussi `DATABASE_URL`, `BETTER_AUTH_SECRET`, les six variables SMTP et les trois variables Cloudinary. Ne mettez pas `PORT`.

## 4. Créer l'application

Dans **Setup Node.js App → Create Application** :

- Node.js : **22** (ou 20)
- Mode : **Production**
- Application root : `anis-electromenager`
- Application URL : votre domaine
- Application startup file : `server.js`

Cliquez **Create**, puis **Run NPM Install**. Cette unique action installe les dépendances, crée les tables MySQL, ajoute les données initiales, crée l'administrateur et compile le site. Attendez la fin sans fermer la page, puis cliquez **Start App** ou **Restart**.

## 5. Vérifier

Dans **phpMyAdmin**, ouvrez `kvcccvwd_dzshopping` : les tables `user`, `product`, `category` et `site_settings` doivent exister. Ouvrez ensuite votre domaine, connectez-vous avec `admin@aniss-electromenager.com` et le mot de passe initial `admin123`, puis changez-le immédiatement.

Après une mise à jour Git, cliquez **Pull or Deploy** dans Git Version Control, puis **Run NPM Install** et **Restart** dans Setup Node.js App.
