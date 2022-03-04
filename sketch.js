
var frontground , frontgroundImg, temple, templeImg, manRunning, man;
var stone, stoneImg, skyStone, skyStoneImg;
var gameState = "start"
var jumpS1, jumpS1Sound, stoneGroup, skyStoneGroup;

function preload() {
  templeImg = loadImage("./images/temple.png");
  frontgroundImg = loadImage("./images/background.png");
  manRunning = loadAnimation("./images/man1.png", "./images/man2.png", "./images/man3.png");
  stoneImg = loadImage("./images/stone.png");
  skyStoneImg = loadImage("./images/SkyStone.png");
  jumpS1Sound = loadSound("audio/sound1.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //creating the background
  frontground = createSprite(width/2, height/2, width, height);
  frontground.addImage(frontgroundImg);
  //creating the temple
  temple = createSprite(200, height- 180);
  temple.addImage(templeImg);
  
  frontground.scale = 2.5;
  man = createSprite(240, height -120);
  man.addAnimation("running",manRunning);
  man.scale = 0.5;

  ground = createSprite(width/2 , height , width, 30 );
  ground.shapeColor = "brown";
  ground.visible = true;
  stoneGroup = new Group();
  skyStoneGroup = new Group();
}

function draw() {

 console.log(man.y);
  background(255,255,255); 
  
  //gamestate start 
  if (gameState === "start"){
    if(keyDown("space")){
      frontground.velocityX = -3;
      temple.visible = false;
    gameState = "play"
    }
  }

  if(gameState === "play"){
    if(keyDown("up_arrow")&& man.y > 543){
      man.velocityY = -8;
      jumpS1Sound.play();
    }
    if(frontground.x< 0){
      frontground.x = width/2;
    }
    spawnSkyStone();
    Stone();
      man.velocityY = man.velocityY + 0.5
      man.collide(ground);
      if(man.isTouching(stoneGroup)){
       console.log("working");
      }
  }

  drawSprites();
}

function spawnSkyStone(){
  if(frameCount %120 === 0){
    skyStone = createSprite(10, 0);
    skyStone.addImage(skyStoneImg);
    skyStone.x= Math.round(random(20, width -200));
    skyStone.velocityY = 5;
    skyStone.scale = 0.2;
    skyStoneGroup.add(skyStone);
  }
}

function Stone(){
  if(frameCount %230 === 0){
    stone = createSprite(width, height);
    stone.y = Math.round(random(height, height - 100))
    stone.addImage(stoneImg);
    stone.velocityX = -3;
    stoneGroup.add(stone);

  }
}