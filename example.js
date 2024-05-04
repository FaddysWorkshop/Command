import command from '@faddys/command';

const cat = await command ( 'cat -' );

cat ( 'Yallah?' );
cat ( 'Salah Abdallah!' );

cat ( Symbol .for ( 'end' ) );

( await cat ( Symbol .for ( 'output' ) ) ) .forEach ( line => console .log ( line ) );

const echo = await command ( 'echo koko wawa' );

console .log ( ... await echo ( Symbol .for ( 'output' ) ) );
