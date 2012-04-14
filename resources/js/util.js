var openMenu;
var origInputValue = Array();
var clearInputValue = Array();

function clickHandle( target ){
	if (!(/menu/.test(target.className)))
		toggleMenu(openMenu, "");
	if ((/menu/.test(target.className)))
		toggleMenuChild(target);
	//chatClickHook( target );
}

function toggleMenuChild( button ){
	toggleMenu($(button).find("div")[0]);
}

function toggleMenu( menu, id ){
	if ( !menu )
		menu = $(id);
	if ( openMenu && (menu != openMenu) )
		hideMenu( openMenu );

	if ( menu ){
		if ($(menu).is(":hidden"))
			showMenu( menu );
		else
			hideMenu( menu );
	}
}

function showMenu( menu ){
	if (!menu)
		return;
	$(menu).fadeIn(200);
	openMenu = menu;
}

function hideMenu( menu ){
	if (!menu)
		return;
	openMenu = null;
	$(menu).fadeOut(300);
}

function confirmLogout(){
	return confirm("Are you sure you want to log out?");
}

function confirmDelete(){
	return confirm("You are about to permenantly delete this. This action cannot be undone.");
}

String.prototype.format = function(){
	var s = this,
		i = arguments.length;

	while (i--)
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    return s;
};

String.prototype.endsWith = function(suffix){
	return (this.substr(this.length - suffix.length) === suffix);
}

String.prototype.startsWith = function(prefix){
	return (this.substr(0, prefix.length) === prefix);
}

function clearInput( thisObj )
{
	if(/password/.test(thisObj.className)){
		thisObj.type = "password";
		thisObj.style.color = "black";
		clearInputValue[thisObj.name] = true;
		if(!origInputValue[thisObj.name])
			origInputValue[thisObj.name] = thisObj.value;
		if (thisObj.value == origInputValue[thisObj.name])
			thisObj.value = "";
	}
	else if(!clearInputValue[thisObj.name]){
		clearInputValue[thisObj.name] = true;
		if(!origInputValue[thisObj.name])
			origInputValue[thisObj.name] = thisObj.value;
		thisObj.style.color = "black";
		if(thisObj.value == origInputValue[thisObj.name])
			thisObj.value = "";
	}
}

function replaceInput( thisObj ){
	if(/password/.test(thisObj.className) && clearInputValue[thisObj.name]){
		if (thisObj.value == ""){
			clearInputValue[thisObj.name] = false;
			thisObj.style.color = "#ccc";
			thisObj.value = origInputValue[thisObj.name];
			thisObj.type = "input";
		}
	}
	else if(thisObj.value == "" || thisObj.value == origInputValue[thisObj.name]){
		thisObj.style.color = "#ccc";
		thisObj.value = origInputValue[thisObj.name];
		clearInputValue[thisObj.name] = false;
	}
}

function createCookie(name,value,days){
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name){
	createCookie(name,"",-1);
}

function XMLLoad(xmlfile){
	if (window.XMLHttpRequest)
		xhttp=new XMLHttpRequest();
	else
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xhttp.open("GET",xmlfile,false);
	xhttp.send();
	return xhttp.responseXML;
	alert(xmlObj.xml);
}

function XMLSave(xmlfile){
}

function XMLStringLoad(txt){
	if (window.DOMParser){
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(txt,"text/xml");
	}
	else{ // Internet Explorer
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(txt);
	}
	return xmlDoc;
}

function XMLVerify(xmlDoc){
	// 0 Object is not initialized
	// 1 Loading object is loading data
	// 2 Loaded object has loaded data
	// 3 Data from object can be worked with
	// 4 Object completely initialized
	if (xmlDoc.readyState != 4)
		return false;
	return true;
}

Function.prototype.Inherits = function(parent){
	this.prototype = new parent();
	this.prototype.constructor = this;
}

/*Object.prototype.Inherits = function(parent){
	if (parent == null)
		return
	if( arguments.length > 1 )
		parent.apply( this, Array.prototype.slice.call( arguments, 1 ) );
	else
		parent.call( this );
}

Object.prototype.className = function(){
	return /(\w+)\(/.exec(this.constructor.toString())[1];
}

Function.prototype.Inherits = function(parent){
	this.prototype = new parent();
	this.prototype.constructor = this;
}*/