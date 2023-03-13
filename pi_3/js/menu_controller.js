function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
		window.location.assign("../index.html");
	}
	name = "";
}

function options(){
	loadpage("./html/options.html");
}


