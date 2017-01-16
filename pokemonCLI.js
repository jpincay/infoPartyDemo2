
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
		console.log("Time to battle! Your score is calculated by the amount of damage you do to the enemy team (Max of " + this.enemy.FULLHP +" )");
	}

	this.startGame = function(){
		// Ask which pokemon to use first?
		console.log("Select a pokemon to go first")
		for(var i in this.player.group){
			console.log((Number(i)+1) + ". "+ this.player.group[i].Name);
		}

		var ans = query("Which pokemon do you want to go first? (1-6)", "123456", false);
		this.player.currentPokemon = this.player.group[Number(ans-1)];


		while(this.player.sumHP()>0&&this.enemy.sumHP()>0){
			// Looping until pokemon is fainted
			var enemyMove, playerMove, newPick, choices;
			while (!this.player.fainted()&&!this.enemy.fainted()){
				console.log(this.player.sumHP());
				console.log(this.enemy.sumHP());
				//enemy goes first b/c "perfect"
				enemyMove = this.enemy.dealDmg(this.player.currentPokemon);
				this.enemyDmg = this.enemyDmg + enemyMove.Damage; //keeping track of all dmg dealt
				console.log("Enemy " + this.enemy.currentPokemon.Name + " used "+ enemyMove.Name + " dealing "+ enemyMove.Damage + " damage to " + this.player.currentPokemon.Name +"!");
				
				if(!this.player.fainted()){
					playerMove = this.player.dealDmg(this.enemy.currentPokemon);
					this.playerDmg = this.playerDmg + playerMove.Damage;//keeping track of all dmg dealt
					console.log("Your " + this.player.currentPokemon.Name + " used "+ playerMove.Name + " dealing "+ playerMove.Damage + " damage to " + this.enemy.currentPokemon.Name +"!");
				}
			}

			if(this.player.fainted() && this.player.sumHP()>0){
				console.log("Your " + this.player.currentPokemon.Name + " fainted! Pick a new pokemon.");
				choices = "";
				this.player.printGroup();
				for( var i in this.player.group){
					if (this.player.group[i].hp>0){
						choices = choices + (Number(i)+1);
					}
				}
				newPick = query("Which pokemon do you want to go next?", choices,false);
				this.player.currentPokemon = this.player.group[Number(newPick)-1];
			}else if(this.enemy.fainted()){
				console.log("The enemy " + this.enemy.currentPokemon.Name + " fainted!");
				this.changeEnemyPoke();
				console.log("The enemy send out " + this.enemy.currentPokemon.Name);
			}else{
				if(this.player.sumHP()==0){
					console.log("You were defeated, but managed to deal " + this.playerDmg + " damage and taking " + this.enemyDmg + " damage.")
				}else if(this.enemy.sumHP()==0){
					console.log("Congratulations! You've defeated the whole enemy team, dealing " + this.playerDmg + " damage, while taking " + this.enemyDmg + " damage!");
				}else{
					console.log("Something wrong happened! #1");
				}
			}
		}

	}

	this.changeEnemyPoke = function(){
		for(var i in this.enemy.group){
			if(this.enemy.group[i]>0){
				this.enemy.currentPokemon = this.enemy.group[i];
				return
			}
		}
	}

}

module.exports = {
	PokemonCLI : PokemonCLI
}