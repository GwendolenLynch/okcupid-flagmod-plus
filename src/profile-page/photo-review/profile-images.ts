import { IProfile, IProfilePhotoMeta } from '../../interfaces';
import { ImageCount } from '../image-count';
import { Buttons } from './buttons';
import { ReportComment } from './report-comment';

/**
 * Creates a container for each image and adds to the viewport.
 *
 * - Image columns
 * - Button columns
 */
export class ProfileImages {
    public static create(profile: IProfile, token: string, viewport: HTMLElement): void {
        ImageCount.add(profile);
        profile.photos.forEach((imageMeta) => {
            if (imageMeta.info.path) {
                const columns = document.createElement('div');
                columns.setAttribute('class', 'columns is-multiline profile-essay');
                viewport.appendChild(columns);

                ProfileImages.createImage(imageMeta.info, columns);
                const input = ProfileImages.createCommentInput(imageMeta.info, profile, token, columns);
                ProfileImages.createButtons(imageMeta.info, profile, token, columns, input);
            }
        });
    }

    private static createImage(
        imageMeta: IProfilePhotoMeta,
        viewport: HTMLElement,
    ): void {
        const column = document.createElement('div');
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const img = document.createElement('img');

        viewport.appendChild(column);
        column.setAttribute('class', 'column is-full');
        column.appendChild(figure);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        figure.setAttribute('class', 'profile-essay-contents');
        figcaption.setAttribute('class', 'is-size-7 is-italic');
        figcaption.innerText = imageMeta.caption;
        img.setAttribute('src', `https://k1.okccdn.com/php/load_okc_image.php/images/${imageMeta.path}`);
    }

    private static createButtons(
        imageMeta: IProfilePhotoMeta,
        profile: IProfile,
        token: string,
        columns: HTMLElement,
        input: HTMLInputElement,
    ): void {
        const column = document.createElement('div');
        column.setAttribute('class', 'column is-full');

        columns.appendChild(column);

        Buttons.add(column, input, imageMeta.picid, profile, token);
    }

    private static createCommentInput(
        imageMeta: IProfilePhotoMeta,
        profile: IProfile,
        token: string,
        viewport: HTMLElement,
    ): HTMLInputElement {
        const column = document.createElement('div');
        column.setAttribute('class', 'column is-full');

        viewport.appendChild(column);

        return ReportComment.add(column, imageMeta.picid, profile, token);
    }
}
