import { browser } from 'webextension-polyfill-ts';
import { schema, schemaVersion } from '../options/schema';

export class FlagmodPlusInstaller {
    public static async run(): Promise<void> {
        return await browser.storage.sync.set(schema());
    }
}
