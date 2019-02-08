import { browser } from 'webextension-polyfill-ts';

import { schema, schemaVersion } from '../options/schema';
import { IOptions, IProfileOptions, IVoteOptions } from '../options/schema-interfaces';

interface IOptionsLegacy extends IOptions {
    buttons: {
        standard: IVoteOptions[],
        custom: IVoteOptions[],
    };
}
interface IVoteOptionsLegacy extends IVoteOptions {
    key: string;
}

export class FlagmodPlusUpdater {
    public static addListeners(): void {
        browser.runtime.onInstalled.addListener((details) => FlagmodPlusUpdater.updateSchema);
    }

    /**
     * Update options schema.
     */
    public static async updateSchema(): Promise<void> {
        const stored = await browser.storage.sync.get(null) as IOptionsLegacy;
        if (!stored.settings_schema) { return FlagmodPlusUpdater.install(); }

        const currentVersion = Number(stored.settings_schema);
        if (currentVersion >= schemaVersion) { return; }

        if (currentVersion <= 1) { await FlagmodPlusUpdater.updateV1(); }
        if (currentVersion < 2) { await FlagmodPlusUpdater.updateV2(); }
    }

    private static async install(): Promise<void> {
        return await browser.storage.sync.set(schema());
    }

    /**
     * Fix incorrect schema before v0.9.5
     */
    private static async updateV1(): Promise<void> {
        const stored = await browser.storage.sync.get(null);
        if (typeof stored.buttons === 'undefined' && stored.standard !== 'undefined') {
            stored.settings_schema = 1;
            stored.buttons = stored;

            await browser.storage.sync.remove(['standard', 'custom']);
            await browser.storage.sync.set(stored);
        }
    }

    private static async updateV2(): Promise<void> {
        const stored = await browser.storage.sync.get(null) as IOptionsLegacy;
        const pending = schema();

        const storedStandard = stored.buttons.standard as IVoteOptionsLegacy[];

        if (storedStandard && Array.isArray(storedStandard)) {
            pending.voting.standard.forEach((pendingVote: IVoteOptions, index: number) => {
                storedStandard.forEach((savedVote: IVoteOptionsLegacy) => {
                    if (
                        (savedVote.key === `comment-${pendingVote.name}`) ||
                        (savedVote.key === 'comment-nv-la' && pendingVote.name === 'nv') ||
                        (savedVote.key === 'comment-scammer' && pendingVote.name === 'sg')
                    ) {
                        pendingVote.abbr = savedVote.abbr;
                        delete storedStandard[index];
                    }
                });
            });
        }

        const storedCustom = stored.buttons.custom as IVoteOptions[];
        if (storedCustom && Array.isArray(storedCustom)) {
            storedCustom.forEach((savedVote: IVoteOptions) => {
                const customVotes = pending.voting.custom as IVoteOptions[];
                if (savedVote.comment) {
                    // tslint:disable:object-literal-sort-keys
                    customVotes.push({
                        name: String(customVotes.length),
                        abbr: savedVote.abbr,
                        label: savedVote.label,
                        comment: savedVote.comment,
                        vote: savedVote.vote,
                        enable: savedVote.enable,
                    });
                }
            });
        }

        const storedProfile = stored.profile as IProfileOptions;
        if (storedProfile) {
            if (storedProfile.last_login) { pending.profile.last_login = storedProfile.last_login; }
            if (storedProfile.review_panel) { pending.profile.review_panel = storedProfile.review_panel; }
        }

        await browser.storage.sync.set(pending);
        await browser.storage.sync.remove('buttons');
    }
}
