var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyImage = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

  function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("Img",monkeyImage);
  monkey.scale=0.15;
   

  ground = createSprite(200,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  //console.log(ground.x)
    
    obstacleGroup = createGroup();
  bananaGroup = createGroup();
    
    survivalTime=0;
}  


function draw() {
  background ("white");
  
   if(gameState === PLAY){
     
     monkey.collide(ground);
     
      fill("black");
  textSize(20);
  text("Survival Time : "+survivalTime,100,50);
  survivalTime = survivalTime+ Math.round(getFrameRate()/60);
 

    if(ground.x<0){
     ground.x=ground.width/2
     }
     
     if(keyDown("space")&& monkey.y >= 60) {
        monkey.velocityY = -12;
     }
     
      monkey.velocityY = monkey.velocityY + 0.5
     
     spawnObstacles();
     spawnBananas();
     
     if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }
     
     if(monkey.isTouching(obstacleGroup)){
      
        gameState = END;
       ground.velocityX=0;
       
       obstacleGroup.destroyEach();
 }
      
   }
  
  drawSprites();
  
 
  if (gameState === END) {
       
    monkey.velocityY=0;
   ground.velocityX = 0;
    
    fill("black")
       text (" press R to restart",60,100);
    
    obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("Img",monkeyImage);
    
      }
  if (keyWentDown("r") && gameState=== END) {
   obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    reset();
    survivalTime = 0; 
 
  }
    
  
}
  

function spawnObstacles(){

   if(frameCount % 100 === 0){

    obstacle = createSprite(400,330,10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,4));
     
    switch(rand){
      
             case 1: obstacle.scale = 0.1;
                     break;
             case 2:obstacle.scale = 0.20;
                    break;
             case 3: obstacle.scale = 0.25;
                     break;
             case 4: obstacle.scale = 0.15;
                     break;
             default:break;
     
     }
     //obstacle.scale = 0.15;
     obstacle.lifetime = 100;
     
     obstacleGroup.add(obstacle); 
   }
}

function spawnBananas(){
  if(frameCount % 80 === 0){
        banana = createSprite(200,250,10,10);
        banana.addImage("banana",bananaImage);
    
    banana.depth = monkey.depth;
    monkey.depth = banana.depth+2;
  
        banana.scale=0.09;
    banana.velocityX= -4;
    banana.lifetime=100;
    
        bananaGroup.add(banana);
    
  }

}

function reset(){
 
        monkey.changeAnimation("moving",monkey_running);
        gameState = PLAY ;
        bananaGroup.destroyEach();
        obstacleGroup.destroyEach();
        monkey.scale=0.15;
        survivalTime=0;
}
