// JavaScript Document

function Color(){
    this.r=0;
    this.g=0;
    this.b=0;
    this.a=255;
    
    return this;
}
function Color(r,g,b){
    this.r=r;
    this.g=g;
    this.b=b;
    this.a=255;
    
    return this;
}


ColorGray= function(x){
	return new Color(x,x,x);
};

ColorWhite = function() { 
	return new Color(255,255,255);
}; 
ColorRed = function() { 
	return new Color(255,0,0);
}; 

GenerateGrayScale = function() { 
   var ColorPalette=new Array();
   for(var i=0;i<256;i++){
       
        ColorPalette[i]=ColorGray(i);
   }
   return ColorPalette;
}; 


