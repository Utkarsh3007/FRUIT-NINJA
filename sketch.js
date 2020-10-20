var fruit, fruit1, fruit2, fruit3, fruit4;
var enemy1, enemy2;
var blade;
var go;
var PLAY = 1;
var WIN = 2;
var END = 0;
var HELP = 3;
var gameState = PLAY;
var enemyGroup, fruitsGroup;
var monster;
var bar;
var score;
var youWin,youWinImg;


function preload() {
  enemy1 = loadImage("alien1.png");
  enemy2 = loadImage("alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  go_Image = loadImage("gameover.png");
  knife= loadImage("sword.png");
blade_swoosh=loadSound("knifeSwooshSound.mp3");
  gameover=loadSound("gameover.mp3");
  youWinImg=loadImage("you win.jpg");

}

function setup() {
  createCanvas(400, 400);

  enemyGroup = new Group ();
  fruitGroup = new Group ();
  fruitsGroup = new Group ();
  
  blade=createSprite(400,200,10,10)
  blade.addImage(knife)
  blade.scale=0.5
  

  //fill("red")
  bar=createSprite(200,400,400,10);
  bar.shapeColor=color("red");
  
  go= createSprite(200,200,10,10);
  go.addImage(go_Image)
  score=0
  
  youWin=createSprite(200,200,10,10);
  youWin.addImage(youWinImg);
  youWin.scale=0.3
  
  
}

function draw() {
  background("lavender");
  
 
  
 
  
  blade.x=mouseX;
  blade.y=mouseY;

  if (gameState===PLAY){
     cutting();
     enemy();
     fruitsY();
    fruitsX();
  if (enemyGroup.isTouching(blade)){
      enemyGroup.destroyEach();
      score=score-5
    gameState=END
  }
    if(fruitGroup.isTouching(bar)){
       gameState=END
}
    go.visible=false
    youWin.visible=false;
    
     stroke("black")
  fill("black");
  textSize(20)
  text("score : "+score,300,50);
    
     stroke("black")
  fill("black")
  textSize(10)
  text("PRESS H FOR HELP",300,65)
    
    if (score>20){
      gameState=WIN;
  }
    if (keyDown("h")){
        gameState=HELP;
        }
    
}
 else if(gameState===END){
// gameover.play();
   enemyGroup.destroyEach();
   fruitGroup.destroyEach();
   blade.x=200;
   blade.y=200;
   blade.visible=false;
   go.visible=true;
   youWin.visible=false
   stroke("black")
   fill("black")
   textSize(20)
   text("PRESS SPACE TO RESTART",100,250)
 
 }
  
  else if (gameState===WIN){
  youWin.visible=true
  blade.x=200;
  blade.y=200;
  blade.visible=false
  stroke("black")
  fill("black")
  textSize(20)
  text("PRESS R TO RESTART",100,310)
}
  else if(gameState===HELP){
    
  stroke("black")
  fill("black")
  textSize(15)
  text("PRESS A TO PLAY",250,65)
    
  stroke("black")
  fill("RED")
  textSize(20)
  text("USE MOUSE TO CONTROL BLADE",50,150)
    
  stroke("black")
  fill("RED")
  textSize(20) 
  text("DON'T ALLOW FRUIT TO TOUCH RED BAR",1,200);
    
  stroke("black")
  fill("RED")
  textSize(20)
  text("DON'T TOUCH ENEMIES",50,250);
    
   stroke("black")
  fill("RED")
  textSize(20)
  text("SCORE 20 POINTS TO WIN",50,300); 
    
  blade.visible=false;
  fruitGroup.visibleEach=false;
  enemyGroup.visibleEach=false; 
    
    if(keyDown("a")){
       gameState=PLAY;
      blade.visible=true;
      score=0
       }
    
  }
    
    
    
    
    
  if(gameState==END &&keyDown("space")){
    gameState=PLAY
    blade.visible=true
    score=0      
    }
  
  if (gameState==WIN&&keyDown("r")){
      reset(); 
      }
    

  
 
  drawSprites();
 
}

function enemy() {
  if (frameCount % 100 === 0) {
    monster = createSprite(Math.round(random(200, 100)),10, 10, 10);
    monster.addImage(enemy2)

    monster.lifetime =150;

    monster.velocityY=(9+score/4);
    enemyGroup.add(monster)
  }

}
function fruitsY (){
  if (frameCount%40===0){
    fruit=createSprite(Math.round(random(30,350)),Math.random(10,350),10,10);
    fruit.velocityY=(9+score/2);
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
  
    fruit.scale=0.2
    fruit.lifetime=100;
    fruitGroup.add(fruit);
}
}
function cutting(){
   if (fruitGroup.isTouching(blade)){
        fruitGroup.destroyEach();
     score=score+1
     blade_swoosh.play();
  }
   if (fruitsGroup.isTouching(blade)){
        fruitsGroup.destroyEach();
     score=score+3
     blade_swoosh.play();
  }
}
function fruitsX(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruits=createSprite(400,200,20,20);
    console.log(position)
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruits.x=400;
    fruits.velocityX=-(7+(score/2));
    }
    else
    {
      if(position==2){
      fruits.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruits.velocityX= (7+(score/4));
      }
    }
    
    fruits.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruits.addImage(fruit1);
    } else if (r == 2) {
      fruits.addImage(fruit2);
    } else if (r == 3) {
      fruits.addImage(fruit3);
    } else {
      fruits.addImage(fruit4);
    }
    
    fruits.y=Math.round(random(50,340));
   
    
    fruits.setLifetime=100;
    
    fruitsGroup.add(fruits);
  }
}
function reset(){
     gameState=PLAY;
     score=0;
     blade.visible=true
   
}