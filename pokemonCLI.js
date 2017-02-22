
var build = require ("./build.js");
var myPokemon = require("./myPokemon.js");
var query = require("cli-interact").getChar;

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
		console.log("===============OPPONENT===============");
		console.log("You're opponent has the following Pokemon with 'perfect' stats");
		this.enemy.printGroup();
		console.log("===============YOUR POKEMON===============");
		console.log("You have the following Pokemon (a group you've filtered from 10,000 groups of random Pokemon)");
		this.player.printGroup();
		console.log("===============START!===============");
		console.log("Time to battle! Your score is calculated by the amount of damage you do to the enemy team (Max of " + this.enemy.FULLHP +")");
	}

	this.startGame = function(){
		// Ask which pokemon to use first?
		var temptypes = this.enemy.currentPokemon.Types.length > 1 ? this.enemy.currentPokemon.Types[0] + " + " +this.enemy.currentPokemon.Types[1]: this.enemy.currentPokemon.Types[0];
		console.log("Your opponent sent out " + this.enemy.currentPokemon.Name+ " ("+ temptypes +") with " + this.enemy.currentPokemon.hpMax + " health!");
		console.log("Select a pokemon to go first")
		for(var i in this.player.group){
			console.log((Number(i)+1) + ". "+ this.player.group[i].Name);
		}

		var ans = query("Which pokemon do you want to go first? (1-6)", "123456", false);
		this.player.currentPokemon = this.player.group[Number(ans-1)];


		while(this.player.sumHP()>0&&this.enemy.sumHP()>0){

			console.log("==============FIGHT==============");
			// Looping until all pokemon from player or enemy fainted
			var enemyMove, playerMove, newPick, choices;
			var firstSecond = Math.random()>.5; //decides which pokemon attacks first/second (random)
			while (!this.player.fainted()&&!this.enemy.fainted()){
				if(firstSecond){
					this.enemyTurn();
					if(!this.player.fainted()){
						this.playerTurn();
					}
				}else{
					this.playerTurn();
					if(!this.enemy.fainted()){
						this.enemyTurn();
					}
				}
			}


			// while (!this.player.fainted()&&!this.enemy.fainted()){
			// 	//"perfect" enemy always goes first
			// 	this.enemyTurn();
			// 	if(!this.player.fainted()){
			// 		this.playerTurn();
			// 	}
			// }
			console.log("==============RESULTS==============");
			if(this.player.fainted() && this.player.sumHP()>0){
				console.log("Enemy " + this.enemy.currentPokemon.Name + " has " + this.enemy.currentPokemon.hp + "/"+this.enemy.currentPokemon.hpMax +" health left")
				console.log("Your " + this.player.currentPokemon.Name + " fainted! Pick a new pokemon.");
				choices = "";
				for( var i in this.player.group){
					var temptypes = this.player.group[i].Types.length > 1 ? this.player.group[i].Types[0] + " + " +this.player.group[i].Types[1]: this.player.group[i].Types[0];
					if (this.player.group[i].hp==0){
						console.log((Number(i)+1)+". " + this.player.group[i].Name + " STATUS: Fainted!");
					}else{
						choices = choices + (Number(i)+1);
						console.log((Number(i)+1)+". "+this.player.group[i].Name + " TYPE : " + temptypes + " HP: " + this.player.group[i].hp + " ATK: " + Math.floor(this.player.group[i].atk) + " DEF: " + Math.floor(this.player.group[i].def));
					}
				}

				newPick = query("Which pokemon do you want to go next?", choices,false);
				this.player.currentPokemon = this.player.group[Number(newPick)-1];
			}else if(this.enemy.fainted() && this.enemy.sumHP()>0){
				console.log("The enemy " + this.enemy.currentPokemon.Name + " fainted!");
				this.changeEnemyPoke();
				var temptypes = this.enemy.currentPokemon.Types.length > 1 ? this.enemy.currentPokemon.Types[0] + " + " +this.enemy.currentPokemon.Types[1]: this.enemy.currentPokemon.Types[0];
				console.log("Your opponent sent out " + this.enemy.currentPokemon.Name+ " ("+ temptypes +") with " + this.enemy.currentPokemon.hpMax + " health!");
			}else{
				if(this.player.sumHP()==0){
					console.log("You were defeated, but managed to deal " + this.playerDmg + "/"+this.enemy.FULLHP+ " damage and taking " + this.enemyDmg + " damage.")
				}else if(this.enemy.sumHP()==0){
					console.log("The enemy " + this.enemy.currentPokemon.Name + " fainted!");
					console.log("Congratulations! You've defeated the whole enemy team, dealing " + this.playerDmg + " damage, while taking " + this.enemyDmg + "/"+this.player.FULLHP+ " damage!");
				}else{
					console.log("Something wrong happened! #1");
				}
			}
		}

	}

	this.enemyTurn = function(){
		var tempHP = this.player.currentPokemon.hp;
		enemyMove = this.enemy.dealDmg(this.player.currentPokemon);
		if (tempHP - enemyMove.Damage < 0){
			this.enemyDmg = this.enemyDmg + enemyMove.Damage + (tempHP - enemyMove.Damage) ; //keeping track of all dmg dealt
		}else{
			this.enemyDmg = this.enemyDmg + enemyMove.Damage;
		}
		console.log("Enemy " + this.enemy.currentPokemon.Name + " used "+ enemyMove.Name + " dealing "+ enemyMove.Damage + " damage to " + this.player.currentPokemon.Name +"!");
	}

	this.playerTurn = function(){
		var tempHP = this.enemy.currentPokemon.hp;
		playerMove = this.player.dealDmg(this.enemy.currentPokemon);
		if (tempHP - playerMove.Damage < 0){
			this.playerDmg = this.playerDmg + playerMove.Damage + (tempHP - playerMove.Damage) ; //keeping track of all dmg dealt
		}else{
			this.playerDmg = this.playerDmg + playerMove.Damage;
		}
		console.log("Your " + this.player.currentPokemon.Name + " used "+ playerMove.Name + " dealing "+ playerMove.Damage + " damage to " + this.enemy.currentPokemon.Name +"!");
	}

	this.changeEnemyPoke = function(){
		for(var i in this.enemy.group){
			if(this.enemy.group[i].hp>0){
				this.enemy.currentPokemon = this.enemy.group[i];
				return
			}
		}
	}

}

module.exports = {
	PokemonCLI : PokemonCLI
}