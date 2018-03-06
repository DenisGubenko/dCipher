import { openSync, readSync, existsSync, statSync, Stats, closeSync } from 'fs';
import { TypesModule } from './../../../modules/types/index';

/**
 * Filesystem processing reading chunk class
 *
 * @author dennigogo@gmail.com
 */
export class FileReadChunkModule extends TypesModule{

    /**
     * Default size of chunk
     *
     * @type {number}
     */
    private chunkSize: number = 512;

    /**
     * Size of reading chunk
     *
     * @type {number}
     */
    private readChunkSize: number = 0;

    /**
     * Offset reading chunk
     *
     * @type {number}
     */
    private offsetChunk: number = 0;

    /**
     * Buffer reading chunk
     *
     * @type {null | Buffer}
     */
    private chunkBuffer: null | Buffer = null;

    /**
     * String of reading chunk
     *
     * @type {null | Buffer}
     */
    private currentChunk: null | Buffer = null;

    /**
     * Contents of chunk file
     *
     * @type {null | number}
     */
    private file: null | number = null;

    /**
     * Filename of chunk file
     *
     * @type {null | string}
     */
    private filename: null | string = null;

    constructor() {
        super();
    }

    /**
     * Prepare with 'readingChunkFile' function
     *
     * @return {void}
     */
    public prepareChunkedReadFile(input: string): void {
        this.resetChunkBuffer();
        this.resetReadChunkSize();
        this.resetOffsetChunk();
        this.resetFile();
        this.setFilename(input);
        this.setFile();
    }

    /**
     * Return file-contents identificator of chunk
     *
     * @return {number}
     */
    private readChunkFile(): number {
        return readSync(this.getFile(), this.getChunkBuffer(), 0, this.getChunkSize(), this.getOffsetChunk());
    }

    /**
     * Calculate next chunk of current file
     *
     * @return {FileSystemModule}
     */
    public readingChunkFile(): this {
        this.setFile();
        if (null !== this.getFile()) {
            this.setChunkBuffer();
            if (this.setReadChunkSize(this.readChunkFile())) {
                this.setOffsetChunk(this.getOffsetChunk() + this.getReadChunkSize());
                this.setCurrentChunk();
            } else {
                this.resetCurrentString();
            }
            this.resetFile();
        }

        return this;
    }

    /**
     * Setup size reading chunk of file
     *
     * @param {number} size
     * @return {void}
     */
    private setChunkSize(size: number): void {
        this.chunkSize = size;
    }

    /**
     * Return size of chunck
     *
     * @return {number}
     */
    private getChunkSize(): number {
        return this.chunkSize;
    }

    /**
     * Setup size reading chunk of file
     *
     * @param {number} input
     * @return {void}
     */
    private setReadChunkSize(input: number): number {
        delete this.readChunkSize;

        return this.readChunkSize = input;

    }

    /**
     * Reading size of chunk
     *
     * @return {number}
     */
    private getReadChunkSize(): number {
        return this.readChunkSize;
    }

    /**
     * Reset size of chunk
     *
     * @return {void}
     */
    private resetReadChunkSize(): void {
        this.setReadChunkSize(0);
    }

    /**
     * Setup Offset of chunk
     *
     * @param {number} input
     */
    private setOffsetChunk(input: number): void {
        this.offsetChunk = input;
    }

    /**
     * Return Offset of chunk
     *
     * @return {number}
     */
    private getOffsetChunk(): number {
        return this.offsetChunk;
    }

    /**
     * Reset Offset of chunk
     *
     * @return {void}
     */
    private resetOffsetChunk(): void {
        this.setOffsetChunk(0);
    }

    /**
     * Setup Buffer of chunk
     *
     * @return {void}
     */
    private setChunkBuffer(): void {
        this.chunkBuffer = new Buffer(this.getChunkSize());
    }

    /**
     * Return Buffer of chunk
     *
     * @return {Buffer | null}
     */
    private getChunkBuffer(): null | Buffer {
        return this.chunkBuffer;
    }

    /**
     * Reset Buffer of chunk
     *
     * @return {void}
     */
    private resetChunkBuffer(): void {
        this.chunkBuffer = null;
    }

    /**
     * Setup files identificator
     *
     * @param {string} input
     */
    private setFile(): void {
        if (false !== existsSync(this.getFilename())) {
            let stat: Stats = statSync(this.getFilename());
            if (stat.size < this.getChunkSize()) {
                this.setChunkSize(stat.size);
            }
            this.file = openSync(this.getFilename(), 'r');
        }
    }

    /**
     * Return files identificator
     *
     * @return {number}
     */
    private getFile(): number {
        return this.file;
    }

    /**
     * Reset files identificator
     *
     * @return {void}
     */
    private resetFile(): void {
        if (null !== this.file) {
            closeSync(this.file);
            this.file = null;
        }
    }

    /**
     * Return filename
     *
     * @return {string}
     */
    private getFilename() : string {
        return this.filename;
    }

    /**
     * Setup filename
     *
     * @param {string} input
     */
    private setFilename(input: string) : void {
        this.filename = input;
    }

    /**
     * Setup current string of reading chunk
     *
     * @return {void}
     */
    private setCurrentChunk(): void {
        this.currentChunk = this.getChunkBuffer().slice(0, this.getReadChunkSize());
    }

    /**
     * Return current string of reading chunk
     *
     * @return {Buffer | null}
     */
    public getCurrentChunk(): null | Buffer {
        return this.currentChunk;
    }

    /**
     * Reset current string of reading chunk
     *
     * @return {void}
     */
    private resetCurrentString(): void {
        this.currentChunk = null;
    }
}