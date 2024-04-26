import command from '@faddys/command';

const { input, output, error } = await command ( 'cat -' );

output .then ( output => output .forEach ( line => console .log ( line ) ) );
error .then ( error => error .forEach ( line => console .error ( line ) ) );

input .then ( input => {

input ( 'Yallah?' );
input ( 'Salah Abdallah!' );

input ( Symbol .for ( 'end' ) );

} );
