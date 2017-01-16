
var build = require ("./build.js");
var myPokemon = require("./myPokemon.js");
var query = require("cli-interact").getChar;
// prompt.start();
// console.log("what's your name?")
// prompt.get(["name"], (err, result)=>{
// 	if(result.name == "Bob"){
// 		console.log("great!");
// 	}else{
// 		console.log("I don't lke you!");
// 	}
// })

var PokemonCLI = function(){
	//The CLI for Pokemon Revisited!
	//this class contains the game logic
	this.enemy = new build.EnemyGroup();
	this.player = new build.PokeGroup();
	this.playerDmg = 0;
	this.enemyDmg = 0;

	this.call = function(){
		// intro
		this.intro();
		// game play
			// ask which pokemon to start with
			// commence fight
			// Tally score - by damage done
		this.startGame();
	}

	this.intro = function(){
		console.log("                                  ,'\\");
		console.log("    _.----.        ____         ,'  _\\   ___    ___     ____");
		console.log("_,-'       `.     |    |  /`.   \\,-'    |   \\  /   |   |    \\  |`.");
		console.log("\\      __    \\    '-.  | /   `.  ___    |    \\/    |   '-.   \\ |  |");
		console.log(" \\.    \\ \\   |  __  |  |/    ,','_  `.  |          | __  |    \\|  |");
		console.log("   \\    \\/   /,' _`.|      ,' / / / /   |          ,' _`.|     |  |");
		console.log("    \\     ,-'/  /   \\    ,'   | \\/ / ,`.|         /  /   \\  |     |");
		console.log("     \\    \\ |   \\_/  |   `-.  \\    `'  /|  |    ||   \\_/  | |\\    |");
		console.log("      \\    \\ \\      /       `-.`.___,-' |  |\\  /| \\      /  | |   |");
		console.log("       \\    \\ `.__,'|  |`-._    `|      |__| \\/ |  `.__,'|  | |   |");
		console.log("        \\_.-'       |__|    `-._ |              '-.|     '-.| |   |");
		console.log("                                `'                            '-._|");
		console.log("Pokemon Revisited! - An All Star Code Coding Challenge");
		console.log("===================================");
		console.log("You're opponent has the following Pokemon with 'perfect' stats");
		this.enemy.printGroup();
		console.log("===================================");
		console.log("You have the following Pokemon (a group you've filtered from 10,000 groups of random Pokemon)");
		this.player.printGroup();
		console.log("===================================");
		console.log("Time to battle! Your score is calculated by the amount of damage you do to the enemy team (Max of " + this.enemy.sumHP() +" )");
	}

	this.startGame = function(){
		// Ask which pokemon to use first?
		console.log("Select a pokemon to go first")
		for(var i in this.player.group){
			console.log((Number(i)+1) + ". "+ this.player.group[i].Name);
		}

		var ans = query("Which pokemon do you want to go first? (1-6)", "123456", false);
		this.player.currentPokemon = this.player.group[Number(ans-1)];
		console.log(this.player.currentPokemon);

		// until a current pokemon is fainted, keep attacking back and forth
		// keep track of all dmg dealt
		// swap pokemon, depending on what
	}

	this.changeEnemyPoke = function(){

	}

	this.changePlayerPoke = function(){

	}
}


module.exports = {
	PokemonCLI : PokemonCLI
}