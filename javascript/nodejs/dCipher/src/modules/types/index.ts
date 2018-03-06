/**
 * Types list class
 *
 * @author dennigogo@gmail.com
 */
export class TypesModule {

    /**
     *
     * @type {{encript: string; decript: string}}
     */
    protected typesCipher: object = {
        'encript': 'encript',
        'decript': 'decript'
    };

    /**
     *
     * @type {{string: string; file: string}}
     */
    protected typesStream: object = {
        'string': 'string',
        'file': 'file',
        'stream': 'stream'
    };

    /**
     *
     * @returns {null | string}
     */
    protected getCipherTypes(input: string): null | string {
        let out: string = null;
        input = input.toLowerCase();
        if (false !== this.typesCipher.hasOwnProperty(input)) {
            out = eval('this.typesCipher.' + input);
        }

        return out;
    }

    /**
     *
     * @returns {null | string}
     */
    public getStreamTypes(input: string): null | string {
        let out: string = null;
        if (false !== this.typesStream.hasOwnProperty(input)) {
            out = eval('this.typesStream.' + input);
        }

        return out;
    }
}