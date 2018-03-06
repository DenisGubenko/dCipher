/**
 * Cipher execute script
 *
 * @author dennigogo@gmail.com
 */

import { CommanderModule } from './modules/commander/index';

const program = require('commander');
program
    .option('-t, --type <type>', 'Setup type cipher (Encript/Decript)')
    .option('-a, --typeInput <typeInput>', 'Setup Input type cipher (String/File)')
    .option('-i, --input <input>', 'Input stream cipher; type String as string; type File as filename')
    .option('-b, --typeOutput <typeOut>', 'Setup Output type cipher (String/File)')
    .option('-o, --output <output>', 'Output stream cipher; type String as string encode base64; type File as filename with encode as is')
    .parse(process.argv);

let cmd: CommanderModule = new CommanderModule(program);

if (false === cmd.getErrorMode()) {
    cmd.executeCipher();
    if (cmd.getTypeOutput() !== cmd.getStreamTypes('stream')) {
        console.log(JSON.stringify({
            'code': cmd.getOutCode(),
            'stream': cmd.getStreamOut(),
            'type': cmd.getTypeOutput()
        }));
    }
} else {
    console.log(JSON.stringify({
        'code': cmd.getOutCode(),
        'error': cmd.getErrorMessages()
    }));
}
process.exit();