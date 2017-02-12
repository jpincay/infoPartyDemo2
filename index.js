var calcDmg = function(attack,pokemon, opp){
	// pokemon and opp are Pokemon objects
	// attack is an attack object {Name: "", Type: "", Damage: ##}

	if(pokemon.Types.includes(attack.Type)){
		var STAB = 1.25; //increased dmg when pokemon matches attackType
	}else{
		var STAB = 1;
	}
	var power = attack.Damage;
	var atkDef = pokemon.atk/opp.def;
	console.log(effectiveness(attack.Type,opp.Types));
	return Math.floor(.5 * power * atkDef * STAB * effectiveness(attack.Type,opp.Types))+1;
}

var effectiveness = function(attackType, oppType){
	//attackType is a string of the type of attack being made
	//oppType is an array of pokemon types of the attack target
	var effective, noneffective;
	switch (attackType){
		case "Normal":
			// effective
			effective = checkContainment([""], oppType);
			// not effective
			noneffective = checkContainment(["Ghost","Rock","Steel"], oppType);
			break;
		case "Fire":
			effective = checkContainment(["Grass","Ice","Bug","Steel"], oppType);
			noneffective = checkContainment(["Fire","Water","Rock","Dragon"], oppType);
			break;
		case "Water":
			effective = checkContainment(["Fire","Ground","Rock"], oppType);
			noneffective = checkContainment(["Water","Grass","Dragon"], oppType);
			break;
		case "Electric":
			effective = checkContainment(["Water","Flying"], oppType);
			noneffective = checkContainment(["Ground","Electric","Grass","Dragon"], oppType);
			break;
		case "Grass":
			effective = checkContainment(["Water","Ground","Rock"], oppType);
			noneffective = checkContainment(["Fire","Grass","Poison","Flying","Bug",'Dragon','Steel'], oppType);
			break;
		case "Ice":
			effective = checkContainment(["Grass",'Ground','Flying','Dragon'], oppType);
			noneffective = checkContainment(["Fire","Water","Ice",'Steel'], oppType);
			break;
		case "Fight":
			effective = checkContainment(["Normal","Ice",'Rock','Dark','Steel'], oppType);
			noneffective = checkContainment(["Ghost","Poison","Flying",'Psychic','Bug','Fairy'], oppType);
			break;
		case "Poison":
			effective = checkContainment(["Grass",'Fairy'], oppType);
			noneffective = checkContainment(["Steel","Poison","Ground",'Rock','Ghost'], oppType);
			break;
		case "Ground":
			effective = checkContainment(["Fire",'Electric','Poison','Rock','Steel'], oppType);
			noneffective = checkContainment(['Flying','Grass','Bug'], oppType);
			break;
		case "Flying":
			effective = checkContainment(["Grass",'Fight','Bug'], oppType);
			noneffective = checkContainment(['Electric','Rock','Steel'], oppType);
			break;
		case "Psychic":
			effective = checkContainment(["Fight",'Poison'], oppType);
			noneffective = checkContainment(['Dark',"Psychic",'Steel'], oppType);
			break;
		case "Bug":
			effective = checkContainment(["Grass",'Psychic','Dark'], oppType);
			noneffective = checkContainment(['Fire','Fight','Poison','Flying','Ghost','Steel','Fairy'], oppType);
			break;
		case "Rock":
			effective = checkContainment(["Fire",'Ice','Flying','Bug'], oppType);
			noneffective = checkContainment(['Fight','Ground','Steel'], oppType);
			break;
		case "Ghost":
			effective = checkContainment(["Psychic",'Ghost'], oppType);
			noneffective = checkContainment(['Normal','Dark'], oppType);
			break;
		case "Dragon":
			effective = checkContainment(["Dragon"], oppType);
			noneffective = checkContainment(['Fairy','Steel'], oppType);
			break;
		case "Dark":
			effective = checkContainment(["Psychic",'Ghost'], oppType);
			noneffective = checkContainment(['Fight','Dark','Fairy'], oppType);
			break;
		case "Steel":
			effective = checkContainment(["Ice",'Rock','Fairy'], oppType);
			noneffective = checkContainment(['Fire','Water','Electric','Steel'], oppType);
			break;
		case "Fairy":
			effective = checkContainment(["Fight",'Rock','Fairy'], oppType);
			noneffective = checkContainment(['Fire','Poison','Steel'], oppType);
			break;
		default:
			console.log("Something went wrong with type info");
	}


	console.log(effective)
	console.log(noneffective)
	return 1*Math.pow(1.25, effective)*Math.pow(.8,noneffective);
}
