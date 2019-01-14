import browser from 'webextension-polyfill';

export class PageScriptInjector {
    public static inject(): void {
        const target = document.head || document.documentElement;
        if (!target) { return; }
        const script = document.createElement('script');
        const css = document.createElement('link');

        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.href = browser.extension.getURL('app/photo-review.css');
        script.src = browser.extension.getURL('app/page-script.js');

        target.appendChild(css);
        target.appendChild(script);

        // Listener is only added to the window object, so we don't need it after it's built
        if (script.parentNode) { script.parentNode.removeChild(script); }
    }
}
