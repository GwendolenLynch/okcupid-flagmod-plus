import '../../../scss/photo-review.scss';
import { IProfile } from '../../interfaces';

import { ProfileImages } from './profile-images';

/**
 * Responsible for creating the extension's photo flagging review.
 *
 * - Existing profile content container
 *   - ViewPort
 *     - Title
 *     - Image columns
 *     - Button columns
 */
export class PhotoReview {
    public static run(profile: IProfile, token: string): void {
        const viewport = document.createElement('div');
        viewport.setAttribute('class', 'pageable-viewport');

        const pageProfile = document.getElementsByClassName('profile-content-main')[0];
        pageProfile.appendChild(viewport);

        const title = document.createElement('div');
        title.setAttribute('class', 'profilesection-title');
        title.innerText = 'FlagmodPlus Photo Review';

        viewport.appendChild(title);

        ProfileImages.create(profile, token, viewport);
    }
}
