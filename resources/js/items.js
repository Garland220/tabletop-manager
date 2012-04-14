var Quality = {
	LOW : 0,
	NORMAL : 1,
	MASTERWORK : 2
}

var Type = {
	MISC : 0,
	WEAPON : 1,
	ARMOR : 2,
	JEWELRY : 3,
	SCROLL : 4,
	WAND : 5,
	POTION : 6
}

var Material = {
	NONE : {value: 0, flammable: false, rusts: false},
	METAL: {value: 1, flammable: false, rusts: true},
	WOOD : {value: 2, flammable: true, rusts: false},
	CLOTH : {value: 3, flammable: true, rusts: false},
	LEATHER : {value: 4, flammable: false, rusts: false},
	DRAGONSCALE : {value: 5, flammable: false, rusts: false}
}

var Resource = {
	NONE : {value: 0, material: Material.NONE, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},

	// Metal
	IRON : {value: 1, material: Material.METAL, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},
	STEEL : {value: 2, material: Material.METAL, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},
	SILVER : {value: 3, material: Material.METAL, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},
	GOLD : {value: 4, material: Material.METAL, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},
	MITHRIL : {value: 5, material: Material.METAL, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},
	ADAMANTINE : {value: 6, material: Material.METAL, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},

	// Wood
	WOOD : {value: 101, material: Material.WOOD, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},
	LIVINGWOOD : {value: 101, material: Material.WOOD, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},

	// Cloth
	CLOTH : {value: 201, material: Material.CLOTH, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},

	// Leather
	LEATHER : {value: 301, material: Material.CLOTH, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0},

	// Dragon Scale
	REDSCALE : {value: 401, material: Material.DRAGONSCALE, hardness: 0, checkMod: 0, maxDexMod: 0, weightMod: 0}
}

var Size = {
	FINE :       {value: 0, sizeMod: 8, miscMod: 16, name: "Fine", code: "F"},
	DIMINUTIVE : {value: 1, sizeMod: 4, miscMod: 12, name: "Diminutive", code: "D"},
	TINY :       {value: 2, sizeMod: 2, miscMod: 8, name: "Tiny", code: "T"},
	SMALL :      {value: 3, sizeMod: 1, miscMod: 4, name: "Small", code: "S"},
	MEDIUM:      {value: 4, sizeMod: 0, miscMod: 0, name: "Medium", code: "M"},
	LARGE :      {value: 5, sizeMod: -1, miscMod: -4, name: "Large", code: "L"},
	HUGE :       {value: 6, sizeMod: -2, miscMod: -8, name: "Huge", code: "H"},
	GARGANTUAN : {value: 7, sizeMod: -4, miscMod: -12, name: "Gargantuan", code: "G"},
	COLOSSAL :   {value: 8, sizeMod: -8, miscMod: -16, name: "Colossal", code: "C"}
}

function Item(amount, type){
	this.CL = 0;
	this.Size = 0;
	this.Name = "";
	this.Value = 0;
	this.Weight = 0;

	this.Hardness = 0;
	this.HP = 0;
	
	this.Enchantment = 0;
	this.Amount = amount;
	this.Description = "";
	this.Material = Material.METAL;
	this.Resource = Resource.IRON;
	this.Quality = Quality.NORMAL;

	this.Cursed = false;
	this.Magical = false;
	this.Poisoned = false;
	this.Identified = false;

	this.Graphic = "A_Clothing01.png";

	if (type = null)
		this.Type = Type.MISC;
	else
		this.Type = type;

	if( typeof( Name ) == "undefined" )
		this.Name = "";

	this.GetWeight = function() {
		return this.Weight;
	}
	return true;
}
Item.prototype.Inherits = function(parent){
	if (parent == null)
		return
	if (arguments.length > 1)
		parent.apply(this, Array.prototype.slice.call( arguments, 1 ));
	else
		parent.call(this);
}
Item.prototype.className = function(){
	return /(\w+)\(/.exec(this.constructor.toString())[1];
}
Item.prototype.toString = function(){
	return this.className()+' "'+this.Name+'"';
}
Item.prototype.Serialize=function(){
	WriteInt(this.Type);
	WriteInt(this.CL);
	WriteInt(this.Size);
	WriteString(this.Name);
	WriteInt(this.Value);
	WriteInt(this.Weight);
	WriteInt(this.Enchantment);
	WriteInt(this.Amount);
	WriteString(this.Description);
	WriteString(this.Material);
	WriteInt(this.Cursed);
	WriteInt(this.Magical);
	WriteInt(this.Masterwork);
	WriteInt(this.Masterpiece);
	WriteInt(this.Identified);
}

function Container(){
	this.Inherits(Item, 1);
	this.Contents = [];
	this.TotalWeight = 0;
	this.WeightReduction = 0;
	this.SpaceMax = 0;
	this.LockDC = 0;

	this.ExtraDimensional = false;
	this.Locked = false;

	this.Graphic = "I_Chest01.png";

	this.Open = function(m) {
		if (Locked) {
			if (m != null)
				m.Message("Locked!");
		}
		return true;
	}

	this.AddItem = function(x) {
		this.Contents.push(x);
	}

	this.RemoveItem = function(x) {
		this.Contents.remove(x);
	}

	this.CheckHold = function(x, m) {
		if (m != null)
			return true;
		if (x != null) {
			if (x.Weight + this.GetWeight() < this.TotalWeight)
				return true;
		}
		return false;
	}

	this.ReOrder = function(x) {
		for (i=0;i<x.length;i++) {
			this.Contents.splice()
		}
		this.Contents = x;
	}

	this.MoveItem = function(x,y) {
		var item = x;
		this.Contents.remove(x);
		this.Contents.splice(y,0,item);
	}
	
	this.DisplayContents = function() {
		
	}

	this.GetWeight = function() {
		this.TotalWeight = 0;
		for (i=0;i<this.Contents.length;i++){
			if (this.Contents[i].GetWeight() != null && this.Contents[i].GetWeight() != 0)
				this.TotalWeight += this.Contents[i].GetWeight();
		}
		return this.WeightReduction > 0 ? parseInt(this.TotalWeight - (this.TotalWeight*(this.WeightReduction/100))) : this.TotalWeight;
	}
}

function Weapon(){
	this.Inherits(Item, 1, 1);
	this.Damage = "1d4";
	this.CriticalMulti = 2;
	this.CriticalRange = 19;
	this.Range = 0;
	this.Reach = false;
	this.Light = true;
	this.TwoHanded = false;
	this.Graphic = "W_Dagger001.png";
}

function Armor(){
	this.Inherits(Item, 1, 2);
	this.AC = 1;
	this.MaxDex = 6;
	this.CheckPenalty = 1;
	this.SpellFailure = 10;
	this.Name = "Leather Armor";
	this.Graphic = "A_Armour01.png";
}

function Shield(){
	this.Inherits(Armor);
	this.Name = "Buckler";
	this.Graphic = "E_Wood01.png";
}

function Jewelry(){
	this.Inherits(Item, 1, 3);
	this.Material = "Silver";
	this.Graphic = "Ac_Ring01.png";
}

function Scroll(amount, spell){
	this.Inherits(Potion, amount, spell);
	this.CommandWord = "";
	this.Graphic = "I_Scroll02.png";
}

function Potion(amount, spell){
	this.Inherits(Item, amount, 4);
	this.Spell = spell;
	this.SpellLevel = 0;
	this.CasterLevel = 1;
	this.Magical = true;
	this.IsArcane = false;
	this.Graphic = "P_Blue01.png";
}

function Wand(charges, spell){
	this.Inherits(Scroll, 1, spell);
	this.Charges = charges;
	this.Graphic = "S_Bow05.png";
}

function Rod(charges, spell){
	this.Inherits(Wand, charges, spell);
	this.Graphic = "S_Bow05.png";
}

function Light(){
	this.Inherits(Item, 1, 0);
	this.Radius = 30;
	this.Fuel = 0;
	this.Everburning = false;
	this.Graphic = "I_Torch02.png";
}

function Food(){
	this.Inherits(Item, 1, 0);
	this.Graphic = "I_C_Fish.png";
}

function Drink(){
	this.Inherits(Item, 1, 0);
	this.Graphic = "P_Blue01.png";
}

Container.Inherits( Item );
Weapon.Inherits( Item );
Armor.Inherits( Item );
Shield.Inherits( Armor )
Jewelry.Inherits( Item );
Potion.Inherits( Item );
Scroll.Inherits( Potion );
Wand.Inherits( Scroll );
Rod.Inherits( Wand );
Food.Inherits( Item );
Drink.Inherits( Item );