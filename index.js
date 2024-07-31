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
#exit

$_producer ( $ ) {

const command = this;
const { line } = command;

Object .assign ( command, {

output: new Promise ( output => ( command .#output = output ) ),
error: new Promise ( error => ( command .#error = error ) ),
exit: new Promise ( exit => ( command .#exit = exit ) ),
process: spawn( 'bash', [ '-c', line .join ( ' ' ), '@faddys/command' ], command .options )
.on ( 'error', error => console .error ( 'Bad command' ) )
.on ( 'spawn', () => command .read () )
.on ( 'exit', code => command .#exit ( code ) )

} );

}

$_director ( $, ... line ) {

const command = this;

if ( line .length && command .process .stdin )
command .process .stdin .write ( line .join ( ' ' ) + '\n' );

}

$_end ( $, ... line ) {

const command = this;

if ( command .process .stdin )
command .process .stdin .end ( line .length ? line .join ( ' ' ) : undefined );

}

$_signal ( $, ... line ) {

this .process .kill ( ... line .slice ( 0, 1 ) );

}

read () {

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

$_output () {

return this .output;

}

$_error () {

return this .error;

}

$_exit () {

return this .exit;

};

} );
