import "./globals.css";
import {Inter} from 'next/font/google';
import {getTranslations} from "next-intl/server";
import {LocaleSwitch} from "@/components/LocaleSwitch";
import {getLocaleDetails, Link} from "@/i18n/routing";
import Image from "next/image";
import logo from "@/app/logo64.png"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({subsets: ['latin']});

export default async function I18nLayout({
                                             children,
                                             params: {locale}
                                         }: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const t = await getTranslations("layout");
    const localInfo = getLocaleDetails(locale)
    return (
        <html lang={localInfo?.code}>
        <body className={`${inter.className} bg-gradient-to-b from-gray-50 to-gray-100`}>
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <nav className="max-w-4xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex text-2xl font-bold">
                    Mahjong Titans
                    <Image src={logo.src} alt={`logo`} width={32} height={32} className="ml-2"/>
                </Link>
                {/*<ul className="flex space-x-4">*/}
                {/*  <li><a href="#" className="hover:text-gray-300">{t("nav.home")}</a></li>*/}
                {/*</ul>*/}
                <LocaleSwitch/>
            </nav>
        </header>
        <div className="max-w-4xl mx-auto px-4">
            {children}
        </div>
        <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-6">
                    <p className="mb-2">{t("footer.copyright")}</p>
                    <p className="text-sm text-gray-400">{t("footer.description")}</p>
                </div>
                <div className="flex justify-center space-x-4 items-center pt-4 border-t border-gray-700">
                    <a href="/privacy-policy"
                       className="text-sm hover:text-gray-300 transition-colors">{t("footer.privacyPolicy")}</a>
                    <a href="/terms-of-use"
                       className="text-sm hover:text-gray-300 transition-colors">{t("footer.termsOfService")}</a>
                </div>
            </div>
        </footer>
        <GoogleAnalytics gaId="G-1W6S9FSXHE" />

        </body>
        </html>
    );
}
