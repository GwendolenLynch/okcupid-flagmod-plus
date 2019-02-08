import { browser } from 'webextension-polyfill-ts';
import { RisLinks } from './ris-links';

export class VotingImage {
    public static setLayout(): void {
        const reports = document.getElementById('reports') as HTMLElement;
        const image = reports.querySelector('img') as HTMLElement;
        const divImage = document.createElement('div') as HTMLElement;

        divImage.setAttribute('style', 'min-width: 530px; min-height: 530px;');
        divImage.appendChild(image);

        while (reports.hasChildNodes()) {
            const child = reports.firstChild as HTMLElement;
            if (child.classList) {
                const nodeClass = child.classList.value;
                if (nodeClass === 'flag_text') {
                    divImage.appendChild(child);
                }
                if (nodeClass === 'flag_footnote') {
                    divImage.appendChild(child);
                }
                if (nodeClass === 'essay_type') {
                    const caption = child.nextSibling as HTMLElement;
                    divImage.appendChild(child);
                    divImage.appendChild(caption);
                }
            }
            try { reports.removeChild(child); } catch (e) { /**/ }
        }
        reports.appendChild(divImage);
    }

    public static addRISLinks(): void {
        const reports = document.getElementById('reports') as HTMLElement;
        const image = reports.querySelector('img') as HTMLElement;
        const engines = RisLinks.get(image.getAttribute('src') as string);
        const divSearch = document.createElement('div') as HTMLElement;

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
