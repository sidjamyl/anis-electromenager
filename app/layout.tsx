import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { CartDrawer } from "@/components/cart-drawer";

export const metadata: Metadata = {
  title: "Aniss Électroménager",
  description: "Électroménager pour la maison, au meilleur prix.",
};

import { getSiteSettings } from "@/lib/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className="antialiased"
        style={{ '--brand-pink': settings.themeColor } as React.CSSProperties}
      >
        <LanguageProvider>
          <CartProvider>
            <Navbar settings={settings} />
            <main className="min-h-screen">{children}</main>
            <Footer settings={settings} />
            <CartDrawer />
            <Toaster />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
