import browser from 'webextension-polyfill';
import RisLinks from './ris-links';

class VotingImage {
    static setLayout() {
        const reports = document.getElementById('reports');
        const image = reports.querySelector('img');
        const divImage = document.createElement('div');

        divImage.setAttribute('style', 'min-width: 530px; min-height: 530px;');
        divImage.appendChild(image);

        while (reports.hasChildNodes()) {
            if (typeof reports.firstChild.classList !== 'undefined') {
                const nodeClass = reports.firstChild.classList.value;
                if (nodeClass === 'flag_text') {
                    divImage.appendChild(reports.firstChild);
                }
                if (nodeClass === 'flag_footnote') {
                    divImage.appendChild(reports.firstChild);
                }
                if (nodeClass === 'essay_type') {
                    const caption = reports.firstChild.nextSibling;
                    divImage.appendChild(reports.firstChild);
                    divImage.appendChild(caption);
                }
            }
            reports.removeChild(reports.firstChild);
        }
        reports.appendChild(divImage);
    }

    static addRISLinks() {
        const reports = document.getElementById('reports');
        const image = reports.querySelector('img');
        const engines = RisLinks.get(image.getAttribute('src'));
        const divSearch = document.createElement('div');

        reports.insertBefore(divSearch, reports.firstChild);
        divSearch.setAttribute('id', 'flagmod_plus_ris');
        divSearch.setAttribute('style', 'padding-bottom: 5px; text-align: center;');

        engines.forEach((engine) => {
            const anchor = document.createElement('a');
            const button = document.createElement('input');

            button.setAttribute('type', 'image');
            anchor.setAttribute('alt', engine.name);
            button.setAttribute('src', browser.runtime.getURL(engine.logo));
            button.setAttribute('width', '100');
            button.setAttribute('height', '30');
            button.setAttribute('style', 'vertical-align: middle;');
            button.setAttribute('title', `Search for this image on ${engine.name}`);

            anchor.setAttribute('href', engine.url);
            anchor.setAttribute('alt', engine.name);
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('class', 'flatbutton gray');
            anchor.setAttribute('style', 'margin-right: 5px;');
            anchor.appendChild(button);

            divSearch.appendChild(anchor);
        });
    }
}

export default VotingImage;
