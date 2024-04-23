import command from '@faddys/command';

const { output, error } = await command ( 'cat -', async input => {

input ( 'Yallah?' );
input ( 'Salah Abdallah!' );

} );

console .log ( output );
console .error ( error );
