import { i18n } from "./../../../modules/i18n/index";
import { CryptoModule } from './../../../modules/crypto/index';
import { TypesModule } from './../../../modules/types/index';
import { FileReadChunkModule } from "./../../fsystem/fileChunkRead";
import { closeSync, existsSync, openSync, writeSync, unlinkSync, appendFileSync, readFileSync, readFile,createReadStream } from "fs";

/**
 * Commander processing class
 *
 * @author dennigogo@gmail.com
 */
export class CommanderExtends extends TypesModule {

    /**
     * @type {any}
     */
    protected parameter: any = null;

    /**
     * Default locale with i18n module
     *
     * @type {string}
     */
    private defaultLocale: string = "en";

    /**
     * I18n instance
     *
     * @type {null | i18n}
     */
    private i18n: null | i18n = null;

    /**
     * CryptoModule instance
     *
     * @type {null | CryptoModule}
     */
    private crypto: null | CryptoModule = null;

    /**
     * FileReadChunkModule class
     * @type {null | FileReadChunkModule}
     */
    private fileReadChunkModule: null | FileReadChunkModule = null;

    /**
     * Type of output stream - String/File
     * @type {string}
     */
    private typeOutput: string = this.getStreamTypes('string');

    /**
     * Content of output stream - String - as is; File - filename; Stream - null
     * @type {null | string | object}
     */
    private streamOut: null | string | object = null;

    /**
     * Output stream - String/Filename
     * @type {string}
     */
    private output: string = "";

    /**
     * Type of input stream - String/File
     * @type {string}
     */
    private typeInput: string = this.getStreamTypes('string');

    /**
     * Input stream - String/Filename
     * @type {string}
     */
    private input: string = "";

    constructor() {
        super();
        this.i18n = new i18n(this.getDefaultLocale());
        this.crypto = new CryptoModule();
    }

    /**
     * Result code
     * @type {number}
     */
    private codeOut: number = 200;

    /**
     * Content of error message
     * @type {string[]}
     */
    private errorOut: string[] = [];

    /**
     * Errors flag
     * @type {boolean}
     */
    private error: boolean = false;

    /**
     * Return default locale
     *
     * @return {string}
     */
    private getDefaultLocale(): string {
        return this.defaultLocale;
    }

    /**
     * Registered error event
     *
     * @param {string} input
     */
    protected setError(input: string) {
        this.enableErrorMode();
        this.setErrorCode();
        this.setErrorMessage(input);
    }

    /**
     * Registered error state
     *
     * @return void
     */
    private enableErrorMode(): void {
        this.error = true;
    }

    /**
     * Reset error state
     *
     * @return {void}
     */
    protected resetErrorMode(): void {
        this.error = false;
    }

    /**
     * Return check errors state
     *
     * @return {boolean}
     */
    public getErrorMode(): boolean {
        return this.error;
    }

    /**
     * Setup status code as 404
     *
     * @return {number}
     */
    private setErrorCode(): void {
        this.codeOut = 404;
    }

    /**
     * Setup status code as 200
     *
     * @return {number}
     */
    protected setOkCode(): void {
        this.codeOut = 200;
    }

    /**
     * Return status code
     *
     * @return {number}
     */
    public getOutCode(): number {
        return this.codeOut;
    }

    /**
     * Registration error messages
     *
     * @param {string} input
     */
    private setErrorMessage(input: string): void {
        this.errorOut.push(this.i18n.__(input));
    }

    /**
     * Return error messages
     *
     * @return {string[]}
     */
    public getErrorMessages(): string[] {
        return this.errorOut;
    }

    /**
     * Return CryptoModule instance
     *
     * @return {CryptoModule}
     */
    protected getCrypto(): CryptoModule {
        return this.crypto;
    }

    /**
     * Setup FileReadChunkModule class
     *
     * @return {void}
     */
    protected setFileReadChunkModule(): void {
        this.fileReadChunkModule = new FileReadChunkModule();
    }

    /**
     * Return FileReadChunkModule class
     *
     * @return {FileReadChunkModule | null}
     */
    protected getFileReadChunkModule(): null | FileReadChunkModule {
        return this.fileReadChunkModule;
    }

    /**
     * Setup type of Output stream
     *
     * @return {void}
     */
    protected setTypeOutput(): void {
        if (typeof this.parameter.typeOutput === 'string') {
            switch (this.parameter.typeOutput.toLowerCase()) {
                case this.getStreamTypes('file') :
                    this.typeOutput = this.getStreamTypes('file');
                    break;
                case this.getStreamTypes('stream') :
                    this.typeOutput = this.getStreamTypes('stream');
                    break;
                default:
                    this.typeOutput = this.getStreamTypes('string');
                    break;
            }
        }
    }

    /**
     * Return type of Output stream
     *
     * @return {string}
     */
    public getTypeOutput(): string {
        return this.typeOutput.toLowerCase();
    }

    /**
     * Setup Output stream
     *
     * @return {void}
     */
    protected setOutputStream(): void {
        if (typeof this.parameter.input === 'string') {
            this.output = this.parameter.output;
        }
    }

    /**
     * Return Output stream
     *
     * @return {string}
     */
    protected getOutputStream(): string {
        return this.output;
    }

    /**
     * Setup Output stream
     *
     * @param {string | object} input
     * @return {void}
     */
    protected setStreamOut(input: string | object): void {
        this.streamOut = input;
    }

    /**
     * Return Output stream
     *
     * @return {string | object | null}
     */
    public getStreamOut(): null | string | object {
        return this.streamOut;
    }

    /**
     * Setup type of Input stream
     *
     * @return {void}
     */
    protected setTypeInput(): void {
        if (typeof this.parameter.typeInput === 'string') {
            switch (this.parameter.typeInput.toLowerCase()) {
                case this.getStreamTypes('file') :
                    this.typeInput = this.getStreamTypes('file');
                    break;
                default:
                    this.typeInput = this.getStreamTypes('string');
                    break;
            }
        }
    }

    /**
     * Return type of Input stream
     *
     * @return {string}
     */
    protected getTypeInput(): string {
        return this.typeInput.toLowerCase();
    }

    /**
     * Setup Input stream
     *
     * @return {void}
     */
    protected setInputStream(): void {
        if (typeof this.parameter.input === 'string') {
            this.input = this.parameter.input;
        }
    }

    /**
     * Return Input stream
     *
     * @return {string}
     */
    protected getInputStream(): string {
        return this.input;
    }

    /**
     * Basic function with encrypting from file to file
     *
     * @return {boolean}
     */
    private encryptFile2File(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('file')
            && this.getTypeOutput() === this.getStreamTypes('file')
            && typeof this.getOutputStream() ==='string'
            && false !== existsSync(this.getOutputStream())
        ) {
            if (false !== existsSync(this.getOutputStream())) {
                unlinkSync(this.getOutputStream());
            }
            let result: boolean = true;
            let b: null | Buffer = null;
            let filename: string = this.getOutputStream();
            let file: number = openSync(filename, 'w+', 0o755);
            let l: number = 0;
            try {
                while (b = this.getFileReadChunkModule().readingChunkFile().getCurrentChunk()) {
                    l += b.byteLength;
                    console.log(l);
                    this.getCrypto().encrypt(b.toString('hex')).forEach(function (value, index) {
                        if (null !== value) {
                            writeSync(file, (value + '$'));
                        }
                    });
                }
            } catch (ex) {
                result = false;
            }
            closeSync(file);
            if (false === result) {
                if (false !== existsSync(this.getOutputStream())) {
                    unlinkSync(this.getOutputStream());
                }
                file = openSync(this.getOutputStream(), 'w+', 0o755);
                writeSync(file, "");
                closeSync(file);
            }
            this.setStreamOut(this.getOutputStream());
            out = true;

        }

        return out;
    }

    /**
     * Basic function with encrypting from file to string
     *
     * @return {boolean}
     */
    private encryptFile2String(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('file')
            && this.getTypeOutput() === this.getStreamTypes('string')
        ) {
            let b: null | Buffer = null;
            let c: null | string[] = new Array();
            try {
                while (b = this.getFileReadChunkModule().readingChunkFile().getCurrentChunk()) {
                    this.getCrypto().encrypt(b.toString('hex')).forEach(function (value, index) {
                        c.push(value);
                    });
                }
            } catch (ex) {}
            this.setStreamOut(new Buffer(JSON.stringify(c), 'utf8').toString('base64'));
            out = true;
        }

        return out;
    }

    /**
     * Basic function with encrypting from file to stream
     *
     * @return {void}
     */
    private encryptFile2Stream(): void {
        if (
            this.getTypeInput() === this.getStreamTypes('file')
            && this.getTypeOutput() === this.getStreamTypes('stream')
        ) {
            let b: null | Buffer = null;
            try {
                while (b = this.getFileReadChunkModule().readingChunkFile().getCurrentChunk()) {
                    this.getCrypto().encrypt(b.toString('hex')).forEach(function (value, index) {
                        console.log(new Buffer(value, "utf8").toString("base64") + '$');
                    });
                }
            } catch (ex) {}
            console.info('$$');
        }
    }

    /**
     * Encrypt input file
     *
     * @return {void}
     */
    protected encryptFile(): void {
        if (this.getTypeInput() === this.getStreamTypes('file')) {
            this.getFileReadChunkModule().prepareChunkedReadFile(this.getInputStream());
            false === this.encryptFile2File()
            && false === this.encryptFile2String()
            && this.encryptFile2Stream();
        }
    }

    /**
     * Basic function with encrypting from string to file
     *
     * @return {boolean}
     */
    private encryptString2File(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('string')
            && this.getTypeOutput() === this.getStreamTypes('file')
            && typeof this.getOutputStream() === 'string'
            && false !== existsSync(this.getOutputStream())
        ) {
            let result: boolean = true;
            let file = openSync(this.getOutputStream(), 'w+', 0o755);
            try {
                this.getCrypto().encrypt(this.getInputStream()).forEach(function (value, index) {
                    writeSync(file, (value + '\n'), null, 'utf8');
                });
            } catch(ex) {
                result = false;
            }
            closeSync(file);
            if (false === result) {
                if (false !== existsSync(this.getOutputStream())) {
                    unlinkSync(this.getOutputStream());
                }
                file = openSync(this.getOutputStream(), 'w+', 0o755);
                writeSync(file, "");
                closeSync(file);
            }
            this.setStreamOut(this.getOutputStream());
            out = true;
        }

        return out;
    }

    /**
     * Basic function with encrypting from string to string
     *
     * @return {boolean}
     */
    private encryptString2String(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('string')
            && this.getTypeOutput() === this.getStreamTypes('string')
        ) {
            let c: string[] = new Array();
            try {
                this.getCrypto().encrypt(this.getInputStream()).forEach(function (value, index) {
                    c.push(value);
                });
            } catch (ex) {}
            this.setStreamOut(new Buffer(JSON.stringify(c), 'utf8').toString('base64'));
            out = true;
        }

        return out;
    }

    /**
     * Basic function with encrypting from string to stream
     *
     * @return {void}
     */
    private encryptString2Stream(): void {
        if (
            this.getTypeInput() === this.getStreamTypes('string')
            && this.getTypeOutput() === this.getStreamTypes('stream')
        ) {
            try {
                this.getCrypto().encrypt(this.getInputStream()).forEach(function (value, index) {
                    console.log(new Buffer(value, "utf8").toString("base64") + '$');
                });
            } catch (ex) {}
            console.info('$$');
        }
    }

    /**
     * Encrypt input string
     *
     * @return {void}
     */
    protected encryptString(): void {
        if (this.getTypeInput() === this.getStreamTypes('string')) {
            false === this.encryptString2File()
            && false === this.encryptString2String()
            && this.encryptString2Stream();
        }
    }

    /**
     * Basic function with decrypting from file to file
     *
     * @return {boolean}
     */
    private decryptFile2File(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('file')
            && this.getTypeOutput() === this.getStreamTypes('file')
            && typeof this.getOutputStream() ==='string'
            && false !== existsSync(this.getOutputStream())
        ) {
            if (false !== existsSync(this.getOutputStream())) {
                unlinkSync(this.getOutputStream());
            }
            let result: boolean = true;
            let b: null | Buffer = null;
            let b2: null | string[] = null;
            let b3: null | string = null;
            let b4: boolean = false;
            let b5: number = 0;
            let b6: null | any = null;
            let filename: string = this.getOutputStream();
            let file: number = openSync(filename, 'w+', 0o755);
            let l: number = 0;
            closeSync(file);
            try {
                let i = 1;
                console.log(l);
                let streamOut: string;
                let streamOutHex: Buffer;
                while (b = this.getFileReadChunkModule().readingChunkFile().getCurrentChunk()) {
                    streamOut = "";
                    b2 = b.toString('utf8').split("$");
                    b2.forEach((value, inde) => {
                        if (true === b4) {
                            value = b3 + value;
                            b4 = false;
                        } else {
                            b3 = value;
                        }
                        try {
                            b6 = this.getCrypto().decrypt(value);
                            streamOut = streamOut + b6;
                        } catch (ex) {
                            b4 = true;
                        }
                    });
                    streamOutHex = new Buffer(streamOut, 'hex');
                    l = l + streamOut.length;
                    appendFileSync(filename, streamOutHex, 'binary');
                    console.log(l);
                    i++;
                }
            } catch (ex) {
                result = false;
            }
            if (false === result) {
                if (false !== existsSync(this.getOutputStream())) {
                    unlinkSync(this.getOutputStream());
                }
                file = openSync(this.getOutputStream(), 'w+', 0o755);
                writeSync(file, "", null, 'utf8');
                closeSync(file);
            }
            this.setStreamOut(this.getOutputStream());
            out = true;
        }

        return out;
    }

    /**
     * Basic function with decrypting from file to string
     *
     * @return {boolean}
     */
    private decryptFile2String(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('file')
            && this.getTypeOutput() === this.getStreamTypes('string')
        ) {
            let b: null | Buffer = null;
            let c: null | string[] = new Array();
            try {
                while (b = this.getFileReadChunkModule().readingChunkFile().getCurrentChunk()) {
                    c.push(this.getCrypto().decrypt(b.toString('utf8')).toString());
                }
            } catch (ex) {}
            this.setStreamOut(new Buffer(c.join(), 'utf8').toString('base64'));
            out = true;
        }

        return out;
    }

    /**
     * Basic function with decrypting from file to stream
     *
     * @return {void}
     */
    private decryptFile2Stream(): void {
        if (
            this.getTypeInput() === this.getStreamTypes('file')
            && this.getTypeOutput() === this.getStreamTypes('stream')
        ) {
            try {
                let b: null | Buffer = null;
                while (b = this.getFileReadChunkModule().readingChunkFile().getCurrentChunk()) {
                    console.log(new Buffer(this.getCrypto().decrypt(b.toString('utf8')).toString()).toString('base64') + '$');
                }
            } catch (ex) {}
            console.info('$$');
        }
    }

    /**
     * Decrypt input file
     *
     * @return {void}
     */
    protected decryptFile(): void {
        if (this.getTypeInput() === this.getStreamTypes('file')) {
            this.getFileReadChunkModule().prepareChunkedReadFile(this.getInputStream());
            false === this.decryptFile2File()
            && false === this.decryptFile2String()
            && this.decryptFile2Stream();
        }
    }

    /**
     * Basic function with decrypting from string to file
     *
     * @return {boolean}
     */
    private decryptString2File(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('string')
            && this.getTypeOutput() === this.getStreamTypes('file')
            && typeof this.getOutputStream() === 'string'
            && false !== existsSync(this.getOutputStream())
        ) {
            let b: string[] = [];
            let file = openSync(this.getOutputStream(), 'w+', 0o755);
            try {
                b = JSON.parse(new Buffer(this.getInputStream(), 'base64').toString('utf8'));
            } catch (ex) {}
            b.forEach((value, index) => {
                writeSync(file, this.getCrypto().decrypt(value));
            });
            this.setStreamOut(this.getOutputStream());
            closeSync(file);
            out = true;
        }

        return out;
    }

    /**
     * Basic function with decrypting from string to string
     *
     * @return {boolean}
     */
    private decryptString2String(): boolean {
        let out: boolean = false;
        if (
            this.getTypeInput() === this.getStreamTypes('string')
            && this.getTypeOutput() === this.getStreamTypes('string')
        ) {
            let b: string[] = [];
            let c: string[] = new Array();
            try {
                b = JSON.parse(new Buffer(this.getInputStream(), 'base64').toString('utf8'));
            } catch (ex) {}
            let crypto: CryptoModule = this.getCrypto();
            b.forEach(function (value, index) {
                c.push(crypto.decrypt(value).toString());
            });
            this.setStreamOut(new Buffer(c.join(""), 'utf8').toString('base64'));
            out = true
        }

        return out;
    }

    /**
     * Basic function with decrypting from string to stream
     *
     * @return {void}
     */
    private decryptString2Stream(): void {
        if (
            this.getTypeInput() === this.getStreamTypes('string')
            && this.getTypeOutput() === this.getStreamTypes('stream')
        ) {
            let b: string[] = [];
            try {
                b = JSON.parse(new Buffer(this.getInputStream(), 'base64').toString('utf8'));
            } catch (ex) {}
            let crypto: CryptoModule = this.getCrypto();
            b.forEach(function (value, index) {
                console.log(new Buffer(crypto.decrypt(value).toString(), "utf8").toString('base64') + '$');
            });
            console.info('$$');
        }
    }

    /**
     * Decrypt input string
     *
     * @return {void}
     */
    protected decryptString(): void {
        if (this.getTypeInput() === this.getStreamTypes('string')) {
            false === this.decryptString2File()
            && false === this.decryptString2String()
            && this.decryptString2Stream();
        }
    }
}