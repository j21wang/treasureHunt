//Global Variables
var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;
var chestsAmount = 3;
var chests = [];
var guardAmount = chestsAmount;
var guards = [];
var select;
var level = 1;
var aim1;
var bombAmount = chestsAmount;
var bombs = [];
var player1;
//var player2;
var enemy1;
var life;
var score;

enchant();
window.onload = function(){
    var game = new Core(320,400);
    game.fps=16;
    game.preload('sounds/shot5.wav','sounds/se3.wav','sounds/se6.wav','sounds/walk1.wav','sounds/se2.wav','images/chara0.png','images/chara5.png','images/map0.png','images/chara6.png','images/chara7.png','images/reticle.png','images/icon0.png','images/effect0.png');

    game.onload = function(){
        game.life = 5;
        game.score = 0;
        
        var map = new Map(16,16);
        map.image = game.assets['images/map0.png'];
        game.walk = game.assets['sounds/walk1.wav'];
        game.shot = game.assets['sounds/shot5.wav'];
        game.se2 = game.assets['sounds/se2.wav'];
        game.se3 = game.assets['sounds/se3.wav'];
        game.se6 = game.assets['sounds/se6.wav'];
 
        var stage = new Group();
        stage.addChild(map);
        
        life = makeSelect("Life: " + game.life , 250);
        stage.addChild(life);

        score = makeSelect("Score: " + game.score , 270);
        stage.addChild(score);

        map.loadData([
              [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
              [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
              [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
              [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
              [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
              [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]
              ]);

        map.collisionData = [
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              ];

        var Player1 = enchant.Class.create(enchant.Sprite,{
            initialize: function(){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara0.png'];
                this.x = null;
                this.y = null;
                this.dir = null;
                this.anim = null;
                this.frame = 6;
                this.chestCount = 0;
                this.movement();                
            },
            remove: function(){
                stage.removeChild(this);
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
                            game.walk.play();
                        } else if(game.input.down){
                            this.dir = DIR_DOWN;
                            if(this.y < 320 - this.height-16)
                            this.y += 4;
                            game.walk.play();
                        } else if(game.input.left){
                            this.dir = DIR_LEFT;
                            if(this.x > 0+this.height-25)
                            this.x -= 4;
                            game.walk.play();
                        } else if(game.input.right){
                            this.dir = DIR_RIGHT;
                            if(this.x < 320 - this.width-5)
                            this.x += 4;
                            game.walk.play();
                        }

                        if(!game.input.up && !game.input.down && !game.input.left && !game.input.right) this.age = 1;
                        this.frame = this.anim[this.dir*4 + (this.age%4)];
                    
                    this.checkChest();
                    this.checkEnemy();
                });       
            },
            checkChest: function(){
                for(var i=0;i<guardAmount;i++){
                    if(this.intersect(chests[i])){
                            game.se2.play();
                            chests[i].remove();
                            chests.splice(i,1);
                            game.score += 10; 
                            stage.removeChild(score);
                            score = makeSelect("Score: " + game.score , 270);
                            stage.addChild(score);

                    }     
                }
                if(chests.length == 0){
                    game.se6.play();
                    select = makeSelect("[NEXT LEVEL]",200);
                    level++;
                    stage.addChild(select);
                    player1.remove();
                    //player2.remove();
                    enemy1.remove();
                    aim1.remove();
                    for(var i=0;i<guards.length;i++){
                        guards[i].remove();
                    }

                    select.addEventListener(Event.TOUCH_START,function(e){

                        select.remove();

                        if(level == 2){
                            new Enemy(160,160,1);
                            new Player1();
                            //new Player2(player1.x-32,player1.y-32,0);
                            new Aim(player1.x,player1.y);

                            for(var i=0;i<guardAmount;i++){
                                chests.push(new Chest(rand(304),rand(304)));
                                stage.addChild(chests[i]);
                            }

                            guards.push(new Guard(60,40,5,2));
                            guards.push(new Guard(240,40,6,-2));
                            guards.push(new Guard(150,120,4,2));
                            guards.push(new Guard(55,200,5,2));
                            guards.push(new Guard(230,200,6,2));
                            stage.addChild(guards[0]);
                            stage.addChild(guards[1]);
                            stage.addChild(guards[2]);
                            stage.addChild(guards[3]);
                            stage.addChild(guards[4]);

                            stage.addChild(enemy1);
                            stage.addChild(player1);
                            //stage.addChild(player2);
                            stage.addChild(aim1);
                        } else if(level == 3){
                            new Enemy(160,160,2);
                            new Player1();
                            //new Player2(player1.x-32,player1.y-32,0);
                            new Aim(player1.x,player1.y);

                            for(var i=0;i<guardAmount;i++){
                                chests.push(new Chest(rand(304),rand(304)));
                                stage.addChild(chests[i]);
                            }

                            guards.push(new Guard(60,40,5,2));
                            guards.push(new Guard(240,40,6,-2));
                            guards.push(new Guard(50,120,4,-2));
                            guards.push(new Guard(150,120,4,2));
                            guards.push(new Guard(55,200,5,2));
                            guards.push(new Guard(230,200,6,2));
                            stage.addChild(guards[0]);
                            stage.addChild(guards[1]);
                            stage.addChild(guards[2]);
                            stage.addChild(guards[3]);
                            stage.addChild(guards[4]);
                            stage.addChild(guards[5]);

                            stage.addChild(enemy1);
                            stage.addChild(player1);
                            //stage.addChild(player2);
                            stage.addChild(aim1);

                        } else if(level == 4){
                            new Enemy(160,160,3);
                            new Player1();
                            //new Player2(player1.x-32,player1.y-32,0);
                            new Aim(player1.x,player1.y);

                            for(var i=0;i<guardAmount;i++){
                                chests.push(new Chest(rand(304),rand(304)));
                                stage.addChild(chests[i]);
                            }

                            guards.push(new Guard(60,40,5,2));
                            guards.push(new Guard(240,40,6,-2));
                            guards.push(new Guard(50,120,4,-2));
                            guards.push(new Guard(150,120,4,2));
                            guards.push(new Guard(55,200,5,2));
                            guards.push(new Guard(160,200,3,-2));
                            guards.push(new Guard(230,200,6,2));
                            stage.addChild(guards[0]);
                            stage.addChild(guards[1]);
                            stage.addChild(guards[2]);
                            stage.addChild(guards[3]);
                            stage.addChild(guards[4]);
                            stage.addChild(guards[5]);
                            stage.addChild(guards[6]);

                            stage.addChild(enemy1);
                            stage.addChild(player1);
                            //stage.addChild(player2);
                            stage.addChild(aim1);


                        } else if(level == 5){
                            new Enemy(160,160,4);
                            new Player1();
                            //new Player2(player1.x-32,player1.y-32,0);
                            new Aim(player1.x,player1.y);

                            for(var i=0;i<guardAmount;i++){
                                chests.push(new Chest(rand(304),rand(304)));
                                stage.addChild(chests[i]);
                            }

                            guards.push(new Guard(60,40,5,2));
                            guards.push(new Guard(240,40,6,-2));
                            guards.push(new Guard(50,120,4,-2));
                            guards.push(new Guard(150,120,4,2));
                            guards.push(new Guard(245,120,5,-2));
                            guards.push(new Guard(55,200,5,2));
                            guards.push(new Guard(160,200,3,-2));
                            guards.push(new Guard(230,200,6,2));
                            stage.addChild(guards[0]);
                            stage.addChild(guards[1]);
                            stage.addChild(guards[2]);
                            stage.addChild(guards[3]);
                            stage.addChild(guards[4]);
                            stage.addChild(guards[5]);
                            stage.addChild(guards[6]);
                            stage.addChild(guards[7]);

                            stage.addChild(enemy1);
                            stage.addChild(player1);
                            //stage.addChild(player2);
                            stage.addChild(aim1);


                        } else if(level == 6){
                            new Enemy(160,160,2);
                            new Player1();
                            //new Player2(player1.x-32,player1.y-32,0);
                            new Aim(player1.x,player1.y);

                            for(var i=0;i<guardAmount;i++){
                                chests.push(new Chest(rand(304),rand(304)));
                                stage.addChild(chests[i]);
                            }

                            guards.push(new Guard(60,40,5,3));
                            guards.push(new Guard(140,40,5,3));
                            guards.push(new Guard(240,40,6,-3));
                            guards.push(new Guard(50,120,4,-3));
                            guards.push(new Guard(150,120,4,3));
                            guards.push(new Guard(245,120,5,-3));
                            guards.push(new Guard(55,200,5,3));
                            guards.push(new Guard(160,200,3,-3));
                            guards.push(new Guard(230,200,6,3));
                            stage.addChild(guards[0]);
                            stage.addChild(guards[1]);
                            stage.addChild(guards[2]);
                            stage.addChild(guards[3]);
                            stage.addChild(guards[4]);
                            stage.addChild(guards[5]);
                            stage.addChild(guards[6]);
                            stage.addChild(guards[7]);
                            stage.addChild(guards[8]);

                            stage.addChild(enemy1);
                            stage.addChild(player1);
                            //stage.addChild(player2);
                            stage.addChild(aim1);
                        }
                        guardAmount++;
                    });
                }
            },
            checkEnemy: function(){
                for(var i=0;i<guardAmount+1;i++){   
                    if(this.intersect(guards[i])){
                        game.se3.play();
                        //lower life, reset position
                        // console.log("HIT A GUARD");
                    }
                      if(this.intersect(enemy1)){
                        game.se3.play();
                            stage.removeChild(enemy1);
                            enemy1 = new Enemy();
                            enemy1.x = rand(320 -enemy1.width);
                            enemy1.y = rand(320 -enemy1.height);
                            stage.addChild(enemy1);
                            game.life = game.life- 1;
                            player1.x = 32;
                            player1.y = 32;
                            stage.removeChild(life);
                            life = makeSelect("Life: " + game.life , 250);
                            stage.addChild(life); 
                    }
                }
            }

        });

        /*var Player2 = enchant.Class.create(enchant.Sprite,{
            initialize: function(x,y,speed){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara5.png'];
                this.x = x;
                this.y = y;
                this.frame = 7; 
                this.moveSpeed = 4; //increase moveSpeed for harder levels
                this.movement();
            },
            remove: function(){
                stage.removeChild(this);
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
        });*/

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
                stage.removeChild(this);
            },
            movement: function(){
                this.toX = this.x;
                this.toY = this.y;
                this.dir = DIR_DOWN;
                this.anim = [
                9,10,11,10, //Left
                18,19,20,19, //Right
                27,28,29,28, //Up
                0,1,2,1]; //Down
                
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

                    if(!this.within(player1,30)){
                        this.toX = player1.x;
                        this.toY = player1.y;
                        this.anim = [
                        9,10,11,10, //Left
                        18,19,20,19, //Right
                        27,28,29,28, //Up
                        0,1,2,1]; //Down
                        
                    } else {
                        this.anim = [
                        15,16,17,16, //Left
                        24,25,26,25, //Right
                        32,33,34,33, //Up
                        6,7,8,7]; //Down
                        

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
            },
            remove:function(){
                stage.removeChild(this);
            }
        });

        var Guard = enchant.Class.create(enchant.Sprite,{
            initialize:function(x,y,theta,speed){
                enchant.Sprite.call(this,32,32);
                this.image = game.assets['images/chara6.png'];
                this.frame = 5;
                this.x = x;
                this.y = y;
                this.direction = 0;
                this.moveSpeed = speed;
                this.theta = theta*Math.PI / 180;
                this.movement();
            
            },
            remove:function(){
                stage.removeChild(this);
            },
            movement:function(){

                this.addEventListener(Event.ENTER_FRAME,function(e){
                    this.direction += this.theta;
                    this.x -= this.moveSpeed * Math.cos(this.direction);
                    this.y += this.moveSpeed * Math.sin(this.direction);
                });
                
            }
        });

        var Bomb = enchant.Class.create(enchant.Sprite,{
            initialize:function(){
               enchant.Sprite.call(this,16,16);
               this.image = game.assets['images/icon0.png'];
               this.frame = 25;
               // this.x = aim1.x;
               // this.y = aim1.y;
            },
            remove: function(){
                for(var i = 0; i<guardAmount; i++){
                    this.moveTo(aim1.x,aim1.y);
                    if(this.intersect(guards[i])){
                        game.bomb.play();
                        guards[i].remove();
                    }else if(this.intersect(enemy1)){
                        game.bomb.play();
                        enemy1.remove();
                    }
                        this.image = game.assets['images/effect0.png'];
                        this.frame = 25;
                    }
                        stage.removeChild(this);
                }
        });

        var Aim = enchant.Class.create(enchant.Sprite,{
            initialize:function(playerx,playery){
               enchant.Sprite.call(this,32,32);
               this.image = game.assets['images/reticle.png'];
               this.frame = 0;
               this.x = player1.x -10;
               this.y = player1.y -10;
               // this.movement();
            },
            remove: function(){
            },
            movement:function(){
                this.addEventListener(Event.ENTER_FRAME,function(e){
                    for(var i=0;i<bombAmount;i++){
                        bombs[i] = new Bomb();
                        bombs[i].x = player1.x;
                        bombs[i].y = player1.y;
                        stage.addChild(bombs[i]); 
                        if(bombs[i].age < 20){
                            bombs[i].remove();
                            game.bomb.play();
                        }
                    }
                });
            }
        });

        enemy1 = new Enemy(160,160,0);
        player1 = new Player1();
        //player2 = new Player2(player1.x-32,player1.y-32,0);
        aim1 = new Aim(player1.x,player1.y);
       
        for(var i=0;i<chestsAmount;i++){
            chests.push(new Chest(rand(304),rand(304)));
            stage.addChild(chests[i]);
        }

        guards.push(new Guard(60,40,5,2));
        guards.push(new Guard(240,40,6,-2));
        guards.push(new Guard(150,120,4,2));
        guards.push(new Guard(230,200,6,2));
        stage.addChild(guards[0]);
        stage.addChild(guards[1]);
        stage.addChild(guards[2]);
        stage.addChild(guards[3]);

        stage.addChild(enemy1);
        stage.addChild(player1);
        //stage.addChild(player2);
        stage.addChild(aim1);
        game.rootScene.addChild(stage);
        
        };
    game.start();

};

function makeSelect(text,y){
    var label = new Label(text);
    label.font = "16px monoscape";
    label.color = "red";
    label.x = 20;
    label.y = y+75;
    label.width = 320;
    return label;
}

function rand(num){
    return Math.floor(Math.random() * num);
}
        

