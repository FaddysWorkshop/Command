import command from '@faddys/command';

const write = await command ( 'cat - > faddys.scratch' );

write ( "Hello World! This is Faddy's Command!" );
write ( "In Solidarity with The People of Palestine till The Whole Land is FREE!" );

write ( Symbol .for ( 'end' ), '\nFaddy Michel\n' + new Date );
