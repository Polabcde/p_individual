function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function phaser_game(){
	loadpage("./html/phasergame.html");
}

function exit (){
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

function game_mode(){
	loadpage("./html/modes.html");
}