import { browser } from 'webextension-polyfill-ts';

import { schema, schemaVersion } from '../options/schema';
import { IOptions, IProfileOptions, IVoteOptions } from '../options/schema-interfaces';
import OnInstalledReason = browser.runtime.OnInstalledReason;
import { FlagmodPlusInstaller } from './installer';

// tslint:disable:interface-name
interface OnInstalledDetailsType {
    reason: OnInstalledReason;
    temporary: boolean;
    previousVersionOptional?: string;
}

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
        browser.runtime.onInstalled.addListener((details: OnInstalledDetailsType) => {
            FlagmodPlusUpdater.updateSchema(details);
        });
    }

    /**
     * Update options schema.
     */
    public static async updateSchema(details: OnInstalledDetailsType): Promise<void> {
        const stored = await browser.storage.sync.get(null) as IOptionsLegacy;
        if (!stored.settings_schema) { return FlagmodPlusInstaller.run(); }

        const currentVersion = Number(stored.settings_schema);
        if (currentVersion >= schemaVersion) { return; }

        if (!currentVersion) { return await browser.storage.sync.set(schema()); }
        if (currentVersion <= 1) { await FlagmodPlusUpdater.updateV1(); }
        if (currentVersion <= 2) { await FlagmodPlusUpdater.updateV2(); }
        if (currentVersion <= 3) { await FlagmodPlusUpdater.updateV3(); }
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
                        (savedVote.key === 'comment-scammer' && pendingVote.name === 'fake') ||
                        (savedVote.key === 'comment-bot' && pendingVote.name === 'fake')
                    ) {
                        pendingVote.abbr = savedVote.abbr || pendingVote.abbr;
                        pendingVote.comment = savedVote.comment || pendingVote.comment;
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
                        report: savedVote.report,
                        enable: savedVote.enable,
                    });
                }
            });
        }

        const storedProfile = stored.profile as IProfileOptions;
        if (storedProfile) {
            if (storedProfile.review_panel) { pending.profile.review_panel = storedProfile.review_panel; }
        }

        await browser.storage.sync.set(pending);
        await browser.storage.sync.remove('buttons');
    }

    private static async updateV3(): Promise<void> {
        const stored = await browser.storage.sync.get(null) as IOptionsLegacy;

        const storedStandard = stored.voting.standard as IVoteOptions[];
        if (storedStandard && Array.isArray(storedStandard)) {
            storedStandard.forEach((savedVote: IVoteOptions) => {
                if (savedVote.name === 'unr') {
                    savedVote.name = 'nf';
                    savedVote.abbr = 'NF';
                    savedVote.label = 'No Face';
                    if (savedVote.comment === 'UNR') {
                        savedVote.comment = 'NF';
                    }
                }
            });

            stored.voting.standard = storedStandard;
            stored.settings_schema = 4;
            await browser.storage.sync.set(stored);
        }
    }
}
