
function rotozoom(){

	this.IsRunning=false;
	this.IntervalAnimation;
	this.Screen;
	this.multipler=0;
	this.adder=0.01;
	this.width; 
	this.halfWidth;
	this.height; 
	this.halfHeight;
	this.ColorPalette;
	var self = this;
	this.init = function() {
			
		var canvas = document.getElementById('rotozoom-screen');
		if (canvas.getContext){
		   ctx = canvas.getContext('2d');

			self.width = canvas.width;
			self.height = canvas.height;
			self.halfWidth = self.width/2;
			self.halfHeight = self.height/2;
			self.Screen = new Screen(ctx, self.width, self.height);
			
			self.ColorPalette = GenerateGrayScale();
			
	        self.DrawChecker(0.52);
		}
			
	}

	this.Animate = function() {
	   self.multipler += self.adder;

	   self.DrawChecker(self.multipler);

	    if(self.multipler>2){
	        self.adder=-0.03;
	    } else if(self.multipler<-2){
	     	self.adder=0.03;
	    }
	    clearInterval(self.IntervalAnimation);
	    self.IntervalAnimation = setInterval(self.Animate, 50);
	}

	this.ToggleAnimation = function (){
	    self.IsRunning = !self.IsRunning;
	    if(!self.IsRunning){
	        clearInterval(self.IntervalAnimation)
	    } else {
	        self.Animate();
	    }
	}

	this.DrawChecker = function (multipler){
		//_Screen.FillWithColor(ColorPalette[0]);
		angle=multipler*Math.PI;
		cosinus_angle = Math.cos(angle);
		sinus_angle = Math.sin(angle);
	    for(y=0;y < self.height; y++){
			 center_y = -y + self.halfHeight; // transform x/y to Cartesian coordinate system
	         for(x=0; x < self.width; x++){
		        center_x = x - self.halfWidth;
				   
			    newx=Math.floor(cosinus_angle * center_x - center_y * sinus_angle) + center_x + self.halfWidth;
				newy=Math.floor(sinus_angle * center_x + center_y * cosinus_angle) + center_y + self.halfHeight;
			
			
				index = Math.abs(( newx * self.multipler) ^ ( newy * self.multipler))%256;
				   
				self.Screen.SetPixel(x,y,self.ColorPalette[index]);

	        }
	    }
			  
		self.Screen.Draw();
	}
	return this;
}




