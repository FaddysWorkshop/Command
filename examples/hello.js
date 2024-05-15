/*
# Example: Hello World!

The traditional "Hello World" example using Faddy's Command.

*/

import command from '@faddys/command';

// Create the command function:
const echo = await command ( { stdio: 'inherit' }, `echo "Hello World! This is Faddy's Command in Solidarity with The People of Palestine till The Whole Land is FREE!"` );

// Call the command function to retrieve the output by passing the symbol returned from `Symbol .for ( 'output' )` as the first parameter:
const output = await echo ( Symbol .for ( 'output' ) );

// The output is an array containing the lines printed to the standard output of the command.
// Since the output contains only one line, pop it from the array and log it to the console:
console .log ( output .pop () );

// The following will be printed:
// Hello World! This is Faddy's Command in Solidarity with The People of Palestine till The Whole Land is FREE!
