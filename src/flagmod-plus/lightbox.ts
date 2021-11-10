import { LuminousGallery } from 'luminous-lightbox';
import 'luminous-lightbox/dist/luminous-basic.css';

export class Lightbox {
    public static activate() {
        new LuminousGallery(document.querySelectorAll("#user_images a"));
    }
}
