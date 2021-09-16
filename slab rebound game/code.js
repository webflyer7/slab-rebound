var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["88dd15a3-9743-46e5-89e8-0f9abe0c1581","18567308-161a-4cde-8f8a-ae273ff78512"],"propsByKey":{"88dd15a3-9743-46e5-89e8-0f9abe0c1581":{"name":"volleyball2_1","sourceUrl":"assets/api/v1/animation-library/gamelab/Yr547P.Zjz5iZluXcGpzwKpozGcMO7CM/category_sports/volleyball2.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"Yr547P.Zjz5iZluXcGpzwKpozGcMO7CM","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/Yr547P.Zjz5iZluXcGpzwKpozGcMO7CM/category_sports/volleyball2.png"},"18567308-161a-4cde-8f8a-ae273ff78512":{"name":"golfball_1","sourceUrl":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var ball;
var score = 0;
ball = createSprite(200, 200, 20, 20);
ball.setAnimation("golfball_1");
ball.scale = 0.1;

ball.velocityX = 0;
ball.velocityY = 0;
ball.scale= 0.1;
var paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor="cyan";

var bricks = createGroup();

createEdgeSprites();
//creating a function so for space
createBrickRow(65, "red");
createBrickRow(65+29,"yellow");
createBrickRow(65+29+29, "orange")
createBrickRow(65+29+29+29, "pink")
function createBrickRow(y, color) {
  for(c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}

function draw(){
  background("black");
  textSize(20);
  text("score: "+score,40,25);
  paddle.x = World.mouseX;
  
  if(paddle.x < 60){
    paddle.x =60;
  }
  
  if(paddle.x > 340){
    paddle.x =340;
  }
  drawSprites();
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(paddle);
  ball.bounceOff(bricks,brickHit);
  
  if(ball.bounceOff(paddle)){
    playSound("assets/category_tap/game_bubble_pop_click.mp3")
  }
  //if no bricks
if(!bricks[0]){
  ball.velocityX = 0;
  ball.velocityY = 0;
  textSize(40);
  text("Well done",150,200);
}
}

function mousePressed(){
  ball.velocityX = 4;
  ball.velocityY = 2;
}
function brickHit(ball,brick){
  playSound("assets/category_tap/game_bubble_pop_click.mp3")
  brick.destroy();
  score = score + 5;
}







// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
