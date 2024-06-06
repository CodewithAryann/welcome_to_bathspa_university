var bubbles = [];
var numBubbles = 500;
var maxBubbles = 500;
var noiseScale = 200;
var archivo;
var showText = false;
var textY;
var textColor;
var textSpeed = 2;
var textGrow = 2;
var canvasHeight;
var sound;
var soundPlayed = false; 

function preload() {
  archivo = loadFont('Yatra.ttf');
  sound = loadSound('Audio.mp3'); 
}

function setup() {
  canvasHeight = windowHeight; 
  createCanvas(windowWidth, canvasHeight);
  textY = canvasHeight; 
  textColor = color(255); 
  for (var i = 0; i < numBubbles; i++) {
    var x = random(width);
    var y = random(canvasHeight);
    var radius = random(2, 25); 
    var bubbleColor = color(random(255), random(255), random(255), 200);
    bubbles.push({ x: x, y: y, radius: radius, color: bubbleColor });
  }
}

function draw() {
  background(255);
  smooth();
  noStroke();

  // Move bubbles
  for (var i = 0; i < bubbles.length; i++) {
    var angle = noise(bubbles[i].x / noiseScale, bubbles[i].y / noiseScale) * TWO_PI * noiseScale;
    var dir = createVector(cos(angle), sin(angle));
    var speed = 0.4;
    var vel = dir.copy().mult(speed);
    bubbles[i].x += vel.x;
    bubbles[i].y += vel.y;

    // Remove bubbles that go off the edges
    if (bubbles[i].x < 0 || bubbles[i].x > width || bubbles[i].y < 0 || bubbles[i].y > canvasHeight) {
      bubbles.splice(i, 1); // Remove the bubble from the array
      i--; // Decrement index to adjust for removed element
    } else {
      // Draw bubbles
      fill(bubbles[i].color);
      ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].radius, bubbles[i].radius);
    }
  }

  // Animate text if showText is true
  if (showText) {
    fill(25, 25, 112);
    strokeWeight(9);
    textFont(archivo);
    textAlign(CENTER, CENTER);
    stroke(255, 182, 193);
    textStyle(BOLDITALIC);

    // Animate text position
    if (textY > canvasHeight / 2) {
      textY -= textSpeed;
    }

    // Animate text color
    textColor = lerpColor(textColor, color(random(0), random(255), random(255)), 0.05);

    // Animate text size
    if (textGrow > 0.1) { // Adjusted threshold value to slow down the animation
      textSize(50 + textGrow); // Changed font size to 50 + textGrow
      textGrow -= 0.02; // Decreased decrement value further to speed up the animation
    } else {
      // Stop the animation when text size is small
      textGrow = 0;
    }

    fill(textColor); // Change text color
    text('Welcome to Bath Spa University', windowWidth / 2, textY);
  }
}

function mousePressed() {
  if (!soundPlayed) {
    showText = true;
    textY = canvasHeight; // Reset text position
    textColor = color(255); // Reset text color
    textGrow = 2; // Reset text size
    sound.play(); // Play the loaded audio file
    soundPlayed = true; // Set soundPlayed to true to indicate sound has been played
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




