-- Store personalization and dynamic product categories.
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameFr" TEXT NOT NULL,
    "nameAr" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX "category_nameFr_key" ON "category"("nameFr");

-- Rebuild product because a few product display fields were previously added
-- with db push rather than a tracked migration.
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameFr" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'GENERAL',
    "categoryId" TEXT,
    "image" TEXT NOT NULL,
    "hasVariants" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "ribbonText" TEXT,
    "newUntil" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_product" ("id", "nameFr", "nameAr", "descriptionFr", "descriptionAr", "price", "type", "image", "hasVariants", "isPopular", "createdAt", "updatedAt") SELECT "id", "nameFr", "nameAr", "descriptionFr", "descriptionAr", "price", "type", "image", "hasVariants", "isPopular", "createdAt", "updatedAt" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE INDEX "product_categoryId_idx" ON "product"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- The original schema was created outside the migration history.  Create it on
-- fresh installs, then rebuild it so existing installations gain these fields.
CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "themeColor" TEXT NOT NULL DEFAULT '#F59E0B',
    "storeName" TEXT NOT NULL DEFAULT 'Aniss Électroménager',
    "logoUrl" TEXT NOT NULL DEFAULT '/aniss-logo.png',
    "phone" TEXT NOT NULL DEFAULT '+213 000 000 000',
    "adminEmail" TEXT NOT NULL DEFAULT 'admin@example.com',
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE "new_site_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "themeColor" TEXT NOT NULL DEFAULT '#F59E0B',
    "storeName" TEXT NOT NULL DEFAULT 'Aniss Électroménager',
    "logoUrl" TEXT NOT NULL DEFAULT '/aniss-logo.png',
    "phone" TEXT NOT NULL DEFAULT '+213 000 000 000',
    "adminEmail" TEXT NOT NULL DEFAULT 'admin@example.com',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_site_settings" ("id", "themeColor", "updatedAt") SELECT "id", "themeColor", "updatedAt" FROM "site_settings";
DROP TABLE "site_settings";
ALTER TABLE "new_site_settings" RENAME TO "site_settings";
