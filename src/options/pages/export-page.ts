import 'highlight.js/styles/github.css';

import hljs from 'highlight.js/lib/highlight';
import json from 'highlight.js/lib/languages/json';
import { browser } from 'webextension-polyfill-ts';

export class ExportPage {
    public static async render(): Promise<void> {
        const content = document.getElementById('tab-content-backup-export');
        if (!content) { return; }
        content.innerText = '';
        const code = document.createElement('code');
        const pre = document.createElement('pre');

        content.appendChild(pre);
        pre.appendChild(code);

        const options = await browser.storage.sync.get();
        code.innerText = JSON.stringify(options, null, 4);
        code.className = 'json';

        // tslint:disable:no-unsafe-any
        hljs.registerLanguage('json', json);
        hljs.highlightBlock(code);
    }
}
