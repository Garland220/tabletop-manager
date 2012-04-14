function debug(){
	var data = XMLLoad('test.xml');
	$("#main").empty();
	//document.getElementById('main').innerHTML += data.getElementsByTagName("name")[0].childNodes[0].nodeValue;
	for(var i=0;i<data.getElementsByTagName("item").length;i++)
	{
		for(var n=0;n<data.getElementsByTagName("item")[i].childNodes.length;n++)
		{
			var node = data.getElementsByTagName("item")[i].childNodes[n];
			document.getElementById('main').innerHTML+=node.nodeName +": "+ node.nodeValue+"<br />";
			alert(data.getElementsByTagName("item")[1].childNodes[0].nodeValue);
			return;
		}
	}
}