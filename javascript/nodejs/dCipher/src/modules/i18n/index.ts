import { dirname } from "path";
import { existsSync, readFileSync } from "fs";

/**
 * I18n processing class
 *
 * @author dennigogo@gmail.com
 */
export class i18n {

    /**
     * Directory with i18n-files
     *
     * @type {null | string}
     */
    private localePath: null | string = null;

    /**
     * JSON content with i18n translations
     *
     * @type {any}
     */
    private localeContent: any = null;

    constructor(private locale: string) {
        this.init();
    }

    private init(): void {
        this.setLocalePath();
        this.setLocaleContents();
    }

    /**
     * Setup name of directory with i18n-files
     *
     * @return {void}
     */
    private setLocalePath(): void {
        let path: string;
        if ('production' == process.env.ENV) {
            path = dirname(process.mainModule.filename) + '/../javascript/nodejs/cipher/locales/';
        } else {
            path = dirname(process.mainModule.filename) + '/../locales/';
        }

        this.localePath = path;
    }

    /**
     * Return directory with i18n-files
     *
     * @return {string}
     */
    private getLocalePath(): string {
        return this.localePath;
    }

    /**
     * Read and setup contents with i18n-translates from i18n-file
     *
     * @return {void}
     */
    private setLocaleContents(): void {
        let filename: string = this.getLocalePath() + this.getLocaleName() + ".json";
        if (false !== existsSync(filename)) {
            this.localeContent = JSON.parse(readFileSync(filename, "utf8"));
        }
    }

    /**
     * Return name of locale for i18n translations
     *
     * @return {string}
     */
    private getLocaleName(): string {
        return this.locale;
    }

    /**
     * Translate input contents
     *
     * @param {string} input
     * @return {string}
     * @private
     */
    public __(input: string): string {
        let out:string = input;
        if (
            null !== this.localeContent
            && false !== this.localeContent.hasOwnProperty(input)
        ) {
            out = eval("this.localeContent." + input);
        }

        return out;
    }
}