interface IRisLink {
    name: string;
    url: string;
    logo: string;
}

export class RisLinks {
    public static get(url: string): IRisLink[] {
        return [
            {
                logo: 'images/logo-google-images.svg',
                name: 'Google',
                url: `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${url}`,
            },
            {
                logo: 'images/logo-tineye.svg',
                name: 'TinEye',
                url: `https://tineye.com/search/?pluginver=chrome-1.2.0&url=${url}`,
            },
            {
                logo: 'images/logo-yandex.svg',
                name: 'Yandex',
                url: `https://yandex.com/images/search?rpt=imageview&img_url=${url}`,
            },
        ];
    }
}
