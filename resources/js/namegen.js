function generateName()
{
	var f1;
	var f2;
	var f3;
	
	var firstOption1 = new Array("Ga", "Sa", "Wi", "Me", "Ke", "Am", "Ji", "Ge", "We", "Ol", "Du", "We", "Bi", "Wi", "Be", "Sy", "Sh", "Lo", "Li", "Po", "Ki", "Dr", "Ba", "Ch", "Na", "Da", "Br");
	var firstOption2 = new Array("r", "am", "m", "ns", "be", "ls", "an", "n", "of", "es", "ra", "g", "est", "eg", "em", "iv", "il", "ll", "ga", "dn", "el", "ng", "la", "ro", "in", "iz", "o", "th", "l", "ga", "t", "vi");
	var firstOption3 = new Array("h", "ton", "an", "ey", "iel", "riel", "rial", "da", "m", "frey", "oun", "us", "en", "ia", "on", "om", "em", "iam", "by", "o", "ris", "t", "zt", "gi", "ith", "od", "d", "z", "", "");

	var lastOption1 = new Array("Da", "Mc", "Ma", "To", "Ch", "Sm", "Ba", "St", "Ga", "O'", "Du", "Pi", "Co", "Wa", "Ni", "Si", "Hi", "Kn", "Ho", "Du'", "Ak", "Uz", "Ur");
	var lastOption2 = new Array("vi", "qu", "re", "uch", "il", "i", "n", "m", "oi", "Ni", "tt", "ne", "do", "a", "ck", "on", "ox", "ov", "za", "ag");
	var lastOption3 = new Array("s", "een", "il", "ette", "der", "th", "ta", "ty", "d", "el", "rey", "cock", "rock", "nough", "ng", "ler", "er", "", "");

	//for (var i=0;i<firstOption1.length;i++)
	f1 = firstOption1[getRandom(firstOption1.length)];
	f2 = firstOption2[getRandom(firstOption2.length)];
	f3 = firstOption3[getRandom(firstOption3.length)];
	
	l1 = lastOption1[getRandom(lastOption1.length)];
	l2 = lastOption2[getRandom(lastOption2.length)];
	l3 = lastOption3[getRandom(lastOption3.length)];
	return (f1+f2+f3+" "+l1+l2+l3);
}

function getRandom(max)
{
	if (!parseInt(max))
		return "0";
	return Math.round(Math.random()*(max-1));
}