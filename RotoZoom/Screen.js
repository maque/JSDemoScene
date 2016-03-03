// JavaScript Document
function Screen(ctx,width,height){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    
    this.imageData = ctx.createImageData(width, height);
    this.detachedData = this.imageData.data;
    
    return this;
}

Screen.prototype.SetPixel = function(x,y,color) { 
    index = (x + y * this.width) * 4;
    this.detachedData[index+0] =  color.r;
    this.detachedData[index+1] =  color.g;
    this.detachedData[index+2] =  color.b;
    this.detachedData[index+3] =  color.a;
} 

Screen.prototype.FillWithColor = function(color) { 
	for(i=0;i<this.width*this.height*4;i+=4){
    	this.detachedData[i] = color.r;
        this.detachedData[i+1] = color.g;
        this.detachedData[i+2] = color.b;
        this.detachedData[i+3] = color.a;
	}
}



Screen.prototype.Draw = function(color) { 
	this.imageData.data = this.detachedData;
	this.ctx.putImageData(this.imageData, 0, 0); 
}  

