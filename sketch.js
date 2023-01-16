//TREX GAme using JS

//Declare variables for game objects and behaviour indicators(FLAGS)
var trex, trexRun, trexDead;
var ground, groundImg, invGround;
var cloud, cloudImage, cloudsGroup;
var cactus, cactiGroup, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var cactus1Color, cactus2Color, cactus3Color;
var gameOver, restartBtn, restartBtnImg, gameOverImg;
var score, hiScore, displayHS;
var PLAY, END, gameState;
var jumpSound, dieSound, checkPointSound;
var sun, sunImg;
var bird, birdImg, birdAnim;
var gameOverBackgroundImg;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
  trexRun = loadAnimation(
    "./assets/trex1Color.png",
    "./assets/trex2Color.png",
    "./assets/trex3Color.png"
  );
  trexDead = loadImage("./assets/trexDeadColor.png");

  groundImg = loadImage("./assets/groundColor.png");

  cactus1 = loadImage("./assets/obstacle1.png");
  cactus2 = loadImage("./assets/obstacle2.png");
  cactus3 = loadImage("./assets/obstacle3.png");
  cactus4 = loadImage("./assets/obstacle4.png");
  cactus5 = loadImage("./assets/obstacle5.png");
  cactus6 = loadImage("./assets/obstacle6.png");

  cactus1Color = loadImage("./assets/obstacle1Color.png");
  cactus2Color = loadImage("./assets/obstacle2Color.png");
  cactus3Color = loadImage("./assets/obstacle3Color.png");
  cactus4Color = loadImage("./assets/obstacle4Color.png");

  cloudImage = loadImage("./assets/cloudColor.png");

  backgroundImg = loadImage("./assets/pyramidBKG2.jpeg");

  sunImg = loadImage("./assets/sun.png");

  gameOverBackgroundImg = loadImage("./assets/skull.png");

  restartBtnImg = loadImage("./assets/restartColor.png");

  //dieSound = loadSound("./assets/die.mp3");
  //jumpSound = loadSound("./assets/jump.mp3");
  //checkPointSound = loadSound("./assets/checkPoint.mp3");


}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  createCanvas(1000, 340);

  //create a trex sprite
  trex = createSprite(50, 300, 20, 50);
  trex.addAnimation("trexRun", trexRun);
  trex.addAnimation("trexDead", trexDead);
  trex.scale = 0.07;
  trex.debug = true;

  //creating the ground sprite
  ground = createSprite(width / 2, 335, 800, 4);
  ground.addAnimation("moving", groundImg);
  ground.scale = 0.5;
  //creating the invisible ground sprite
  invGround = createSprite(50, 300, 200, 4);
  invGround.visible = false;
  invGround.shapeColor = "blue";

  //variables for score, highscore values
  score = 0;
  hiScore = 0;
  //indicator to check if highscore should be displayed or not
  displayHS = false;

  sun = createSprite(450, 75, 30, 30);
  sun.addImage("sunImg", sunImg);
  sun.scale = 0.4;

  PLAY = 1;
  END = 0;
  gameState = PLAY;

  cactiGroup = new Group();
  cloudsGroup = createGroup();

  restartBtn = createSprite(500, 170, 10, 10);
  restartBtn.addImage("restartBtnImg", restartBtnImg);
  restartBtn.scale = 0.1;
}

//All modifications, changes, conditions, manipulations, actions during the course of the program are written inside function draw.
//All commands to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  //set background color
  background("lightblue");

  if ((score) => hiScore) {
    highscore = score;
  }

  // game behaviour when the gameState = PLAY = 1
  if (gameState == PLAY) {
    //display score
    stroke("white");
    strokeWeight(5);
    textSize(20);
    fill("purple");
    text("SCORE: " + score, 850, 20);

    //display highScore
    if (displayHS == true) {
      text("HISCORE: " + hiScore, 850, 50);
    }

    //score calculation
    score = score + Math.round(frameCount / 60);

    //making restart button invisible
    restartBtn.visible = false;

    sun.visible = true;

    //assign sound to checkpont
    if(score % 500 == 0){
      //checkPointSound.play();
    }

    //trex behaviour
    if (keyDown("space") && trex.y > 260) {
      trex.velocityY = -8;
      //jumpSound.play();
    }
    //add a gravity effect
    trex.velocityY = trex.velocityY + 0.45;

    //ground behaviour
    ground.velocityX = -10;

    if (ground.x < 400) {
      ground.x = width / 2;
    }

    //function call to create and moveobstacles
    spawnCacti();

    //function call to create and moveclouds
    spawnClouds();
    //check if trex is hitting or has hit any cactus object
    if (trex.isTouching(cactiGroup)) {
      gameState = END;
      //dieSound.play();

    }

    trex.changeAnimation("trexRun", trexRun);


  }

  //game behaviour when the gameState is = END = 0
  if (gameState == END) {
    background(gameOverBackgroundImg);

    //display score
    stroke("white");
    strokeWeight(5);
    textSize(20);
    fill("purple");
    text("SCORE: " + score, 850, 20);

    //displaying hiScore
    text("HISCORE: " + hiScore, 850, 50);

    //caculating highScore
    if (score > hiScore) {
      hiScore = score;
    }

    sun.visible = false;

    ground.velocityX = 0;

    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);

    cactiGroup.setVelocityXEach(0);
    cactiGroup.setLifetimeEach(-1);

    trex.changeAnimation("trexDead", trexDead);

    //making restart button invisible
    restartBtn.visible = true;

    cloudsGroup.destroyEach();

    if (mousePressedOver(restartBtn)) {
      gameState = PLAY;
      score = 0;
      cactiGroup.destroyEach();
      displayHS = true;
    }

    trex.velocityY = +0.45;
  }
  //trex will collide invGround so it does not fall off
  trex.collide(invGround);

  drawSprites();
}

//function definition to create and move cacti
function spawnCacti() {
  //create cactus objects after every 60 frames
  //to attain this we have to divide the framecount by 60 and check if the remainder is equal to zero
  //if framecount is divisible by given number then a cactus object will be created
  if (frameCount % 50 == 0) {
    //0, 60, 120, 180, 240, 300, .....
    //create and define a cactus sprite object in declare variable
    cactus = createSprite(width + 10, 275, 10, 30);
    cactus.scale = 0.4;
    cactus.velocityX = -10;
    cactus.debug = true;

    //generating lifetime to solve the problem of memory overload
    cactus.lifetime = -1 * (width / cactus.velocityY + 20);

    //random is a function used to egnerate any number between given range.
    //Math.round function is used to round and convert any decimal number to its nearest whole integer.
    //generate a random number between 1 to 6 and save it in variable caseNumber.
    var caseNumber = Math.round(random(1, 4));
    console.log(caseNumber);

    //switch case passes a single variable to match with cases id
    switch (caseNumber) {
      case 1:
        cactus.addImage("cactus1Color", cactus1Color);
        //adjust the size of animation for cactus sprite by keeping the width and height ratio stable
        cactus.scale = 0.5;
        break;
      case 2:
        cactus.addImage("cactus2Color", cactus2Color);
        //adjust the size of animation for cactus sprite by keeping the width and height ratio stable
        cactus.scale = 0.5;
        break;
      case 3:
        cactus.addImage("cactus3Color", cactus3Color);
        cactus.y = 275;
        //adjust the size of animation for cactus sprite by keeping the width and height ratio stable
        cactus.scale = 0.2;
        cactus.setCollider("rectangle", 0, 0, 600, 300);
        break;
      case 4:
        cactus.addImage("cactus4Color", cactus4Color);
        cactus.y = 275;
        //adjust the size of animation for cactus sprite by keeping the width and height ratio stable
        cactus.scale = 0.2;
        cactus.setCollider("rectangle", 0, 0, 600, 300);

        break;
      default:
        cactus.addImage("cactus1Color", cactus1Color);
        //adjust the size of animation for cactus sprite by keeping the width and height ratio stable
        cactus.scale = 0.5;
        break;
    }
    cactiGroup.add(cactus);
  }
}

//function definition to create and move clouds
function spawnClouds() {
  //create cactus objects after every 60 frames
  //to attain this we have to divide the framecount by 60 and check if the remainder is equal to zero
  //if framecount is divisible by given number then a cactus object will be created
  if (frameCount % 70 == 0) {
    //0, 60, 120, 180, 240, 300, .....
    //create and define a cactus sprite object in declare variable
    cloud = createSprite(width + 10, 30, 40, 10);
    cloud.addImage("cloudImage", cloudImage);
    cloud.velocityX = -4;

    //random is a function used to egnerate any number between given range.
    cloud.y = random(0, 150);
    cactus.lifetime = -1 * (width / cactus.velocityY) + 20;

    cloudsGroup.add(cloud);
  }
}
