import command from '@faddys/command';

const cat = await command ( 'cat -' );

cat ( 'input', 'Yallah?' );
cat ( 'input', 'Salah Abdallah!' );

cat ( 'input', Symbol .for ( 'end' ) );

( await cat ( 'output' ) ) .forEach ( line => console .log ( line ) );

const echo = await command ( 'echo koko wawa' );

console .log ( ... await echo ( 'output' ) );
