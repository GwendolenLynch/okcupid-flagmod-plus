import { browser } from 'webextension-polyfill-ts';
import { RisLinks } from './ris-links';

export class VotingImage {
    public static setLayout(): void {
        const reports = document.getElementById('reports') as HTMLElement;
        const image = reports.querySelector('img') as HTMLElement;
        const figure = document.createElement('figure') as HTMLElement;

        figure.setAttribute('class', 'flagmod-plus image');
        figure.appendChild(image);

        while (reports.hasChildNodes()) {
            const child = reports.firstChild as HTMLElement;
            if (child.classList) {
                const nodeClass = child.classList.value;
                if (nodeClass === 'flag_text') {
                    figure.appendChild(child);
                }
                if (nodeClass === 'flag_footnote') {
                    figure.appendChild(child);
                }
                if (nodeClass === 'essay_type') {
                    const caption = child.nextSibling as HTMLElement;
                    figure.appendChild(child);
                    figure.appendChild(caption);
                }
            }
            try { reports.removeChild(child); } catch (e) { /**/ }
        }
        reports.appendChild(figure);
    }

    public static addRISLinks(): void {
        const reports = document.getElementById('reports') as HTMLElement;
        const image = reports.querySelector('img') as HTMLElement;
        const engines = RisLinks.get(image.getAttribute('src') as string);
        const divSearch = document.createElement('div') as HTMLElement;

        reports.insertBefore(divSearch, reports.firstChild);
        divSearch.setAttribute('class', 'flagmod-plus ris-bar');

        engines.forEach((engine) => {
            const anchor = document.createElement('a');
            const button = document.createElement('input');

            button.setAttribute('type', 'image');
            anchor.setAttribute('alt', engine.name);
            button.setAttribute('src', browser.runtime.getURL(engine.logo));
            button.setAttribute('title', `Search for this image on ${engine.name}`);

            anchor.setAttribute('href', engine.url);
            anchor.setAttribute('alt', engine.name);
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('class', 'flatbutton gray');
            anchor.appendChild(button);

            divSearch.appendChild(anchor);
        });
    }
}
