function Serializer() {

	this.data = "";

	this.Write = function(x) { data += x+","; }
	this.WriteInt = function(x) { this.Write(parseint(x)); }
	this.WriteString = function(x) { this.Write(x); }
	this.WritePlayer = function(x) { if(typeof(x().Serialize) == 'undefined') return; }
	this.WriteItem = function(x) {  }
	this.Close = function() { return data; }
}

function Deserializer(data) {

	this.Read = function() { return; }
}