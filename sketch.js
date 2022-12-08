/* eslint-disable no-undef, no-unused-vars */

let micReady = false;
let c;

var dist = new Tone.Distortion(0.5).toDestination();
const meter = new Tone.Meter().connect(dist);
const mic = new Tone.UserMedia().connect(meter);

mic
  .open()
  .then(() => {
    // promise resolves when input is available
    console.log("mic open");
    micReady = true;
    mic.mute = true;
    // print the incoming mic levels in decibels
    // setInterval(() => console.log(meter.getValue()), 100);
  })
  .catch((e) => {
    // promise is rejected when the user doesn't have or allow mic access
    console.log("mic not open");
  });

function setup() {
  createCanvas(710, 800);
  background(60);

  createButton("Standby")
    .position(560, 439)
    .mousePressed(() => {
      if (mic.mute) {
        mic.mute = false;
      } else {
        mic.mute = true;
      }
    });

  chanSelect = createSelect();
  chanSelect.position(275, 440);
  chanSelect.option("CLEAN!");
  chanSelect.option("KRRRRAWNCH!");

  distAmnt = createSlider(0.0, 1, 0.7, 0.1);
  distAmnt.position(100, 110);

  wetAmnt = createSlider(0.0, 1, 0.7, 0.1);
  wetAmnt.position(100, 130);
}

function draw() {
  c = color(0);
  fill(c);
  rect(215, 400, 500, 350, 10, 10, 10, 10);

  c = color(255, 150, 25);
  fill(c);
  rect(220, 405, 490, 340, 70, 70, 70, 70);

  textSize(40);
  textAlign(LEFT);
  text("This Amp Sucks!", 10, 50);
  textSize(15);
  text(
    "Fix it by dialing in a SICK tone! (polt twist: you can't control anything other than mute!)",
    50,
    75
  );
  text("Distort!", 50, 125);
  text("Wet!", 50, 145);

  c = color(255, 200, 150);
  fill(c);
  rect(275, 475, 375, 200, 10, 10, 10, 10);

  c = color(255, 0, 0);
  fill(c);
  circle(640, 450, 20);

  c = color("white");
  fill(c);
  rect(417, 550, 100, 50);

  c = color(0);
  fill(c);
  textSize(50);
  textAlign(CENTER);
  text("M", 467, 592);

  dist.wet.value = wetAmnt.value();
  dist.distortion.value = distAmnt.value();
}
