/*
 * Daily Events [Pathfinder, jQuery]
 */

var noSave = false;
var debug = false;

var wInfo = "";
var tempMod = 0;

var Players = new Array(); // Stores player names and info
var Weathers = new Array();
var CurrentWeather;
var Climate;

$(document).ready(function(){
});

function addInput(data, save){
	var player = new Player(Players.length);
	if (data != null)
	{
		player.Name = data.Name;
		player.Food = data.Food;
		player.Water = data.Water;
		player.AC = data.AC;
		player.HP = data.HP;
		player.Level = data.Level;
		player.Fort = data.Fort;
		player.Reflex = data.Reflex;
		player.Will = data.Will;
		player.Perception = data.Perception;
		player.Initiative = data.Initiative;
	}
	Players.push(player);
	display();
	if (save)
		saveData();
}

function createCell(id,value){
	if(id == null)
		return;
	var input = createInput(id, Players[id].Name, "player");
	var foodDisplay = createInput(id, Players[id].Food, "food");
	var waterDisplay = createInput(id, Players[id].Water, "water");
	var acDisplay = createInput(id, Players[id].AC, "ac");
	var hpDisplay = createInput(id, Players[id].HP, "hp");
	var initDisplay = createInput(id, Players[id].Initiative, "init");
	var fortDisplay = createInput(id, Players[id].Fort, "fort");
	var reflexDisplay = createInput(id, Players[id].Reflex, "reflex");
	var willDisplay = createInput(id, Players[id].Will, "will");
	var perDisplay = createInput(id, Players[id].Perception, "per");
	return "<tr><td>"+input+"</td><td>"+foodDisplay+"</td><td>"+waterDisplay+"</td><td>"+acDisplay+"</td><td>"+hpDisplay+"</td><td>"+initDisplay+"</td><td>"+fortDisplay+"</td><td>"+reflexDisplay+"</td><td>"+willDisplay+"</td><td>"+perDisplay+"</td></tr>";
}

function createInput(id,value, type){
	var empty = "";
	if ((type == "water" || type == "food") && parseInt(value) <= 0)
		empty = " empty"
	return "<input type='text' class='text "+type+empty+"' id='"+type+" "+id+"' placeholder='empty' onChange='javascript:saveValue("+id+",this.value,\""+type+"\")' value='"+ value +"'><br>";
}

function createKey(){
	return "<tr id='key'><td>Name</td>"+
		"<td width='10'><center><img src='images/icons/interface/chicken16.gif' alt='food' title='Food' /></center></td>"+
		"<td width='10'><center><img src='images/icons/interface/mug16.gif' alt='water' title='Drink' /></center></td>"+
		"<td width='10'><center><img src='images/icons/interface/ac.png' alt='AC' title='AC' /></center></td>"+
		"<td width='10'><center><img src='images/icons/interface/hp.png' alt='HP' title='HP' /></center></td>"+
		"<td width='10'><center><img src='images/icons/interface/initiative.png' alt='Initiative' title='Initiative' /></center></td>"+
		"<td width='10'><center><img src='images/icons/interface/fort.png' alt='Fortitude' title='Fortitude' /></center></td>"+
		"<td width='10'><center><img src='images/icons/interface/reflex.png' alt='Reflex' title='Reflex' /></center></td>"+
		"<td width='10'><center><img src='images/icons/interface/will.png' alt='Will' title='Will' /></center></td>"+
		"<td width='10'><center>Per</center></td>"+
		"</tr>";
}

function dailyLoad(){
	//alert(readCookie("players"));
	Players = new Array();
	if ($('#players') == null)
		return;
	if (noSave)
		eraseCookie("players");
	if (readCookie("players") != null){
		var temp = eval(readCookie("players"));
		for (var i=0;i<temp.length;i++)
			addInput(temp[i], false);
	}
	if (readCookie("tempMod") != null){
		tempMod = readCookie("tempMod").split(",");
		$('#tempMod').val(tempMod);
	}
	if (readCookie("climate") != null){
		Climate = readCookie("climate");
		$("#climate").val(Climate);
	}
	generateWeather();
}

function deleteInput(){
	if (Players.length > 0)
		Players.pop();
	display(); 
}

function display(){
	if ($('#players') == null)
		return;
	$("#players").empty();
	$("#players").append(createKey());
	for (var i=0;i<Players.length;i++)
		$("#players").append(createCell(i));
}

function generateDayDescription(time){
	if (time != 0 || time != 1)
		time = 0; //  morning (a.m.)

	var start;
	var mid;
	var end;

	var startMornOptions = new Array("The sun rises", "The sun crests", "The golden light of morning burns", "The soft glow of the sun pierces", "Dawn breaks, and rays of light shine");
	var startNightOptions = new Array("The moon rises", "The moon hangs dimly", "Moonlight shines");
	var midMornOptions = new Array("across the horizon,", "in the distance,");
	var midNightOptions = new Array("in the darkened sky,", "behind the thin clouds of night,");
	var hotMornOptions = new Array("bringing with it heavy waves of heat.", "causing a sweat to break on your brow.");
	var hotNightOptions = new Array("providing a small relief from the seemingly endless heat of the day.");
	var warmMornOptions = new Array("", "in the distance,");
	var warmNightOptions = new Array("as you are wrapped in nights cooling breeze.");
	var coldMornOptions = new Array("giving you slightly more warms than the cold night allowed you.", "allowing you to feel a momentary escape from this cold.");
	var coldMornOptions = new Array("");
}

function generateWeather(){
	/* 0 Temperate (Warm), 1 Temperate (Moderate), 1 Cold, 2 Desert */
	if (Climate == null || !parseInt(Climate) || Climate > 2)
		Climate = 0;
	wInfo = "";

	CurrentWeather = new Weather();
	CurrentWeather.Climate = Climate;
	CurrentWeather.Generate();
}

function advanceDay(){
	subtractNeeds();
	generateWeather();
}

function saveData(){
	//alert(Players.length);
	//alert(readCookie("players"));
	eraseCookie("players");
	eraseCookie("tempMod");
	eraseCookie("climate");
	eraseCookie("weather");
	if (!noSave){
		createCookie("players", Players.toSource(), 30);
		createCookie("tempMod", $('#tempMod').val(), 30);
		createCookie("climate", $("#climate").val(), 30);
		createCookie("weather", $('#weather').html(), 30);
	}
}

function saveValue(intId,strValue,type){
	if (type == "player")
		Players[intId].Name=strValue;
	else if (type == "food")
		Players[intId].Food=strValue;
	else if (type == "water")
		Players[intId].Water=strValue;
	else if (type == "ac")
		Players[intId].AC=strValue;
	else if (type == "hp")
		Players[intId].HP=strValue;
	else if (type == "init")
		Players[intId].Initiative=strValue;
	else if (type == "fort")
		Players[intId].Initiative=strValue;
	else if (type == "reflex")
		Players[intId].Initiative=strValue;
	else if (type == "will")
		Players[intId].Initiative=strValue;
	else if (type == "per")
		Players[intId].Initiative=strValue;
	display();
	saveData();
}

function subtractNeeds(){
	for(var i=0;i<Players.length;i++){
		if (Players[i].NeedsSustenance){
			Players[i].Eat();
			Players[i].Drink();
		}
	}
	display();
	saveData();
}

function updateTempMod(mod){
	tempMod = mod;
	saveData();
}

function updateClimate(climate){
	Climate = climate;
	saveData();
}