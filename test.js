var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;
var enemyAmount = 1;
enchant();

window.onload = function(){
    var game = new Core(320,320);
    game.preload('images/chara5.png','images/map0.png');

    game.onload = function(){
        //background
        var bg = new Sprite(320,320);
        var maptip = game.assets['images/map0.png'];
        var image = new Surface(320,320);
        for(var j=0; j<320; j+=16){
            for(var i=0; i<320; i+=16){
                image.draw(maptip,0,0,16,16,i,j,16,16);
            }
        }
        bg.image = image;
        game.rootScene.addChild(bg);

        //player 1 class
        var Player1 = enchant.Class.create(enchant.Sprite,{
            initialize: function(){

            },
            remove: function(){

            }
        });

        var Enemy = enchant.Class.create(enchant.Sprite,{
            initialize: function(x,y,speed){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara5.png'];
                this.x = x - 16;
                this.y = y - 16;
                this.frame = 7; 
                this.hey();
            },
            remove: function(){

            },
            hey: function(){
                this.toX = this.x;
                this.toY = this.y;
                this.dir = DIR_DOWN;
                this.anim = [
                15,16,17,16, //Left
                24,25,26,24, //Right
                33,34,35,34, //Up
                6,7,8,7]; //Down
                
                this.addEventListener(Event.ENTER_FRAME,function(){
                /* If the current Y position is lower (greater) than destination (toY), the direction should be set as DIR_UP and the this should be moved up by 3 px each frame, unless its current Y position is within 3 px of the destination (abs val check) */
                if(this.y>this.toY){
                    this.dir = DIR_UP;
                    if(Math.abs(this.y - this.toY)<3){
                        this.y = this.toY;
                    } else {
                        this.y -= 3;
                    }
                 } else if (this.y < this.toY) {
                    this.dir = DIR_DOWN;
                    if(Math.abs(this.y - this.toY) < 3){
                        this.y = this.toY;
                    } else {
                        this.y += 3;
                    }
                }
                
                if(this.x>this.toX){
                    this.dir = DIR_LEFT;
                    if(Math.abs(this.x - this.toX)<3){
                        this.x = this.toX;
                    } else {
                        this.x -= 3;
                    }
                 } else if (this.x < this.toX) {
                    this.dir = DIR_RIGHT;
                    if(Math.abs(this.x - this.toX) < 3){
                        this.x = this.toX;
                    } else {
                        this.x += 3;
                    }
                }

                /* If this is not moving, age should be made equal to 1. Every frame, the this's age will increase; however, if he is standing still, his age will reset to 1. Used in the frame assignment on the next line to keep the this from being animated if he is not moving. */
                if (this.x == this.toX && this.y == this.toY) this.age = 1;
                /* The frame is assigned as a number from the array of values we specified earlier. The code means that the frame of the this should cycle through the four frames of a given direction the this is traveling in or facing. */
                this.frame = this.anim[this.dir*4 + (this.age % 4)];
             });
                
          }  
        });
        
        var enemy1 = new Enemy(160,160,0);
        var enemy2 = new Enemy(130,130,0);
        console.log("HI!");
        game.rootScene.addChild(enemy1);
        game.rootScene.addChild(enemy2);
            
            bg.addEventListener(Event.TOUCH_START,function(e){
                 enemy1.toX = e.x-16;
                 enemy1.toY = e.y-16;
                 enemy2.toX = e.x-16;
                 enemy2.toY = e.y-16;
             });

             bg.addEventListener(Event.TOUCH_MOVE,function(e){
                 enemy2.toX = e.x-16;
                 enemy2.toY = e.y-16;
             });

        };
    game.start();

};