import {getSEOTags} from "@/lib/seo"
import Script from 'next/script'
import FullscreenIframe from "./FullscreenIframe";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {locales} from "@/i18n/routing";

export const runtime = "edge";

// 添加动态参数类型
export const generateMetadata = async ({params: {locale}}: {params: {locale: string}}) => {
    // 设置请求的语言环境
    unstable_setRequestLocale(locale);
    
    const t = await getTranslations("home");
    return await getSEOTags({
        title: t("title"),
        path: "/",
        description: t("description"),
        keywords: t("keywords"),
    })
}

// 添加动态参数类型
export default async function Home({params: {locale}}: {params: {locale: string}}) {
    // 设置请求的语言环境
    unstable_setRequestLocale(locale);
    
    const t = await getTranslations("home")
    return (
        <main className="min-h-screen max-w-4xl mx-auto pb-20">
            <Script
                id="mahjong-titans-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "VideoGame",
                        "name": t("schemaName"),
                        "description": t("description"),
                        "genre": t("schemaGenre"),
                        "playMode": t("schemaPlayMode"),
                        "applicationCategory": t("schemaCategory"),
                        "inLanguage": [locale]
                    })
                }}
            />
            <section className="text-center mb-3">
                <h1 className="text-2xl my-3 font-bold mb-1 text-gray-800">
                    {t("h1")}
                </h1>
                <p className="text-sm mb-8 p-2">
                    {t("welcome")}
                </p>
            </section>

            <section id="play" className="bg-gray-600 p-4 rounded-xl shadow-lg mb-12">
                <FullscreenIframe
                    thumbnailSrc="/static/cover.webp"
                    src="/static/mahjong-titans/index.html"
                    title={t("h1")}
                />
            </section>

            <section className="mb-12 bg-gray-200 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">{t("features.title")}</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>{t("features.instant")}</li>
                    <li>{t("features.layouts")}</li>
                    <li>{t("features.graphics")}</li>
                    <li>{t("features.crossPlatform")}</li>
                    <li>{t("features.free")}</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t("howToPlay.title")}</h2>
                <p className="mb-4 text-gray-600">
                    {t("howToPlay.description")}
                </p>
                <a href="/#play" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                    {t("howToPlay.startButton")}
                </a>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t("tips.title")}</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>{t("tips.observe")}</li>
                    <li>{t("tips.topLayer")}</li>
                    <li>{t("tips.rareCards")}</li>
                    <li>{t("tips.balance")}</li>
                    <li>{t("tips.undo")}</li>
                    <li>{t("tips.memory")}</li>
                </ul>
            </section>
        </main>
    );
}

// 添加生成静态参数的函数
export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}