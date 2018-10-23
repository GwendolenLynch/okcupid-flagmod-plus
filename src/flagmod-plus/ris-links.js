class RisLinks {
    static get(url) {
        return [
            {
                name: 'Google',
                url: `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${url}`,
                logo: 'images/logo-google-images.svg',
            },
            {
                name: 'TinEye',
                url: `https://tineye.com/search/?pluginver=chrome-1.2.0&url=${url}`,
                logo: 'images/logo-tineye.svg',
            },
            {
                name: 'Yandex',
                url: `https://yandex.com/images/search?rpt=imageview&img_url=${url}`,
                logo: 'images/logo-yandex.svg',
            },
        ];
    }
}

export default RisLinks;
