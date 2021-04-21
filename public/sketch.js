// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var box1;
var world;
var circles = [];
var boundaries = [];

function setup() {
  // put setup code here
  createCanvas(800, 600);
  engine = Engine.create();
  world = engine.world;
  // run the engine
  // Engine.run(engine);
  boundaries.push(new Boundary(260, 180, width * 0.6, 15, 0.1));
  boundaries.push(new Boundary(530, 330, width * 0.6, 15, -0.2));
  boundaries.push(new Boundary(260, 490, width * 0.6, 15, 0.2));

  // World.add(world, ground);
}

// function mouseMoved() {
//   circles.push(
//     new Circle(mouseX, mouseY, random(5, 10)),
//     Math.floor(Math.random() * 4 + 1)
//   );
// }

function mouseMoved() {
  circles.push(
    new Circle(mouseX, mouseY, random(7, 14), Math.floor(Math.random() * 4 + 1))
  );
}

// function mousePressed() {
//   circles.push(new Circle(mouseX, mouseY, random(2, 10)));
// }

function draw() {
  // put drawing code here
  background("white");
  circles.push(
    new Circle(150, -20, random(7, 14), Math.floor(Math.random() * 4 + 1))
  );
  Engine.update(engine);
  for (var i = 0; i < circles.length; i++) {
    circles[i].show();
    if (circles[i].isOffScreen()) {
      circles[i].removeFromWorld();
      circles.splice(i, 1);
      i--;
    }
  }
  //console.log(circles.length, world.bodies.length);
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
  // ground.show();
  // box1.show();
  noStroke(255);
  fill(170);
  strokeWeight(4);
  rectMode(CENTER);
  //rect(200, height, width, 10);
}
