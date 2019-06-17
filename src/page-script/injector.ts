import { browser } from 'webextension-polyfill-ts';

export class Injector {
    public static inject(injectScript: boolean, injectStyle: boolean): void {
        const target = document.head || document.documentElement;
        if (!target) { return; }

        if (injectStyle) {
            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.href = browser.runtime.getURL('app/photo-review.css');
            target.appendChild(css);
        }

        if (injectScript) {
            const script = document.createElement('script');
            script.src = browser.runtime.getURL('app/page-script.js');
            target.appendChild(script);

            // Listener is only added to the window object, so we don't need it after it's built
            if (script.parentNode) { script.parentNode.removeChild(script); }
        }
    }
}
