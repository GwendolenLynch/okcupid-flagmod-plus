'use strict';

class FlagmodPlus {
    static load() {
        const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;
        const options = FlagmodPlusDefaults.get();
        const buttons = options.buttons;

        storage.sync.get(buttons, config => {
            fetch(chrome.runtime.getURL('html/vote-form.html'))
                .then(response => response.text())
                .then((formHtml) => {
                    FlagmodPlus.moveComments();

                    const userId = document.querySelector('input[name="userid"');
                    const objectId = document.querySelector('input[name="objectid"');
                    const form = document.getElementById('flagmodform');

                    form.innerHTML = formHtml;
                    form.querySelector('input[name="userid"').value = userId.value;
                    form.querySelector('input[name="objectid"').value = objectId.value;

                    FlagmodPlus.addButtons(config.standard, form);
                    FlagmodPlus.addButtonsCustom(config.custom, form);
                    FlagmodPlus.addEventListeners();
                    FlagmodPlus.setImageLayout();
                    FlagmodPlus.addImageSearchLinks();
                });
        });
    }

    static moveComments() {
        const leftColumn = document.getElementById('left_column');
        const rightColumn = document.getElementById('right_column');
        const reportComments = rightColumn.querySelector('ul.comments');
        const voteComments = document.getElementById('voter_comments');

        if (reportComments) {
            rightColumn.removeChild(reportComments);
            leftColumn.appendChild(reportComments);
        }

        if (voteComments) {
            rightColumn.removeChild(voteComments);
            leftColumn.appendChild(voteComments);
        }
    }

    static addButtons(buttons, form) {
        const div = document.getElementById('flagmod_plus_quick_vote');

        buttons.forEach((config) => {
            const button = document.createElement('button');

            button.setAttribute('type', 'button');
            button.setAttribute('class', `flatbutton ${config.colour}`);
            button.setAttribute('data-vote', config.vote);
            button.setAttribute('data-comment', config.comment);
            button.innerText = config.label;

            div.appendChild(button);
        });
    }

    static addButtonsCustom(buttons, form) {
        const div = document.getElementById('flagmod_plus_custom_vote');
        let unhidden = false;

        buttons.forEach((buttonConfig) => {
            if (buttonConfig.enable === true) {
                unhidden = true;

                const button = document.createElement('button');
                const colour = buttonConfig.vote === '1' ? 'blue' : 'green';

                button.setAttribute('type', 'button');
                button.setAttribute('class', `flatbutton ${colour}`);
                button.setAttribute('data-vote', buttonConfig.vote);
                button.setAttribute('data-comment', buttonConfig.comment);
                button.innerText = buttonConfig.label;

                div.appendChild(button);
            }
        });
        if (unhidden) {
            document.getElementById('vote_custom').removeAttribute('hidden');
        }
    }

    static addEventListeners() {
        const buttons = document.getElementById('flagmodform').querySelectorAll('button[type="button"]');

        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const vote = event.target.getAttribute('data-vote');
                const commentInput = document.getElementById('comment');

                if (event.target.hasAttribute('data-comment')) {
                    const comment = commentInput.value ? ' ' + commentInput.value : '';
                    commentInput.innerText = `${event.target.getAttribute('data-comment')}${comment}`;
                }
                document.getElementById('voteType').value = vote;
                document.forms.flagmodform.submit();
            });
        });
    }

    static setImageLayout() {
        const reports = document.getElementById('reports');
        const image = reports.querySelector('img');
        const divImage = document.createElement('div');

        while (reports.hasChildNodes()) {
            reports.removeChild(reports.firstChild);
        }

        divImage.setAttribute('style', 'width: 530px; height: 530px;');
        divImage.appendChild(image);
        reports.appendChild(divImage);
    }

    static addImageSearchLinks() {
        const reports = document.getElementById('reports');
        const image = reports.querySelector('img');
        const engines = FlagmodPlus.getImageSearchLinks(image.getAttribute('src'));
        const divSearch = document.createElement('div');

        reports.insertBefore(divSearch, reports.firstChild);
        divSearch.setAttribute('id', 'flagmod_plus_ris');
        divSearch.setAttribute('style', 'padding-bottom: 5px; text-align: center;');

        engines.forEach((engine) => {
            const anchor = document.createElement('a');
            const button = document.createElement('input');

            button.setAttribute('type', 'image');
            anchor.setAttribute('alt', engine.name);
            button.setAttribute('src', chrome.runtime.getURL(engine.logo));
            button.setAttribute('width', '100');
            button.setAttribute('height', '30');
            button.setAttribute('style', 'vertical-align: middle;');

            anchor.setAttribute('href', engine.url);
            anchor.setAttribute('alt', engine.name);
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('class', 'flatbutton gray');
            anchor.setAttribute('style', 'margin-right: 5px;');
            anchor.appendChild(button);

            divSearch.appendChild(anchor);
        });
    }

    static getImageSearchLinks(url) {
        return [
            {
                name: 'Google',
                url: `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${url}`,
                logo: 'images/logo-google-images.svg',
            },
            {
                name: 'TinEye',
                url: `https://tineye.com/search/?pluginver=chrome-1.2.0&url=${url}`,
                logo: 'images/logo-tineye.svg',
            },
            {
                name: 'Yandex',
                url: `https://yandex.com/images/search?rpt=imageview&img_url=${url}`,
                logo: 'images/logo-yandex.svg',
            },
        ];
    }
}

window.onload = () => {
    FlagmodPlus.load();
};
