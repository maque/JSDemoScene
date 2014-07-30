

$(document).ready(function(){
	
	 element = document.getElementById("Mandelbrot_set");
    c = element.getContext("2d");

    // read the width and height of the canvas
    width = element.width;
    height = element.height;

    // create a new batch of pixels with the same
    // dimensions as the image:
    imageData = c.createImageData(width, height);
	size=1;
	animate();
});

function animate(){
size-=0.01;
if(size<0.000001)size=1;
for(y=0;y<height;y++)
	
	for(y=0;y<height;y++){
		for(x=0;x<width;x++){
			col= getColor(x,y,size)*255;
			setPixel(imageData,x,y, col,col,col,255);
		}
	}
	c.putImageData(imageData, 0, 0);
	
	setInterval(animate, 15);
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function getColor(x,y, size){

	x0 = scale(x,0, width,-2.5*size,1.5*size);
	y0 = scale(y,0, height,1*size,-1*size);
	
	x = 0;
	y = 0;
	
	for(i=0;i<50;i++){
		if( x*x + y*y >4) {
			return 1;
		}
		
		xt = x;
		x = x*x - y*y + x0;
		y = 2*xt*y + y0;
	}
	
	return 0;
}

function scale (number, min, max, from, to){
	sizeOriginal = max - min;
	sizeResize = to - from;
	
	return (number/sizeOriginal)*sizeResize+from;

}