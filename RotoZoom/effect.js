var IsRunning=true;
var IntervalAnimation;
var _Screen;
var multipler=0;
var adder=0.01;
var width;
var height;
function Init(){
		
	var canvas = document.getElementById('screen');
	if (canvas.getContext){
	   ctx = canvas.getContext('2d');

		width = canvas.width;
		height = canvas.height;
		
		_Screen = new Screen(ctx,width,height);
		
		GenerateGrayScale();
		
        //Animate();
	}
		
}

function Animate(){
    multipler+=adder;

   DrawChecker(multipler);

    if(multipler>2){
        adder=-0.03;
    } else if(multipler<-2){
     	adder=0.03;
    }
    clearInterval(IntervalAnimation);
    IntervalAnimation = setInterval(Animate, 50);
}

function ToggleAnimation(){
    IsRunning = !IsRunning;
    if(!IsRunning){
        clearInterval(IntervalAnimation)
    } else {
        Animate();
    }
}

function DrawChecker(multipler){
	_Screen.FillWithColor(ColorPalette[0]);
	angle=multipler*Math.PI;
    for(y=0;y<height;y++){
		 yy=-y+height/2;
         for(x=0;x<width;x++){
	        xx=x-width/2;
			   
		    newx=Math.floor(Math.cos(angle)*xx - yy*Math.sin(angle))+xx+320;
			newy=Math.floor(Math.sin(angle)*xx+yy*Math.cos(angle))+yy+240;
		
		
			index = Math.abs((newx*multipler)^(newy*multipler))%256;
			   
			_Screen.SetPixel(x,y,ColorPalette[index]);

        }
    }
		  
	_Screen.Draw();
}


