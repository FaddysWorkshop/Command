import Scenarist from '@faddys/scenarist';
import { spawn} from 'node:child_process';
import { createInterface, Interface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { parse } from 'node:path';
import Input from './input.js';

export default await Scenarist ( class Command {

constructor ( ... line ) { this .line = line }

#input
#output
#error

async $_producer ( $ ) {

const command = this;
const { line } = command;

command .input = new Promise ( resolution => { command .#input = resolution } );
command .$input = new Input ( command .input );

Object .assign ( command, {

output: new Promise ( output => ( command .#output = output ) ),
error: new Promise ( error => ( command .#error = error ) ),
process: spawn( 'bash', [ '-c', line .join ( ' ' ), "Faddy's Command" ] )
.on ( 'error', error => console .error ( 'Bad command' ) )
.on ( 'spawn', () => command .read () ),

} );

}

async read () {

const command = this;

command .#input ( command .process .stdin );

const output = [];

createInterface ( { input: command .process .stdout } )
.on ( 'line', line => output .push ( line ) )
.on ( 'close', () => command .#output ( output ) );

const error = [];

createInterface ( { input: command .process .stderr } )
.on ( 'line', line => error .push ( line ) )
.on ( 'close', () => command .#error ( error ) );

}

async $output () {

return await this .output;

}

async $error () {

return await this .error;

}

} );
