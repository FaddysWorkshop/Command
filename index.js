import Scenarist from '@faddys/scenarist';
import { spawn} from 'node:child_process';
import { createInterface, Interface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

export default await Scenarist ( class Command {

constructor ( ... line ) {

const command = this;

if ( typeof line [ 0 ] === 'object' )
command .options = line .shift ();

command .line = line;

}

#output
#error

async $_producer ( $ ) {

const command = this;
const { line } = command;

Object .assign ( command, {

output: new Promise ( output => ( command .#output = output ) ),
error: new Promise ( error => ( command .#error = error ) ),
process: spawn( 'bash', [ '-c', line .join ( ' ' ), '@faddys/command' ], command .options )
.on ( 'error', error => console .error ( 'Bad command' ) )
.on ( 'spawn', () => command .read () ),

} );

}

async $_director ( $, ... line ) {

const command = this;

if ( line .length && command .process .stdin )
command .process .stdin .write ( line .join ( '\n' ) + '\n' );

}

$_end ( $, ... line ) {

const command = this;

if ( command .process .stdin )
command .process .stdin .end ( line .length ? line .join ( '\n' ) : undefined );

}

async read () {

const command = this;

if ( command .process .stdout ) {

const output = [];

createInterface ( { input: command .process .stdout } )
.on ( 'line', line => output .push ( line ) )
.on ( 'close', () => command .#output ( output ) );

}

if ( command .process .stderr ) {

const error = [];

createInterface ( { input: command .process .stderr } )
.on ( 'line', line => error .push ( line ) )
.on ( 'close', () => command .#error ( error ) );

}

}

async $_output () {

return await this .output;

}

async $_error () {

return await this .error;

}

} );
