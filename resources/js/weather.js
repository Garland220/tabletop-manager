function Weather(){
	/* 0 Normal, 1 overcast, 2 abnormal weather, 3 rain, 4 storm, 5 powerful storm */
	this.Type = 0;
	this.Rain = 0;
	this.Temp = 0;
	this.TempLow = 0;
	this.TempHigh = 0;
	this.WindSpeed = 0;
	this.PrecipPerc = 0;
	this.Climate = 0;
}
Weather.prototype.Generate=function(){
	$("#weather").empty();
	var result = roll("1d100+0");
	
	if (this.Climate == 0) // Temperate (Warm)
		this.Temp = roll("1d25+60");
	else if (this.Climate == 1) // Temperate (Moderate)
		this.Temp = roll("1d20+40");
	else if (this.Climate == 2) // Cold
		this.Temp = roll("1d40+0");
	else // Desert
		this.Temp = roll("1d30+85");

	if (result < 50){ // Normal
		wType = 0;
		this.WindSpeed = roll("1d30+0");
	}
	else if (result < 70){ // Overcast
		this.Type = 1;
		this.Temp -= roll("1d10+1");

		wInfo = "The sky is heavily overcast.\n\n";
		this.WindSpeed = roll("1d30+0");
	}
	else if (result < 80){ // Coldsnap / Heatwave
		this.Type = 2;

		var change = roll("1d100+0");
		if (change < 31)
			this.Temp += 10;
		else
			this.Temp -= 10;
		this.WindSpeed = roll("1d30+0");
	}
	else if (result < 90){ // Rain
		this.Type = 3;
		
		wInfo = this.Precipitate()+"\n\n";
		this.WindSpeed = roll("1d50+0");
	}
	else if (result < 99){ // Storm
		this.Type = 4;
		this.Storm(false);
		this.WindSpeed = roll("1d80+20");
	}
	else if (result == 100){ // Severe Storm
		this.Type = 5;
		this.Storm(true);
		this.WindSpeed = roll("1d300+30");
	}

	if (parseInt(tempMod))
		this.Temp += parseInt(tempMod);
	this.Temp -= parseInt(this.WindSpeed/11);

	if (this.Temp > 110)
		wInfo += "It is a dangerously hot day. [Each character must make a Fortitude save once every 10 minutes (DC 15, +1 for each previous check) or take 1d4 points of nonlethal damage. Characters in heavy clothing or armor a -4 penalty on this save. A character with the Survival skill may receive a bonus on this saving throw and may be able to apply this bonus to other characters as well. Characters reduced to unconsciousness begin taking lethal damage (1d4 points per each 10-minute period).]";
	else if (this.Temp > 90)
		wInfo += "It is a miserably hot day. [Each character must make a Fortitude save each hour (DC 15, +1 for each previous check) or take 1d4 points of nonlethal damage. Characters in heavy clothing or armor -4 penalty on this saves. A character with the Survival skill may receive a bonus on this saving throw and may be able to apply this bonus to other characters as well. Characters reduced to unconsciousness begin taking lethal damage (1d4 points per hour).]";
	else if (this.Temp > 80)
		wInfo += "It is a hot and muggy day.";
	else if (this.Temp > 60)
		wInfo += "It is a very warm day.";
	else if (this.Temp > 40)
		wInfo += "It is a cool day.";
	else if (this.Temp > 30)
		wInfo += "It is a cold day. [An unprotected character must make a Fortitude save each hour (DC 15, + 1 per previous check) or take 1d6 points of nonlethal damage. A character who has the Survival skill may receive a bonus on this saving throw and may be able to apply this bonus to other characters as well.]";
	else if (this.Temp > 0)
		wInfo += "It is freezing cold. [An unprotected character must make a Fortitude save each hour (DC 15, + 1 per previous check) or take 1d6 points of nonlethal damage. A character who has the Survival skill may receive a bonus on this saving throw and may be able to apply this bonus to other characters as well.]";
	else if (this.Temp > -20)
		wInfo += "It is freezing cold. [An unprotected character must make a Fortitude save each hour (DC 15, + 1 per previous check) or take 1d6 points of nonlethal damage. A character who has the Survival skill may receive a bonus on this saving throw and may be able to apply this bonus to other characters as well.]";
	else if (this.Temp > -459)
		wInfo += "It is as cold as death's embrace... [Extreme cold deals 1d6 points of lethal damage per minute (no save). In addition, a character must make a Fortitude save (DC 15, +1 per previous check) or take 1d4 points of nonlethal damage. Those wearing metal armor or coming into contact with very cold metal are affected as if by a chill metal spell.]";
	else
		wInfo += "It is absolute zero, you are dead.";

	wInfo += "\n\n";

	if (this.WindSpeed <= 1)
		wInfo += "There is virtually no wind.";
	else if (this.WindSpeed <= 10)
		wInfo += "There is a gentle breeze.";
	else if (this.WindSpeed <= 20)
		wInfo += "There is a steady wind with a 50% chance of extinguishing small, unprotected flames, such as candles.";
	else if (this.WindSpeed <= 30)
		wInfo += "Gusts of wind automatically extinguish unprotected flames (candles, torches, and the like). Such gusts also impose a -2 penalty on ranged attack rolls and on Listen checks.";
	else if (this.WindSpeed <= 50)
		wInfo += "In addition to automatically extinguishing any unprotected flames, winds of this magnitude cause protected flames (such as those of lanterns) to dance wildly and have a 50% chance of extinguishing these lights. Ranged weapon attacks and Listen checks are at a -4 penalty. This is the velocity of wind produced by a gust of wind spell. ";
	else if (this.WindSpeed < 95)
		wInfo += "Winds powerful enough to bring down branches if not whole trees, blast through the region. Automatically extinguish unprotected flames and have a 75% chance of blowing out protected flames, such as those of lanterns. Ranged weapon attacks are impossible, and even siege weapons have a -4 penalty on attack rolls. Listen checks are at a -8 penalty due to the howling of the wind. ";
	else
		wInfo += "All flames are extinguished. All ranged attacks are impossible, as are Listen checks. Instead of being blown away (see Table: Wind Effects), characters in close proximity to a tornado who fail their Fortitude saves are sucked toward the tornado. Those who come in contact with the actual funnel cloud are picked up and whirled around for 1d10 rounds, taking 6d6 points of damage per round, before being violently expelled (falling damage may apply). The funnel moves forward at an average of 30 mph (roughly 250 feet per round), uprooting trees, destroying buildings, and causing other similar forms of major destruction.";

	this.TempLow = this.Temp-roll("1d10+10");
	this.TempHigh = this.Temp+roll("1d6+1");
	$("#weather").append("Temperature: "+this.Temp+"&deg;\n Low: "+this.TempLow+"&deg;\nWind Speed: "+this.WindSpeed+" mph\n\n" +wInfo+"\n");
}
Weather.prototype.Storm=function(severe){
	if (this.Climate == 0 || this.Climate == 1){ // Temerate (Warm)
		if (this.Temp < 30){
			if (severe){
				r = roll("1d3+0");
				wInfo += "A hard blizzard bombards the region. Heavy snow ["+r+" feet], and bitter cold make blizzards deadly for all who are unprepared for them. ";
			}
			else{
				r = roll("1d6+0");
				wInfo += "A snowstorm obscures your vision. Snowstorms leave "+r+" inches of snow on the ground afterward.";
			}
		}
		else{
			if (severe)
				wInfo += "There is a booming thunderstorm overhead!\n In addition to wind and precipitation, thunderstorms are accompanied by lightning that can pose a hazard to characters without proper shelter (especially those in metal armor). As a rule of thumb, assume one bolt per minute for a 1-hour period at the center of the storm. Each bolt causes electricity damage equal to 1d10 eight-sided dice. ";
			else
				wInfo += "There is a booming thunderstorm overhead!\n In addition to wind and precipitation (usually rain, but sometimes also hail), thunderstorms are accompanied by lightning that can pose a hazard to characters without proper shelter (especially those in metal armor). As a rule of thumb, assume one bolt per minute for a 1-hour period at the center of the storm. Each bolt causes electricity damage equal to 1d10 eight-sided dice. One in ten thunderstorms is accompanied by a tornado (see below). ";
		}
	}
	else if (this.Climate == 2){ // Cold
		if (severe){
			r = roll("1d3+0");
			wInfo += "A hard blizzard bombards the region. Heavy snow ["+r+" feet], and bitter cold make blizzards deadly for all who are unprepared for them. ";
		}
		else{
			r = roll("1d6+0");
			wInfo += "A snowstorm obscures your vision. Snowstorms leave "+r+" inches of snow on the ground afterward.";
		}
	}
	else{ // Hot
		if (severe){
		}
		else{
		}
	}
	wInfo += "\nVisibility range reduced by three quarters [-8 penalty on Spot, Search, and Listen checks] Storms make ranged weapon attacks impossible. Automatically extinguish unprotected flames. They cause protected flames, such as those of lanterns, to dance wildly and have a 50% chance to extinguish these lights. ";
}
Weather.prototype.Precipitate=function(){
	/* 0-30 fog, 31-90 rain, 91-100 hail */
	PrecipPerc = roll("1d100+0");
	var r = roll("1d4+0");
	var w = "";
	
	if (PrecipPerc <= 30){
		w = "A thick fog has settled in the region. [20% concealment beyond 5ft. Lasts "+roll("2d4+0")+" hours]";
		this.WindSpeed = roll("1d20+0");
	}
	else if (PrecipPerc <= 90){
		r = roll("1d100+0")<= 50 ? "and extinguishes protected flames." : "does not extinguish protected flames.";
		if (this.Temp < 31){
			w = "Heavy snow covers everything around you. [-4 Perception, and ranged weapon rolls. Costs 2 movement to enter a square of snow. Lasts "+roll("2d4+0")+" hours]";
		}
		else{
			w = "Heavy rain pelts the earth from thick storm clouds. [-4 Perception, and ranged weapon rolls. Autoextinguish unprotected flames, "+r+" Lasts "+roll("2d4+0")+" hours]";
		}
	}
	else{
		if (this.Temp < 31){
			r = roll("1d100+0")<= 75 ? "and extinguishes protected flames." : "does not extinguish protected flames.";
			w = "Sleet and rain conver and obscure the region. [-4 Perception, and ranged weapon rolls. Autoextinguish unprotected flames, "+r+" Costs 2 movement to enter a square of snow. Lasts "+roll("2d4+0")+" hours]";
		}
		else{
			r = roll("1d100+0")<= 50 ? "and extinguishes protected flames." : "does not extinguish protected flames.";
			var r2 = roll("1d100+5") <= 5 ? " Deals 1 lethal damage to everything not protected in the region." : "";
			w = "Hail and rain hammer down. [-4 Perception, and ranged weapon rolls. Autoextinguish unprotected flames, "+r+" Costs 2 movement to enter a square of hail."+r2+" Lasts "+roll("1d4+0")+" hours]";
		}
		this.WindSpeed = roll("1d60+0");
	}
	return w;
}