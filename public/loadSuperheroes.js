//Tamara Alhajj 100948027

window.addEventListener("load", function(){
	populateHeroes();
});

function populateHeroes(){
	
	var xhttp = new XMLHttpRequest();
	
	var heroList, dropdownHeroes, specify, textOut, dropdownOption;
	
	//get list of heroes
	xhttp.open("GET", "/allHeroes", false);
	xhttp.send();
	
	heroList = JSON.parse(xhttp.responseText);
	dropdownHeroes = document.getElementById("superheroes");
	
	//populate dropdown
	for(var i=0; i<heroList.superheroes.length; i++){
		specify = heroList.superheroes[i];
		textOut = heroList.superheroes[i].replace(".json","").replace("_"," ");
		dropdownOption = document.createElement("option");
		dropdownOption.value = specify;
		dropdownOption.innerHTML = textOut;
		dropdownHeroes.appendChild(dropdownOption);
	}
}

function getHero(){
	
	var xhttp = new XMLHttpRequest();
	
	var heroSelected = document.getElementById("superheroes");
	
	//get hero specified
	xhttp.open("GET", "/hero?name="+heroSelected.value, false);
	xhttp.send();

	var heroList = JSON.parse(xhttp.responseText);
	
	//fill hero info in display
	document.getElementById("name").innerHTML = heroList.name;
	document.getElementById("alterEgo").innerHTML = heroList.alterEgo;
	document.getElementById("jurisdiction").innerHTML = heroList.jurisdiction;
	document.getElementById("superpowers").innerHTML = heroList.superpowers.join("\n");
	
	//change style elements according to hero
	document.getElementById("display").style.backgroundColor = heroList.style.backgroundColor;
	document.getElementById("display").style.color = heroList.style.color;
	document.getElementById("display").style.borderColor = heroList.style.borderColor;
	
} 