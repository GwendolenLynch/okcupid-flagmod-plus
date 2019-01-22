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

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fp-icon picture');
        detailsIcon.appendChild(icon);

        const detailsText = document.createElement('div');
        const count = profile.photos[0].info.has_photos ? profile.photos.length : 0;
        detailsText.setAttribute('class', 'matchprofile-details-text');
        detailsText.setAttribute('style', 'color: rgb(42, 47, 53);');
        detailsText.innerText = `${count} profile image(s)`;
        section.appendChild(detailsText);
    }
}
