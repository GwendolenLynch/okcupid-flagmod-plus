import { IProfile } from '../interfaces';

export class ImageCount {
    public static add(profile: IProfile): void {
        const container = document.getElementsByClassName('matchprofile-details')[0] as HTMLElement;

        const section = document.createElement('div');
        section.setAttribute('class', 'matchprofile-details-section');
        container.appendChild(section);

        const detailsIcon = document.createElement('div');
        detailsIcon.setAttribute('class', 'matchprofile-details-icon');
        section.appendChild(detailsIcon);

        const icon = document.createElement('img');
        icon.src = 'https://cdn.okccdn.com/media/img/questions/agree.png';
        detailsIcon.appendChild(icon);

        const detailsText = document.createElement('div');
        detailsText.setAttribute('class', 'matchprofile-details-text');
        detailsText.setAttribute('style', 'color: rgb(42, 47, 53);');
        detailsText.innerText = `${profile.photos.length} profile image(s)`;
        section.appendChild(detailsText);
    }
}
