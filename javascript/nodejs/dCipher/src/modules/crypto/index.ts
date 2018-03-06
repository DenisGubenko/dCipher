import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { Cipher, Decipher, Hmac, createHash, randomBytes, createDecipheriv, createCipheriv, createHmac } from 'crypto';

export class CryptoModule {

    /**
     *
     * @type {string}
     */
    private emptyVal: string = "";

    /**
     *
     * @type {null | Decipher}
     */
    private dcp: null | Decipher = null;

    /**
     *
     * @type {null | Cipher}
     */
    private ecp: null | Cipher = null;

    /**
     *
     * @type {null | Hmac}
     */
    private hMac: null | Hmac = null;

    /**
     *
     * @type {string}
     */
    private algorithm = 'aes-256-cbc';

    /**
     *
     * @type {string}
     */
    private hMacAlgotithm = 'sha256';

    /**
     *
     * @type {Buffer}
     */
    private key = new Buffer(this.emptyVal, 'binary');

    /**
     *
     * @type {Buffer}
     */
    private hMacKey = new Buffer(this.emptyVal, 'binary');

    /**
     *
     * @type {Buffer}
     */
    private iv: Buffer = new Buffer(this.emptyVal, 'binary');

    /**
     *
     * @type {string | Buffer}
     */
    private encryptHMacVal: string | Buffer = new Buffer(this.emptyVal, 'binary');

    /**
     *
     * @type {string}
     */
    private filenameKey: string = 'security.txt';

    /**
     *
     * @type {null | string}
     */
    private fileKey: null | string = null;

    /**
     *
     * @type {string}
     */
    private filenameIvKey: string = 'securityIv.txt';

    /**
     *
     * @type {null | string}
     */
    private fileKeyIv: null | string = null;

    /**
     *
     * @type {string}
     */
    private filenameHMacKey: string = 'securityHMac.txt';

    /**
     *
     * @type {null | string}
     */
    private fileKeyHMac: null | string = null;

    private test: null[] | any[] = [
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //1
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //2
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //3
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //4
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //5
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //6
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //7
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //8
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //9
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //10
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //11
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //12
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //13
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //14
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //15
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //16
        /**, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //17
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //18
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //19
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //20
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //21
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //22
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //23
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //24
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //25
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //26
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //27
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //28
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //29
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //30
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //31
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //32
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //33
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //34
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //35
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //36
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //37
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //38
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //39
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //40
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //41
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //42
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //43
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //44
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //45
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //46
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //47
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //48
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //49
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //50
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //51
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //52
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //53
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //54
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //55
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //56
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //57
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //58
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //59
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //60
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //61
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //62
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //63
        , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null //64
*/
    ];


    private n:any;
    private i:number = 0;
    private ii:number = 0;
    private y:number = 4;
    private z:number = 4;


    constructor() {
        this.init();
    }

    private init() {
        this.setFileKey();
        this.setFileKeyIv();

        this.setKey();
        this.setIv();

        this.setDcp();
        this.setEcp();
    }

    /**
     *
     * @return {void}
     */
    private setKey(): void {
        if (false === existsSync(this.getFileKey())) {
            let key: any = randomBytes(32);
            writeFileSync(this.getFileKey(), key);
        }
        this.key = readFileSync(this.getFileKey());
    }

    /**
     *
     * @return {Buffer}
     */
    private getKey(): Buffer {
        return this.key;
    }

    /**
     *
     * @return void
     */
    private setHMacKey(): void {
        this.hMacKey = randomBytes(32);
    }

    /**
     *
     * @return {Buffer}
     */
    private getHMacKey(): Buffer {
        return this.hMacKey;
    }

    /**
     *
     * @return {void}
     */
    private setIv(): void {
        if (false === existsSync(this.getFileKeyIv())) {
            let key: any = randomBytes(16);
            writeFileSync(this.getFileKeyIv(), key);
        }
        this.iv = readFileSync(this.getFileKeyIv());
    }

    /**
     *
     * @return {Buffer}
     */
    private getIv(): Buffer {
        return this.iv;
    }

    /**
     *
     * @param {string} input
     * @return {void}
     */
    public setFilename(input: string): void {
        this.filenameKey = input;
    }

    /**
     *
     * @return {string}
     */
    private getFilename(): string {
        return this.filenameKey;
    }

    /**
     *
     * @return {void}
     */
    private setFileKey(): void {
        let path;
        if ('production' == process.env.ENV) {
            path = dirname(process.mainModule.filename) + '/../config/';
        } else {
            path = dirname(process.mainModule.filename) + '/../../../../config/';
        }
        this.fileKey = path + this.getFilename();
    }

    /**
     *
     * @return {string}
     */
    private getFileKey(): string {
        return this.fileKey;
    }

    /**
     *
     * @param {string} input
     * @return {void}
     */
    public setFilenameIv(input: string): void {
        this.filenameIvKey = input;
    }

    /**
     *
     * @return {string}
     */
    private getFilenameIv(): string {
        return this.filenameIvKey;
    }

    /**
     *
     * @return {void}
     */
    private setFileKeyIv(): void {
        let path;
        if ('production' == process.env.ENV) {
            path = dirname(process.mainModule.filename) + '/../config/';
        } else {
            path = dirname(process.mainModule.filename) + '/../../../../config/';
        }
        this.fileKeyIv = path + this.getFilenameIv();
    }

    /**
     *
     * @return {string}
     */
    private getFileKeyIv(): string {
        return this.fileKeyIv;
    }

    /**
     *
     * @param {string} input
     * @return {void}
     */
    public setFilenameHMac(input: string): void {
        this.filenameHMacKey = input;
    }

    /**
     *
     * @return {string}
     */
    private getFilenameHMac(): string {
        return this.filenameHMacKey;
    }

    /**
     *
     * @return {void}
     */
    private setFileKeyHMac(): void {
        let path;
        if ('production' == process.env.ENV) {
            path = dirname(process.mainModule.filename) + '/../config/';
        } else {
            path = dirname(process.mainModule.filename) + '/../../../../config/';
        }
        this.fileKeyHMac = path + this.getFilenameHMac();
    }

    /**
     *
     * @return {string}
     */
    private getFileKeyHMac(): string {
        return this.fileKeyHMac;
    }

    /**
     *
     * @return {string}
     */
    private getAlgorithm(): string {
        return this.algorithm;
    }

    /**
     *
     * @return {string}
     */
    private getHMacAlgorithm(): string {
        return this.hMacAlgotithm;
    }

    /**
     *
     * @return {void}
     */
    private setDcp(): void {
        this.dcp = createDecipheriv(this.getAlgorithm(), this.getKey(), this.getIv());
    }

    /**
     *
     * @return {null | Decipher}
     */
    private getDcp(): null | Decipher {
        return this.dcp;
    }

    /**
     *
     * @return {void}
     */
    private setEcp(): void {
        delete this.ecp;
        this.ecp = createCipheriv(this.getAlgorithm(), this.getKey(), this.getIv());
    }

    /**
     *
     * @return {null | Cipher}
     */
    private getEcp() : null | Cipher {
        return this.ecp;
    }

    /**
     *
     * @return {void}
     */
    private setHMac(): void {
        this.hMac = createHmac(this.hMacAlgotithm, this.getHMacKey());
    }

    /**
     *
     * @return {null | Hmac}
     */
    private getHMac(): null | Hmac {
        return this.hMac;
    }

    /**
     *
     * @param {string | Buffer} input
     * @return {void}
     */
    private setEncryptHMac(input: string | Buffer): void {
        let result: string | Buffer = input;
        this.getHMac().update(result);
        this.encryptHMacVal = this.getHMac().update(this.getIv().toString('hex')).digest('hex');
    }

    /**
     *
     * @return {string | Buffer}
     */
    private getEncryptHMac(): string | Buffer {
        return this.encryptHMacVal;
    }

    /**
     *
     * @param {string} input
     * @return {string}
     */
    public encrypt(input: string): string[] {
        //let b = new Array();
        //let n: string;
        //let i = 0;
        //let ii = 0;
        //let y = 4;
        //let z = 4;
        this.y = 4;
        this.z = 4;
        this.i = 0;
        this.ii = 0;

        while (this.ii < this.test.length) {
            this.test[this.ii] = null;
            this.ii++;
        }
        this.ii = 0;

        while (this.i < input.length) {
            this.n = input.slice(this.i, this.y);
            this.setEcp();
            this.getEcp().setEncoding('hex');
            this.getEcp().write(this.n);
            this.getEcp().end();
            //b.push(this.getEcp().read());
            this.test[this.ii] = this.getEcp().read();
            this.i = this.i + this.z;
            this.y = this.y + this.z;
            this.ii++;
        }


        //console.log("length");
        //console.log(this.ii);

        return this.test;
    }

    /**
     *
     * @param {string} input
     * @return {string | Buffer}
     */
    public decrypt(input: string): string | Buffer {
        let i: string = input;
        let a = i.split("\n");
        let m: string = "";
        let y = 0;
        while (y < a.length) {
            if (0 < a[y].length) {
                this.setDcp();
                this.getDcp().update(a[y], "hex", "utf8");
                m +=this.getDcp().final("utf8");
            }
            y++;
        }

        return m;
    }
}