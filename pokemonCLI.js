var build = require ("./build.js");

var PokemonCLI = function(){
	//The CLI for Pokemon Revisited!
	//this class contains the game logic

	this.call = function(){
		console.log(build.whole[0]);
	}

}
module.exports = {
	PokemonCLI : PokemonCLI
}