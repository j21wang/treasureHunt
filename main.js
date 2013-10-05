//Global Variables
var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;
var chestsAmount = 3;
var chests = [];
var guardAmount = chestsAmount;
var guards = [];

enchant();
window.onload = function(){
    var game = new Core(320,320);
    game.fps=16;
    game.preload('images/chara0.png','images/chara5.png','images/map0.png','images/chara6.png','images/chara7.png');

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
                this.image = game.assets['images/chara0.png'];
                this.x = null;
                this.y = null;
                this.dir = null;
                this.anim = null;
                this.frame = 6;
    
                this.movement();                
            },
            remove: function(){
                game.rootScene.removeChild(this);
            },
            movement: function(){
                this.x = 100;
                this.y = 16;
                this.dir = DIR_DOWN;
                this.anim = [
                    15,16,17,16, //left
                    24,25,26,25, //right
                    33,34,35,34, //up
                    6,7,8,7]; //down
         
                this.addEventListener(Event.ENTER_FRAME,function(e){

                        if(game.input.up){
                            this.dir = DIR_UP;
                            if(this.y > 0)
                            this.y -= 4;
                        } else if(game.input.down){
                            this.dir = DIR_DOWN;
                            if(this.y < 320 - this.height)
                            this.y += 4;
                        } else if(game.input.left){
                            this.dir = DIR_LEFT;
                            if(this.x > 0)
                            this.x -= 4;
                        } else if(game.input.right){
                            this.dir = DIR_RIGHT;
                            if(this.x < 320 - this.width)
                            this.x += 4;
                        }

                        if(!game.input.up && !game.input.down && !game.input.left && !game.input.right) this.age = 1;
                        this.frame = this.anim[this.dir*4 + (this.age%4)];
                    
                    this.checkChest();
                    this.checkEnemy();
                });       
            },
            checkChest: function(){
                for(var i=0;i<chestsAmount;i++){
                    if(this.intersect(chests[i])){
                        if(chests[i].special == true){
                            console.log('RIGHT CHEST'); 
                        }else{
                            console.log('TRY AGAIN');
                        }
                    }     
                }
            },
            checkEnemy: function(){
                for(var i=0;i<guardAmount+1;i++){
                    if(this.intersect(guards[i])){
                        //lower life, reset position
                        console.log("HIT A GUARD");
                    }
                    if(this.intersect(enemy1)){
                        //lower life, reset both characters and enemy positions
                        console.log("HIT ENEMY");
                    }
                }
            }

        });

        var Player2 = enchant.Class.create(enchant.Sprite,{
            initialize: function(x,y,theta,speed){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara5.png'];
                this.x = x - 16;
                this.y = y - 16;
                this.theta = theta * Math.PI / 180;
                this.frame = 7; 
                this.moveSpeed = 4; //increase moveSpeed for harder levels
                this.movement();
            },
            remove: function(){
                game.rootScene.removeChild(this);
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
                        this.y -= this.moveSpeed;
                    }
                 } else if (this.y < this.toY) {
                    this.dir = DIR_DOWN;
                    if(Math.abs(this.y - this.toY) < 3){
                        this.y = this.toY;
                    } else {
                        this.y += this.moveSpeed;
                    }
                }
                
                if(this.x>this.toX){
                    this.dir = DIR_LEFT;
                    if(Math.abs(this.x - this.toX)<3){
                        this.x = this.toX;
                    } else {
                        this.x -= this.moveSpeed;
                    }
                 } else if (this.x < this.toX) {
                    this.dir = DIR_RIGHT;
                    if(Math.abs(this.x - this.toX) < 3){
                        this.x = this.toX;
                    } else {
                        this.x += this.moveSpeed;
                    }
                }
                if (this.x == this.toX && this.y == this.toY) this.age = 1;
                this.frame = this.anim[this.dir*4 + (this.age % 4)];

                    if(!this.intersect(player1)){
                        this.toX = player1.x;
                        this.toY = player1.y;
                    } else {
                    }
             });
          }  
        });


        var Enemy = enchant.Class.create(enchant.Sprite,{
            initialize: function(x,y,theta,speed){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara7.png'];
                this.x = x - 16;
                this.y = y - 16;
                this.theta = theta * Math.PI / 180;
                this.frame = 7; 
                this.moveSpeed = 1; //increase moveSpeed for harder levels
                this.movement();
            },
            remove: function(){
                game.rootScene.removeChild(this);
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
                        this.y -= this.moveSpeed;
                    }
                 } else if (this.y < this.toY) {
                    this.dir = DIR_DOWN;
                    if(Math.abs(this.y - this.toY) < 3){
                        this.y = this.toY;
                    } else {
                        this.y += this.moveSpeed;
                    }
                }
                
                if(this.x>this.toX){
                    this.dir = DIR_LEFT;
                    if(Math.abs(this.x - this.toX)<3){
                        this.x = this.toX;
                    } else {
                        this.x -= this.moveSpeed;
                    }
                 } else if (this.x < this.toX) {
                    this.dir = DIR_RIGHT;
                    if(Math.abs(this.x - this.toX) < 3){
                        this.x = this.toX;
                    } else {
                        this.x += this.moveSpeed;
                    }
                }
                if (this.x == this.toX && this.y == this.toY) this.age = 1;
                this.frame = this.anim[this.dir*4 + (this.age % 4)];

                    if(!this.intersect(player1)){
                        this.toX = player1.x;
                        this.toY = player1.y;
                    } else {
                    }
             });
          }  
        });

        var Chest = enchant.Class.create(enchant.Sprite,{
            initialize:function(x,y){
                enchant.Sprite.call(this,16,16);
                this.image = game.assets['images/map0.png'];
                this.frame = 25;
                this.x = x;
                this.y = y;
                this.special = false;
            },
            remove:function(){
                game.rootScene.removeChild(this);
            }
        });

        var Guard = enchant.Class.create(enchant.Sprite,{
            initialize:function(chestx,chesty,theta,speed){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara6.png'];
                this.frame = 5;
                this.x = chestx-10;
                this.y = chesty-30;
                this.direction = 0;
                this.moveSpeed = speed;
                this.theta = theta*Math.PI / 180;
                this.movement();
            
            },
            remove:function(){
                game.rootScene.removeChild(this);
            },
            movement:function(){

                this.addEventListener(Event.ENTER_FRAME,function(e){
                    this.direction += this.theta;
                    this.x -= this.moveSpeed * Math.cos(this.direction);
                    this.y += this.moveSpeed * Math.sin(this.direction);
                });
                
            }
        });

        //helpers
        function rand(num){
            return Math.floor(Math.random() * num);
        }
        function level(){

        }

        var enemy1 = new Enemy(160,160,0);
        var player1 = new Player1();
        var player2 = new Player2(player1.x-32,player1.y-32,0);
        
        for(var i=0;i<chestsAmount;i++){
            chests.push(new Chest(rand(304),rand(304)));
            game.rootScene.addChild(chests[i]);
            var circle = rand(15);
            guards.push(new Guard(chests[i].x,chests[i].y,circle,2));
            game.rootScene.addChild(guards[i]);
        }
        chests[rand(chestsAmount)].special = true;

        game.rootScene.addChild(enemy1);
        game.rootScene.addChild(player1);
        game.rootScene.addChild(player2);
        
        };
    game.start();

};
