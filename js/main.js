'use strict';

class FlagmodPlus {
    static load() {
        const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;
        const options = FlagmodPlusDefaults.get();
        const { buttons } = options.buttons;

        storage.sync.get(buttons, (config) => {
            fetch(chrome.runtime.getURL('html/vote-form.html'))
                .then(response => response.text())
                .then((html) => {
                    const form = FlagmodPlus.createVotingForm(html);

                    FlagmodPlus.moveComments();
                    FlagmodPlus.addButtons(config.standard, form);
                    FlagmodPlus.addButtonsCustom(config.custom, form);
                    FlagmodPlus.addEventListeners();
                    FlagmodPlus.setImageLayout();
                    FlagmodPlus.addImageSearchLinks();
                });
        });
    }

    /**
     * @param {string} html
     * @returns {HTMLElement | null}
     */
    static createVotingForm(html) {
        const userId = document.querySelector('input[name="userid"');
        const objectId = document.querySelector('input[name="objectid"');
        const form = document.getElementById('flagmodform');

        form.innerHTML = html;
        form.querySelector('input[name="userid"').value = userId.value;
        form.querySelector('input[name="objectid"').value = objectId.value;

        return form;
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

    /**
     * @param {Object} buttons
     * @param {HTMLElement} form
     * @returns {void}
     */
    static addButtons(buttons, form) {
        const div = document.getElementById('flagmod_plus_quick_vote');

        buttons.forEach((buttonConfig) => {
            FlagmodPlus.createButtonElement(buttonConfig, div);
        });
    }

    static addButtonsCustom(buttons, form) {
        const div = document.getElementById('flagmod_plus_custom_vote');
        let unhidden = false;

        buttons.forEach((buttonConfig) => {
            if (buttonConfig.enable === true) {
                unhidden = true;
                FlagmodPlus.createButtonElement(buttonConfig, div);
            }
        });
        if (unhidden) {
            document.getElementById('vote_custom').removeAttribute('hidden');
        }
    }

    /**
     * @param {Object} config
     * @param {HTMLElement} div
     * @returns {void}
     */
    static createButtonElement(config, div) {
        const button = document.createElement('button');
        const colour = FlagmodPlus.getVoteButtonColour(config.vote);

        button.setAttribute('type', 'button');
        button.setAttribute('class', `flatbutton ${colour}`);
        button.setAttribute('data-vote', config.vote);
        button.setAttribute('data-comment', config.comment);
        button.setAttribute('title', config.comment);
        button.innerText = config.label;

        div.appendChild(button);
    }

    /**
     * @param {int|string} vote
     * @returns {string}
     */
    static getVoteButtonColour(vote) {
        vote = parseInt(vote, 10);
        if (vote === 11) {
            return 'red';
        }
        if (vote === 1) {
            return 'blue';
        }

        return 'green';
    }

    static addEventListeners() {
        const buttons = document.getElementById('flagmodform').querySelectorAll('button[type="button"]');

        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const vote = event.target.getAttribute('data-vote');
                const commentInput = document.getElementById('comment');

                if (event.target.hasAttribute('data-comment')) {
                    const comment = commentInput.value ? ` ${commentInput.value}` : '';
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

        divImage.setAttribute('style', 'min-width: 530px; min-height: 530px;');
        divImage.appendChild(image);

        while (reports.hasChildNodes()) {
            if (typeof reports.firstChild.classList !== 'undefined') {
                const nodeClass = reports.firstChild.classList.value;
                if (nodeClass === 'flag_text') {
                    divImage.appendChild(reports.firstChild);
                }
                if (nodeClass === 'flag_footnote') {
                    divImage.appendChild(reports.firstChild);
                }
            }
            reports.removeChild(reports.firstChild);
        }
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
            button.setAttribute('title', `Search for this image on ${engine.name}`);

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
