
function tunel(){

    this.IsRunning=false;
    this.IntervalAnimation;
    this.Screen;
    this.multipler=0;
    this.adder=5.01;
    this.width; 
    this.halfWidth;
    this.height; 
    this.halfHeight;
    this.texture = [];
    this.distances = [];
    var self = this;
    this.init = function() {
            
        var canvas = document.getElementById('tunel-screen');
        if (canvas.getContext){
           ctx = canvas.getContext('2d');

            self.width = canvas.width;
            self.height = canvas.height;
            self.halfWidth = self.width/2;
            self.halfHeight = self.height/2;
            self.Screen = new Screen(ctx, self.width, self.height);
            
            self.ColorPalette = GenerateGrayScale();
            self.makeTexture();
            self.makeDistances();
            self.DrawTunel(0.52);
        }
            
    }

    this.Animate = function() {
       self.multipler += self.adder;

       self.DrawTunel(self.multipler);

        
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

    this.makeTexture = function() {
        self.texture = []
        
        for(var y=0; y < self.height; y++){
            self.texture[y]=[];      
            for(var x=0; x < self.width; x++){
                self.texture[y][x] = (x^y)%255   
            }
        }
    }

    this.makeDistances = function(){
        var ratio=32.0;
        
        for(y=0; y < self.height; y++){
            center_y = -y + self.halfHeight; // transform x/y to Cartesian coordinate system
            self.distances[y] = [];
            for(x=0; x < self.width; x++){
                center_x = x - self.halfWidth;
                //The bigger distance, the bigger texture should be, so X texture will be X/distance
                var distance = Math.sqrt(Math.pow(center_x,2)+Math.pow(center_y,2))+1; //distance from the center will use for X of Texture
                 //we want to bend texture 
                var xsize = Math.floor((x*ratio/distance));              
                var ysize = Math.floor((y*ratio/distance));  
                 self.distances[y][x] = {"xsize":xsize, "ysize":ysize};
            }
        }
    }

    this.DrawTunel = function (multipler){
        //_Screen.FillWithColor(ColorPalette[0]);
        var ratio=32.0;
        for(y=0; y < self.height; y++){
            for(x=0; x < self.width; x++){
              
                var distance = self.distances[y][x];
                var x_color = Math.floor(distance.xsize + self.width + self.multipler) % self.width;
                var y_color = Math.floor(distance.ysize + self.height + self.multipler) % self.height;
                
                var color = self.texture[y_color][x_color];
              
                self.Screen.SetPixel(x, y, self.ColorPalette[color]);  
        }
    }
          
    self.Screen.Draw();
}


    return this;
}




