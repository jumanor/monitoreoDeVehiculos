function cMarker(map,id,lat,lon){
  this.map=map;
  this.lat=lat;
  this.lon=lon;
  this.marker=null;
  this.id=id;	
  ///////////////////////////////////////////
  this.dibujar=function(){ 
	this.marker=new google.maps.Marker({
  		position:new google.maps.LatLng(this.lat,this.lon),
		map:this.map,
		title:this.id,
		//icon: 'beachflag.png'
  	});
	this.marker.setMap(this.map);
  }//////////////////////////////////////////
  this.remover=function(){
	if(this.marker!=null)
		this.marker.setMap(null);
  }//////////////////////////////////////////
  this.desplazarY=function(){
    this.lat+=0.01;

  }//////////////////////////////////////////
  this.desplazarX=function(){
    this.lon+=0.01;

  }//////////////////////////////////////////	
  this.getId=function(){
    return this.id;
  }//////////////////////////////////////////	
  this.update=function(lat,lon){
    this.lat=lat;
    this.lon=lon;	
  }//////////////////////////////////////////						
}
