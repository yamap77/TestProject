function Station(arr) {
	
}
//static
Station.createStnObj = function(arr){
	if('lat' in arr){
		return new FawnStation(arr);
	}else if('latitude' in arr){//latitude
		return new MadisStation(arr);
	}else{
		return new GladStoneFamilyStation(arr);
	}
	
}
Station.prototype.getStationTitle = function(){
	return this.stnName + ' - ' +  this.type;
}
Station.prototype.round = function(num, precision){
 var base = 1;
 while(precision > 0){
	base *= 10;
	precision--;
 }
 return Math.round(num*base)/base;
}
Station.prototype.pixelDistance=function(stn, pixelPerRadLat, pixelPerRadLng){
	var y = (this.lat - stn.lat > 0 ? this.lat - stn.lat: stn.lat - this.lat);
	var x = (this.lng - stn.lng > 0 ? this.lng - stn.lng: stn.lng - this.lng);
	y = y * pixelPerRadLat;
	x = x * pixelPerRadLng;
	return Math.sqrt(x * x + y * y);
}

Station.prototype.toString = function(){
	var str = "";
	for(var key in this){
		if(this.hasOwnProperty(key)){
			str += key+":"+this[key]+",";
		}
	}
	return str;
}