var IsRunning=false;
var IntervalAnimation;
var _Screen;
var multipler=0;
var adder=0.01;
var width, halfWidth;
var height, halfHeight;
function Init(){
		
	var canvas = document.getElementById('screen');
	if (canvas.getContext){
	   ctx = canvas.getContext('2d');

		width = canvas.width;
		height = canvas.height;
		halfWidth = width/2;
		halfHeight = height/2;
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
	cosinus_angle = Math.cos(angle);
	sinus_angle = Math.sin(angle);
    for(y=0;y<height;y++){
		 center_y=-y+halfHeight; // transform x/y to Cartesian coordinate system
         for(x=0;x<width;x++){
	        center_x=x-halfWidth;
			   
		    newx=Math.floor(cosinus_angle*center_x - center_y*sinus_angle)+center_x+halfWidth;
			newy=Math.floor(sinus_angle*center_x + center_y*cosinus_angle)+center_y+halfHeight;
		
		
			index = Math.abs((newx*multipler)^(newy*multipler))%256;
			   
			_Screen.SetPixel(x,y,ColorPalette[index]);

        }
    }
		  
	_Screen.Draw();
}


