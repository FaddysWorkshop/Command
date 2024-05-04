import { Console } from 'node:console';

export default class Input {

constructor ( stream ) { this .stream = stream }

async $_producer () { this .console = new Console ( this .stream = await this .stream ) }

$_director ( $, line ) { this .console .log ( line ) }

$_end () { this .stream .end () }

};
