import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {localeDetails} from './routing';

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!Object.keys(localeDetails).includes(locale)) notFound()

    return {
        messages: (
            await (locale === 'en'
                ? // When using Turbopack, this will enable HMR for `en`
                import('../../messages/en.json')
                : import(`../../messages/${locale}.json`))
        ).default
    };
});