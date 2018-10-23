/**
 * Voting replacement form.
 */
class VotingForm {
    constructor() {
        this.form = document.getElementById('flagmodform');
    }

    addListeners() {
        const buttons = this.form.querySelectorAll('button[type="button"]');

        buttons.forEach((button) => {
            button.addEventListener('click', event => this.submit(event));
        });
    }

    submit(event) {
        event.preventDefault();

        const vote = event.target.getAttribute('data-vote');
        const commentInput = document.getElementById('comment');

        if (event.target.hasAttribute('data-comment')) {
            const comment = commentInput.value ? ` ${commentInput.value}` : '';
            commentInput.innerText = `${event.target.getAttribute('data-comment')}${comment}`;
        }
        document.getElementById('voteType').value = vote;
        this.form.submit();
    }

    /**
     * @param {string} html
     * @returns {HTMLElement | null}
     */
    create(html) {
        const userId = document.querySelector('input[name="userid"');
        const objectId = document.querySelector('input[name="objectid"');

        this.form.innerHTML = html;

        document.querySelector('input[name="userid"').value = userId.value;
        document.querySelector('input[name="objectid"').value = objectId.value;

        return this.form;
    }

    /**
     * @param {Object} buttons
     * @returns {void}
     */
    addButtons(buttons) {
        const div = this.form.querySelector('#flagmod_plus_quick_vote');

        buttons.forEach((buttonConfig) => {
            VotingForm.createButton(buttonConfig, div);
        });
    }

    /**
     * @param {HTMLElement} buttons
     * @returns {void}
     */
    addButtonsCustom(buttons) {
        const div = this.form.querySelector('#flagmod_plus_custom_vote');
        let unhidden = false;

        buttons.forEach((buttonConfig) => {
            if (buttonConfig.enable === true) {
                unhidden = true;
                VotingForm.createButton(buttonConfig, div);
            }
        });
        if (unhidden) {
            this.form.querySelector('#vote_custom').removeAttribute('hidden');
        }
    }

    /**
     * @param {Object} config
     * @param {HTMLElement} div
     * @returns {void}
     */
    static createButton(config, div) {
        const button = document.createElement('button');
        const colour = VotingForm.getButtonColour(parseInt(config.vote, 10));

        button.setAttribute('type', 'button');
        button.setAttribute('class', `flatbutton ${colour}`);
        button.setAttribute('data-vote', config.vote);
        button.setAttribute('data-comment', config.comment);
        button.setAttribute('title', config.comment);
        button.innerText = config.label;

        div.appendChild(button);
    }

    /**
     * @param {int} vote
     * @returns {string}
     */
    static getButtonColour(vote) {
        if (vote === 1) return 'blue';
        if (vote === 11) return 'red';
        return 'green';
    }
}

export default VotingForm;
