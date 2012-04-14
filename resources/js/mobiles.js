var Alignment = {
	LAWFUL : {value: 0, name: "Good", code: "G"},
	NEUTRAL : {value: 1, name: "Neutral", code: "N"},
	CHAOTIC : {value: 2, name: "Chaotic", code: "C"}
}

var Alignment2 = {
	GOOD : {value: 0, name: "Good", code: "G"},
	NEUTRAL : {value: 1, name: "Neutral", code: "N"},
	EVIL : {value: 2, name: "Evil", code: "E"}
}

function Mobile(id){
	this.ID = id;
	this.ECL = 0;
	this.Name = "";
	this.Food = 0;
	this.Water = 0;
	this.AC = 0;
	this.HP = 0;
	this.Fort = 0;
	this.Reflex = 0;
	this.Will = 0;
	this.Perception = 0;
	this.Initiative = 0;

	this.Portrait = "";
	this.Alignment = Alignment.NEUTRAL;
	this.Alignment2 = Alignment2.NEUTRAL;
	this.Female = false;
	this.NeedsSustenance = true;

	this.Classes = new Array();
	this.Inventory = new Container();

	this.Save = function(){
		var data = "1"; // version
		data += this.ID;
		data += this.ECL;
		data += encode(this.Name);
		data += this.Food;
		data += this.Water;
		data += this.AC;
		data += this.HP;
		data += this.Fort;
		data += this.Reflex;
		data += this.Will;
		data += this.Perception;
		data += this.Initiative;
		data += encode(this.Portrait);
		data += this.Alignment.value;
		data += this.Alignment2.value;
		data += this.Female;
		data += this.NeedsDustenance;
		data += this.Classes;
		data += this.Inventory;
	}
}
Mobile.prototype.Inherits = function(parent){
	if (parent == null)
		return
	if (arguments.length > 1)
		parent.apply(this, Array.prototype.slice.call( arguments, 1 ));
	else
		parent.call(this);
}
Mobile.prototype.toString = function(){
	return this.className()+' "'+this.Name+'"';
}
Mobile.prototype.className = function(){
	return /(\w+)\(/.exec(this.constructor.toString())[1];
}
Mobile.prototype.Eat=function(){
	if (this.Food > 0)
		this.Food = this.Food - 1;
}
Mobile.prototype.Drink=function(){
	if (this.Water > 0)
		this.Water = this.Water - 1;
}
Mobile.prototype.Serialize=function(){
	WriteInt(this.ID);
	WriteString(this.Name);
	WriteInt(this.Level);
	WriteInt(this.Food);
	WriteInt(this.Water);
	WriteInt(this.HP);
	WriteInt(this.AC);
	WriteInt(this.Fort);
	WriteInt(this.Reflex);
	WriteInt(this.Will);
	WriteInt(this.Perception);
	WriteInt(this.Initiative);
}

function Player(id){
	this.Inherits( Mobile, id);
	this.Owner = "";
}
Mobile.prototype.Serialize=function(){
	WriteString(this.Owner);
}

Player.Inherits( Mobile );