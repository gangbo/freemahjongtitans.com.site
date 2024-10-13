import React from 'react';
import Link from 'next/link';
import { getSEOTags } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export const generateMetadata = async () => {
    const t = await getTranslations('termsOfUse');
    return getSEOTags({
        title: t('title'),
        description: t('description'),
        path: '/terms-of-use',
        keywords: [],
    });
};

export default async function TermsOfUse() {
    const t = await getTranslations('termsOfUse');

    return (
        <main className="max-w-3xl mx-auto px-4 py-8">
            <div className="rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl">{t('title')}</h1>
                    <p className="mt-2 text-sm">{t('description')}</p>
                </div>

                <div className="p-6">
                    <p className="mb-6 p-4 rounded-lg">
                        {t('content.intro')}
                    </p>

                    <div className="space-y-4">
                        <ul>
                            {['usePolicy', 'noAccount', 'intellectualProperty', 'contentSource', 'liability', 'changes', 'governing'].map((item) => (
                                <li key={item} className="p-3">
                                    <p>{t(`content.${item}`)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="mb-4">{t('content.contact')}</p>
                        <Link href="/" className="inline-block py-2 px-6 rounded-full">
                            {t('layout.nav.home')}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}