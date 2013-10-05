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

        var Player1 = enchant.Class.create(enchant.Sprite,{
            initialize: function(){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara5.png'];
                this.x = null;
                this.y = null;
                this.dir = null;
                this.anim = null;
                this.frame = 7;
                this.movement();
            },
            remove: function(){

            },
            movement: function(){
                this.x = 100;
                this.y = 16;
                this.dir = DIR_DOWN;
                this.anim = [
                    9,10,11,10, //left
                    18,19,20,19, //right
                    27,28,29,28, //up
                    0,1,2,1]; //down
         
                this.addEventListener(Event.ENTER_FRAME,function(e){
                    if(game.input.up){
                        this.dir = DIR_UP;
                        this.y -= 4;
                    } else if(game.input.down){
                        this.dir = DIR_DOWN;
                        this.y += 4;
                    } else if(game.input.left){
                        this.dir = DIR_LEFT;
                        this.x -= 4;
                    } else if(game.input.right){
                        this.dir = DIR_RIGHT;
                        this.x += 4;
                    }


                    if(!game.input.up && !game.input.down && !game.input.left && !game.input.right) this.age = 1;
                    this.frame = this.anim[this.dir*4 + (this.age%4)];
                });       
            }
        });

        var Enemy = enchant.Class.create(enchant.Sprite,{
            initialize: function(x,y,speed){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara5.png'];
                this.x = x - 16;
                this.y = y - 16;
                this.frame = 7; 
                this.movement();
            },
            remove: function(){

            },
            movement: function(){
                this.toX = this.x;
                this.toY = this.y;
                this.dir = DIR_DOWN;
                this.anim = [
                15,16,17,16, //Left
                24,25,26,24, //Right
                33,34,35,34, //Up
                6,7,8,7]; //Down
                
                this.addEventListener(Event.ENTER_FRAME,function(){
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
                if (this.x == this.toX && this.y == this.toY) this.age = 1;
                this.frame = this.anim[this.dir*4 + (this.age % 4)];

                this.addEventListener(Event.ENTER_FRAME,function(e){
                    if(!this.intersect(player1)){
                        this.toX = player1.x;
                        this.toY = player1.y;
                    } else {
                    }
                });
             });
          }  
        });
        
        var enemy1 = new Enemy(160,160,0);
        var player1 = new Player1();
        game.rootScene.addChild(enemy1);
        game.rootScene.addChild(player1);
        };
    game.start();

};
