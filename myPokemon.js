var myPokemon = function(){
	this.filter=function(pokemonGroup){
		// takes an array of 6 TempPokemon and returns true if it passes your filter, otherwise return false
		if(pokemonGroup.every((x)=> x.atk>150)&&pokemonGroup.every((x)=> x.def>100)) {
			return true;
		}
		return false;
	}
}

module.exports ={
	myPokemon : myPokemon
}