import Scenarist from '@faddys/scenarist';
import { spawn} from 'node:child_process';
import { createInterface, Interface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { parse } from 'node:path';
import { Console } from 'node:console';

export default async ( ... command ) => ( ( await $ ( ... command ) ) .resolution );

const $ = await Scenarist ( {

$_producer ( $ ) {

if ( process .argv [ 1 ] !== parse ( new URL ( import .meta .url ) .pathname ) .dir )
return;

this .interactive = true;

const line = process .argv .slice ( 2 );

if ( line .length )
return $ ( ... line );

(

this .interface = createInterface ( { input, output } )
.on ( 'line', line => $ ( line ) )
.on ( 'error', error => console .error ( error .message ) )

) .prompt ();

for ( const signal of [ 'SIGINT', 'SIGTERM', 'SIGHUP' ] )
process .on ( signal, () => this .command .kill ( signal ) );

},

$_director ( $, ... line ) {

if ( typeof line [ line .length - 1 ] === 'function' )
this .input = line .pop ();

return new Promise ( async ( resolution, rejection ) => {

this .command = spawn( 'bash', [ '-c', line .join ( ' ' ), "Faddy's Command" ] )
.on ( 'error', error => rejection ( 'Bad command' ) )
.on ( 'spawn', () => this .read () )
.on ( 'exit', async () => {

resolution ( this .command );

if ( this .interface )
this .interface .prompt ();

} );

} );

},

read () {

const { command } = this;

if ( this .input ) {

const input = new Console ( command .stdin );

Promise .resolve ( this .input .call ( command, input .log .bind ( input ) ) )
.then ( () => command .stdin .end () );

}

command .output = [];
command .error = [];

createInterface ( { input: command .stdout } )
.on ( 'line', line => {

command .output .push ( line );

if ( this .interactive )
console .log ( line );

} );

createInterface ( { input: command .stderr } )
.on ( 'line', line => {

command .error .push ( line );

if ( this .interactive )
console .error ( line );

} );

}

} );
