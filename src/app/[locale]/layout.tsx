import type { Metadata } from "next";
import { Play } from "next/font/google";
import "./globals.css";

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from "@mantine/core";
import Footer from "@/common/footer/Footer";
import Header from "@/common/Header/Header";
import StoreProvider from "./StoreProvider";
import { i18nConfig } from "@/i18nConfig";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { dir } from "i18next";
import TranslationsProvider from "./TranslationsProvider";
import initTranslations from "../i18n";

const play = Play({ subsets: ['latin'], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "SpaceXplorer - Beyond the Stars™",
  description: "SpaceXplorer is a leading provider of space exploration technology and services. We are dedicated to expanding the frontiers of human space exploration and creating a future where humanity is a multi-planetary species.",
  icons: {
    icon: "/favicon_carson.ico",
  }
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const namespaces = ["Common", "specs", "home", "breadcrumb", "product", "cart", "filters", "company", "customers", "dealers", "copyright", "privacy", "casepack", "auth"];

  const { resources } = await initTranslations(locale, namespaces);

  return (
    <StoreProvider>
      <html lang={locale} dir={dir(locale)}>
        <body className={play.className}>
          <MantineProvider>
            <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
              <Header />
              <main>{children}</main>
              <Footer />
            </TranslationsProvider>
          </MantineProvider>
        </body>
      </html>
    </StoreProvider>
  );
}