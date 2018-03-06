import { CommanderExtends } from "./extends/index";
import { existsSync, writeFileSync, openSync, writeSync, unlinkSync, closeSync } from "fs";

/**
 * Commander processing class
 *
 * @author dennigogo@gmail.com
 */
export class CommanderModule extends CommanderExtends {

    /**
     * Type of cipher - Encript/Decript
     * @type {null}
     */
    private typeCipher: null | string = null;

    /**
     *
     * @param {any} parameter
     */
    constructor(parameter: any = null) {
        super();
        this.parameter = parameter;
        this.init();
    }

    private init(): void {
        this.setTypeCipher();
        this.setTypeInput();
        this.setTypeOutput();
        this.setInputStream();
        this.setOutputStream();
        this.checkTypeInput();
        this.checkTypeOutput();
        this.setFileReadChunkModule();
    }

    /**
     * Setup cipher action type - Encript/Decript
     *
     * @return {void}
     */
    private setTypeCipher(): void {
        if (typeof this.parameter.type === 'string') {
            switch (this.parameter.type.toLowerCase()) {
                case this.getCipherTypes('encript') :
                    this.typeCipher = this.getCipherTypes('encript');
                    break;
                case this.getCipherTypes('decript') :
                    this.typeCipher = this.getCipherTypes('decript');
                    break;
                default:
                    this.typeCipher = null;
                    this.setError('noActionCipher');
                    break;
            }
        } else {
            this.typeCipher = null;
            this.setError('noActionCipher');
        }
    }

    /**
     * Return cipher action type
     *
     * @return {string}
     */
    private getTypeCipher(): string {
        return this.typeCipher;
    }

    /**
     * Checking Input stream with current type
     *
     * @return {void}
     */
    private checkTypeInput(): void {
        if (
            this.getTypeInput() === this.getStreamTypes('file')
            && false === existsSync(this.getInputStream())
        ) {
            this.setError('notExistsFilename');
        }
        if (
            this.getTypeInput() === this.getStreamTypes('string')
            && 0 >= this.getInputStream().length
        ) {
            this.setError('emptyInputStream');
        }
    }

    /**
     * Create empty file for Output stream
     *
     * @return void
     */
    private writeEmptyOutputFile(): void {
        if (typeof this.getOutputStream() === 'string' && 0 < this.getOutputStream().length) {
            if (false !== existsSync(this.getOutputStream())) {
                unlinkSync(this.getOutputStream());
            }
            writeFileSync(this.getOutputStream(), "", "utf8");
        }
    }

    /**
     * Checking type of Output stream
     *
     * @return {void}
     */
    private checkTypeOutput(): void {
        if (
            false === this.getErrorMode()
            && this.getTypeOutput() === this.getStreamTypes('file')
            && typeof this.getOutputStream() === 'string'
        ) {
            this.writeEmptyOutputFile();
        }
    }

    public executeCipher(): void {
        this.setStreamOut(null);
        switch (this.getTypeCipher()) {
            case this.getCipherTypes('encript') :
                if (this.getTypeInput() === this.getStreamTypes('file')) {
                    this.encryptFile();
                } else if (this.getTypeInput() === this.getStreamTypes('string')) {
                    this.encryptString();
                }
                break;
            case this.getCipherTypes('decript') :
                if (this.getTypeInput() === this.getStreamTypes('file')) {
                    this.decryptFile();
                } else if (this.getTypeInput() === this.getStreamTypes('string')) {
                    this.decryptString();
                }
                break;
        }
    }
}