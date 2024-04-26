import Scenarist from '@faddys/scenarist';
import { spawn} from 'node:child_process';
import { createInterface, Interface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { parse } from 'node:path';
import { Console } from 'node:console';

const $$ = Symbol .for;
let $;

export default async ( ... command ) => ( ( await $ ( ... command ) ) .resolution );

try {

$ = await Scenarist ( new class Command {

async $_producer ( $ ) {

const line = process .argv .slice ( 2 );

if ( ! line .length )
return;

this .interactive = true;

await $ ( ... line );

}

async $interact ( $ ) {

if ( this .interface )
throw '#error #command #interact An interface already exists.';

(

this .interface = createInterface ( { input, output } )
.on ( 'line', line => ( $ ( line )
.catch ( error => console .error ( error ) ) ) )
.on ( 'error', error => console .error ( error .message ) )

) .prompt ();

for ( const signal of [ 'SIGINT', 'SIGTERM', 'SIGHUP' ] )
process .on ( signal, () => this .process .kill ( signal ) );

}

#input
#output
#error

$_director ( $, ... line ) {

const command = this;

Object .assign ( command, {

input: new Promise ( input => ( command .#input = input ) ),
output: new Promise ( output => ( command .#output = output ) ),
error: new Promise ( error => ( command .#error = error ) ),
process: spawn( 'bash', [ '-c', line .join ( ' ' ), "Faddy's Command" ] )
.on ( 'error', error => console .error ( 'Bad command' ) )
.on ( 'spawn', () => this .read () )
.on ( 'exit', async () => {

if ( command .interface )
command .interface .prompt ();

} )

} );

return command;

}

async read () {

const command = this;

command .#input ( await Scenarist ( {

$_producer () { this .input = new Console ( command .process .stdin ) },
$_director ( $, line ) { this .input .log ( line ) },
$_end () { command .process .stdin .end () }

} ) );

if ( this .interface )
await ( await this .input ) ( $$ ( 'end' ) );

const log = [];
const output = [];
const error = [];

createInterface ( { input: command .process .stdout } )
.on ( 'line', line => {

output .push ( line );

if ( this .interactive )
console .log ( line );

} ) .on ( 'close', () => command .#output ( output ) );

createInterface ( { input: command .process .stderr } )
.on ( 'line', line => {

error .push ( line );

if ( this .interactive )
console .error ( line );

} ) .on ( 'close', () => command .#error ( error ) );

}

} );

} catch ( error ) {

console .error ( error );

}
