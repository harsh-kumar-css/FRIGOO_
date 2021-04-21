function Circle(x, y, r, mod) {
  options = {
    friction: 0,
    restitution: 0.9,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  //this.h = h;
  World.add(world, this.body);

  this.removeFromWorld = function () {
    World.remove(world, this.body);
  };

  this.isOffScreen = function () {
    var pos = this.body.position;
    return pos.y > height + 100;
  };
  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    // strokeWeight(1);
    // stroke(255);

    if (mod === 1) fill(255, 128, 0);
    else if (mod === 2) fill(255, 102, 102);
    else if (mod === 3) fill(0, 102, 204);
    else if (mod === 4) fill(255, 255, 51);
    // fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(0, 0, this.r * 2);
    pop();
  };
}
