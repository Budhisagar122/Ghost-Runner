var tower,tower_img;
var door,door_img,doorsGroup;
var climber,climber_img,climbersGroup;
var invisibleBlock,invisibleBlocksGroup;
var ghost,ghost_jumping,ghost_standing;
var gameState="play";
var sound1;

function preload(){
  tower_img=loadImage("tower.png");
  door_img=loadImage("door.png");
  climber_img=loadImage("climber.png");
  ghost_jumping=loadImage("ghost-jumping.png");
  ghost_standing=loadImage("ghost-standing.png");
  sound1=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,600,600);
  tower.addImage("tower_img",tower_img);
  tower.velocityY=1;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  
  invisibleBlocksGroup=new Group();
  
  ghost=createSprite(200,400,50,50);
  ghost.addImage("ghost_standing",ghost_standing);
  ghost.scale=0.3;
  
}

function draw(){
  background("black");
  
  
  if (gameState==="play"){
    if(tower.y>600){
    tower.y=300;
  }
    if(keyDown("space")){
    ghost.velocityY=-5;
    ghost.addImage("ghost_jumping",ghost_jumping);
    
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-5;
    
  }
                
  
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+5;
    
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    
    if(invisibleBlocksGroup.isTouching(ghost)){
      ghost.destroy();
      gameState="end";
    }
    spawnDoors();
    drawSprites();
    
    //sound.loop();
  }
  
  if(gameState==="end"){
    fill("red");
    textSize(40);
    text("Game Over",100,200);
  }
  
  
  
    
  console.log(tower.y)
  
  
  
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(100,-50);
    door.addImage("door_img",door_img);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=620;
    doorsGroup.add(door);
    
    climber=createSprite(100,10);
    climber.addImage("climber_img",climber_img);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=620;
    climbersGroup.add(climber);
    
    invisibleBlock=createSprite(100,30,80,20);
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
   invisibleBlock.lifetime=620;
    invisibleBlocksGroup.add(invisibleBlock);
    invisibleBlock.visible=false;
    
  }
}