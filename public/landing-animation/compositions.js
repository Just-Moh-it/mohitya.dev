class Arcer {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.xSpots = [];
    this.findXpos();

    this.yAnim = [];
    this.yTarget = [];
    this.yStart = 50;
    this.yMin = 0;
    this.yMax = -150;
    this.setYtarget();

    this.ticker = 0;

    this.blPadding = 25;
    this.blSpacing = (width - 2 * this.blPadding) / (keyArray.length - 1);

    this.ramp = ramp_;
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    for (var n = 0; n < this.inp.length; n++) {
      var tk1;
      if (accelMode == 0) {
        if (this.ramp == 0) {
          tk1 = easeOutCirc(tk0);
        } else if (this.ramp == 1) {
          tk1 = easeInCirc(tk0);
        }
        this.yAnim[n] = map(tk1, 0, 1, this.yStart, this.yTarget[n]);
      } else {
        let a, b;
        if (tk0 < 0.5) {
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a = this.yStart;
          b = this.yTarget[n] / 2;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a = this.yTarget[n] / 2;
          b = this.yTarget[n];
        }
        this.yAnim[n] = map(tk1, 0, 1, a, b);
      }
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(0, (this.pgTextSize * thisFontAdjust) / 2);
    textSize(this.pgTextSize);
    textAlign(LEFT);

    fill(foreColor);
    noStroke();

    for (var n = 0; n < this.inp.length; n++) {
      push();
      translate(this.xSpots[n], height / 2);
      translate(0, this.yAnim[n]);
      text(this.inp.charAt(n), 0, 0);
      pop();
    }
    pop();
  }

  findXpos() {
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width / 2 - fullSize / 2;

    for (var n = 0; n < this.inp.length; n++) {
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0, n + 1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  setYtarget() {
    for (var n = 0; n < this.inp.length; n++) {
      this.yAnim[n] = this.yMin;

      var tk0 = map(n, 0, this.inp.length - 1, 0, 2 * PI);
      this.yTarget[n] = map(cos(tk0), 1, -1, this.yMin, this.yMax);
    }
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  removeGraphics() {}
}

class Bend {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();

    this.ticker = 0;

    this.ramp = ramp_;

    this.res = 300;
    this.xSpace = this.pgA.width / this.res;
    this.yTopAnim;
    this.yBotAnim;

    this.yTopCorner = (height - this.pgA.height) / 2;
    this.yBotCorner = (height - this.pgA.height) / 2 + this.pgA.height;
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    let a0, b0;
    let a1, b1;
    if (accelMode == 0) {
      if (this.ramp == 0) {
        tk1 = easeOutCirc(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInCirc(tk0);
      }
      a0 = 0;
      b0 = -this.yTopCorner;

      a1 = this.pgA.height;
      b1 = this.yBotCorner;
    } else {
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = 0;
        b0 = -this.yTopCorner / 2;

        a1 = this.pgA.height;
        b1 = (this.yBotCorner + this.pgA.height) / 2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = -this.yTopCorner / 2;
        b0 = -this.yTopCorner;

        a1 = (this.yBotCorner + this.pgA.height) / 2;
        b1 = this.yBotCorner;
      }
    }

    this.yTopAnim = map(tk1, 0, 1, a0, b0);
    this.yBotAnim = map(tk1, 0, 1, a1, b1);
  }

  display() {
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);
    translate(-this.pgA.width / 2, -this.pgA.height / 2);

    texture(this.pgA);
    stroke(foreColor);
    // fill(bkgdColor);

    beginShape(TRIANGLE_STRIP);
    for (var n = 0; n <= this.res; n++) {
      let t = n / this.res;

      let x = bezierPoint(0, width / 2, width / 2, width, t);
      let yTop = bezierPoint(this.yTopAnim, 0, 0, this.yTopAnim, t);
      let yBot = bezierPoint(
        this.yBotAnim,
        this.pgA.height,
        this.pgA.height,
        this.yBotAnim,
        t
      );

      var u = map(x, 0, this.pgA.width, 0, 1);

      vertex(x, yTop, u, 0);
      vertex(x, yBot, u, 1);
    }
    endShape();
    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));

    this.pgA = createGraphics(
      repeatSize,
      this.pgTextSize * (thisFontAdjust + 0.1)
    );
    this.pgA.background(bkgdColor);

    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width / 2, thisAdjust);
  }

  removeGraphics() {
    this.pgA.remove();
  }
}

class Blank {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();

    this.ticker = 0;
  }

  update() {
    this.ticker++;
  }

  display() {
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);
    translate(-this.pgA.width / 2, -this.pgA.height / 2);
    image(this.pgA, 0, 0);
    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));

    this.pgA = createGraphics(
      repeatSize,
      this.pgTextSize * (thisFontAdjust + 0.05)
    );
    this.pgA.background(bkgdColor);

    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.translate(width / 2, thisAdjust);
    this.pgA.text(this.inp, 0, 0);
  }

  removeGraphics() {
    this.pgA.remove();
  }
}
class Box {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();

    this.ticker = 0;

    this.ramp = ramp_;

    this.stripH = this.pgA.height;

    this.xRot;
    this.xRotMax = random(-PI, PI);
    this.yRot;
    this.yRotMax = random(-PI / 8, PI / 8);
    this.zRot;
    this.zRotMax = random(-PI / 2, PI / 2);
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    let a0, b0;
    let a1, b1;
    let a2, b2;
    if (accelMode == 0) {
      if (this.ramp == 0) {
        tk1 = easeOutCirc(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInCirc(tk0);
      }

      a0 = 0;
      b0 = this.xRotMax;
      a1 = 0;
      b1 = this.yRotMax;
      a2 = 0;
      b2 = this.zRotMax;
    } else {
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = 0;
        b0 = this.xRotMax / 2;
        a1 = 0;
        b1 = this.yRotMax / 2;
        a2 = 0;
        b2 = this.zRotMax / 2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = this.xRotMax / 2;
        b0 = this.xRotMax;
        a1 = this.yRotMax / 2;
        b1 = this.yRotMax;
        a2 = this.zRotMax / 2;
        b2 = this.zRotMax;
      }
    }

    this.xRot = map(tk1, 0, 1, a0, b0);
    this.yRot = map(tk1, 0, 1, a1, b1);
    this.zRot = map(tk1, 0, 1, a2, b2);
  }

  display() {
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);
    rotateY(this.yRot);
    rotateX(this.xRot);
    rotateZ(this.zRot);

    for (var m = 0; m < 4; m++) {
      if (m % 2 == 0) {
        texture(this.pgA);
      } else {
        texture(this.pgB);
      }

      push();
      rotateX((m * PI) / 2);
      beginShape(TRIANGLE_STRIP);
      vertex(-this.pgA.width / 2, -this.pgA.height / 2, this.stripH / 2, 0, 0);
      vertex(-this.pgA.width / 2, this.pgA.height / 2, this.stripH / 2, 0, 1);
      vertex(this.pgA.width / 2, -this.pgA.height / 2, this.stripH / 2, 1, 0);
      vertex(this.pgA.width / 2, this.pgA.height / 2, this.stripH / 2, 1, 1);
      endShape();
      pop();

      push();
      fill(bkgdColor);
      noStroke();
      translate(-this.pgA.width / 2, -this.pgA.height / 2, this.stripH / 2);
      rotateY(PI / 2);
      rect(-1, -1, this.stripH + 2, this.stripH + 2);
      translate(0, 0, this.pgA.width);
      rect(-1, -1, this.stripH + 2, this.stripH + 2);
      pop();
    }

    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));

    this.pgA = createGraphics(
      repeatSize,
      this.pgTextSize * (thisFontAdjust + 0.1)
    );
    this.pgA.background(bkgdColor);
    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width / 2, thisAdjust);

    this.pgB = createGraphics(repeatSize, this.pgTextSize * 0.8);
    this.pgB.background(foreColor);
    this.pgB.fill(bkgdColor);
    this.pgB.noStroke();
    this.pgB.textSize(this.pgTextSize);
    this.pgB.textAlign(CENTER);
    this.pgB.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgB.text(this.inp, this.pgA.width / 2, thisAdjust);
  }

  removeGraphics() {
    this.pgA.remove();
    this.pgB.remove();
  }
}
class BugEyes {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.repeats;
    this.pgTextSize = 2;
    this.findTextSize();

    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.xSpots = [];
    this.shutterAnim = [];
    this.findXpos();

    this.xAnim = [];

    this.ramp = ramp_;

    this.pacer = sceneLength / 2 / this.inp.length;
  }

  update() {
    this.ticker++;

    for (var n = 0; n < this.inp.length; n++) {
      for (var p = 0; p < this.repeats; p++) {
        var thisDist = dist(n, p, this.inp.length / 2, this.repeats / 2);
        var tk00 = constrain(
          this.ticker - this.pacer * thisDist,
          0,
          sceneLength
        );
        var tk0 = map(tk00, 0, sceneLength, 0.0, 1.0);

        var tk1;
        if (this.ramp == 0) {
          tk1 = easeOutQuad(tk0);
        } else if (this.ramp == 1) {
          tk1 = easeInQuad(tk0);
        }

        this.shutterAnim[n][p] = map(tk1, 0, 1, this.pg[n].height, 0);
      }
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(0, height / 2);
    translate(0, -this.pg[0].height / 2);

    textSize(this.pgTextSize);
    textAlign(LEFT);

    fill(foreColor);
    noStroke();

    for (var n = 0; n < this.inp.length; n++) {
      push();
      translate(0, (-this.repeats * this.pg[n].height) / 2);

      translate(0, ((n % 2) * this.pg[n].height) / 2);

      for (var p = 0; p < this.repeats; p++) {
        push();
        translate(this.xSpots[n], p * this.pg[n].height);
        texture(this.pg[n]);

        var vTop = 0;
        var vBot = map(
          this.pg[n].height - this.shutterAnim[n][p],
          0,
          this.pg[n].height,
          0,
          1
        );

        beginShape(TRIANGLE_STRIP);
        vertex(0, this.shutterAnim[n][p], 0, vTop);
        vertex(0, this.pg[n].height, 0, vBot);
        vertex(this.pg[n].width, this.shutterAnim[n][p], 1, vTop);
        vertex(this.pg[n].width, this.pg[n].height, 1, vBot);
        endShape();
        pop();
      }
      pop();
    }
    pop();
  }

  findXpos() {
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width / 2 - fullSize / 2;

    for (var n = 0; n < this.inp.length; n++) {
      this.shutterAnim[n] = [];

      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0, n + 1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  makeTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);

    for (var n = 0; n < this.inp.length; n++) {
      var repeatSize = round(textWidth(this.inp.charAt(n)));

      this.pg[n] = createGraphics(
        repeatSize,
        this.pgTextSize * (thisFontAdjust + 0.05)
      );
      this.pg[n].background(bkgdColor);

      this.pg[n].fill(foreColor);
      this.pg[n].noStroke();
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(currentFont);
      var thisAdjust =
        this.pg[n].height / 2 +
        (this.pgTextSize * thisFontAdjust) / 2 +
        this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width / 2, thisAdjust);
    }

    this.repeats = floor(height / this.pg[0].height) + 2;
  }

  removeGraphics() {
    for (var n = 0; n < this.inp.length; n++) {
      this.pg[n].remove();
    }
  }
}
class BugEyesEE {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.repeats;
    this.pgTextSize = 2;
    this.findTextSize();

    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.xSpots = [];
    this.shutterAnim = [];
    this.shutterAnimBot = [];
    this.findXpos();

    this.xAnim = [];

    this.ramp = ramp_;

    this.pacer = sceneLength / 2 / this.inp.length;
  }

  update() {
    this.ticker++;

    for (var n = 0; n < this.inp.length; n++) {
      for (var p = 0; p < this.repeats; p++) {
        var thisDist = dist(n, p, this.inp.length / 2, this.repeats / 2);
        var tk00 = constrain(
          this.ticker - this.pacer * thisDist,
          0,
          sceneLength
        );
        var tk0 = map(tk00, 0, sceneLength, 0.0, 1.0);

        var tk1;
        var a0, b0;
        var a1, b1;
        if (tk0 < 0.5) {
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a0 = this.pg[n].height;
          b0 = 0;
          a1 = this.pg[n].height;
          b1 = this.pg[n].height;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a0 = 0;
          b0 = 0;
          a1 = this.pg[n].height;
          b1 = 0;
        }

        this.shutterAnim[n][p] = map(tk1, 0, 1, a0, b0);
        this.shutterAnimBot[n][p] = map(tk1, 0, 1, a1, b1);
      }
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(0, height / 2);
    translate(0, -this.pg[0].height / 2);

    textSize(this.pgTextSize);
    textAlign(LEFT);

    fill(foreColor);
    noStroke();

    for (var n = 0; n < this.inp.length; n++) {
      push();
      translate(0, (-this.repeats * this.pg[n].height) / 2);

      translate(0, ((n % 2) * this.pg[n].height) / 2);

      for (var p = 0; p < this.repeats; p++) {
        push();
        translate(this.xSpots[n], p * this.pg[n].height);
        texture(this.pg[n]);

        var vTop = map(this.shutterAnimBot[n][p], 0, this.pg[n].height, 1, 0);
        var vBot = map(
          this.pg[n].height - this.shutterAnim[n][p],
          0,
          this.pg[n].height,
          0,
          1
        );

        beginShape(TRIANGLE_STRIP);
        vertex(0, this.shutterAnim[n][p], 0, vTop);
        vertex(0, this.shutterAnimBot[n][p], 0, vBot);
        vertex(this.pg[n].width, this.shutterAnim[n][p], 1, vTop);
        vertex(this.pg[n].width, this.shutterAnimBot[n][p], 1, vBot);
        endShape();
        pop();
      }
      pop();
    }
    pop();
  }

  findXpos() {
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width / 2 - fullSize / 2;

    for (var n = 0; n < this.inp.length; n++) {
      this.shutterAnim[n] = [];
      this.shutterAnimBot[n] = [];

      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0, n + 1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  makeTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);

    for (var n = 0; n < this.inp.length; n++) {
      var repeatSize = round(textWidth(this.inp.charAt(n)));

      this.pg[n] = createGraphics(
        repeatSize,
        this.pgTextSize * (thisFontAdjust + 0.05)
      );
      this.pg[n].background(bkgdColor);

      this.pg[n].fill(foreColor);
      this.pg[n].noStroke();
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(currentFont);
      var thisAdjust =
        this.pg[n].height / 2 +
        (this.pgTextSize * thisFontAdjust) / 2 +
        this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width / 2, thisAdjust);
    }

    this.repeats = floor(height / this.pg[0].height) + 2;
  }

  removeGraphics() {
    for (var n = 0; n < this.inp.length; n++) {
      this.pg[n].remove();
    }
  }
}
class Cloud {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.x = [];
    this.xH = [];
    this.y = [];
    this.yH = [];
    this.yCore = [];
    this.yCoreMax = [];
    this.yCoreMax[0] = constrain(-this.pgTextSize, -height / 2, 0); /// back cloud
    this.yCoreMax[1] = (this.pgTextSize * thisFontAdjust) / 2; /// text
    this.yCoreMax[2] = constrain(this.pgTextSize, height / 2, 0); /// front cloud
    this.yCoreMin = [];
    this.yCoreMin[0] = constrain(-this.pgTextSize / 2, -height / 4, 0);
    this.yCoreMin[1] = this.pgTextSize * thisFontAdjust;
    this.yCoreMin[2] = constrain(this.pgTextSize / 2, height / 4, 0);

    this.cloudCount = 2;
    this.pointCount = 7;
    this.ang = (2 * PI) / this.pointCount;
    this.cloudW = width;
    this.cloudH = height / 3;

    this.debrisCount = 10;

    this.xD = [];
    this.yD = [];
    this.xStart = [];
    this.yStart = [];
    this.xEnd = [];
    this.yEnd = [];
    this.rD = [];
    this.rStart = [];
    this.rEnd = [];

    this.sDw = [];
    this.sDh = [];

    this.cloudRefreshCount = 20;

    this.makeCloud();

    this.ticker = 0;

    this.ramp = ramp_;
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    if (this.ramp == 0) {
      tk1 = easeOutCirc(tk0);
    } else if (this.ramp == 1) {
      tk1 = easeInCirc(tk0);
    }

    for (var m = 0; m < this.debrisCount; m++) {
      this.xD[m] = map(tk1, 0, 1, this.xStart[m], this.xEnd[m]);
      this.yD[m] = map(tk1, 0, 1, this.yStart[m], this.yEnd[m]);
      this.rD[m] = map(tk1, 0, 1, this.rStart[m], this.rEnd[m]);
    }

    for (var m = 0; m < 3; m++) {
      this.yCore[m] = map(tk1, 0, 1, this.yCoreMin[m], this.yCoreMax[m]);
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(width / 2, height / 2);

    //////////// BACK CLOUD

    push();
    translate(-50, this.yCore[0]);

    fill(bkgdColor);
    stroke(foreColor);
    strokeWeight(4);

    beginShape();
    vertex(this.x[0][0], this.y[0][0]);
    for (var n = 1; n < this.pointCount; n++) {
      bezierVertex(
        this.xH[0][n - 1],
        this.yH[0][n - 1],
        this.xH[0][n],
        this.yH[0][n],
        this.x[0][n],
        this.y[0][n]
      );
    }
    bezierVertex(
      this.xH[0][this.pointCount - 1],
      this.yH[0][this.pointCount - 1],
      this.xH[0][0],
      this.yH[0][0],
      this.x[0][0],
      this.y[0][0]
    );
    endShape();
    pop();

    //////////// TEXT
    push();
    translate(0, this.yCore[1], 1);

    noStroke();
    fill(foreColor);
    textFont(currentFont);
    textAlign(CENTER);
    textSize(this.pgTextSize);
    text(this.inp, 0, 0);
    pop();

    //////////// DEBRIS
    for (var m = 0; m < this.debrisCount; m++) {
      push();
      translate(this.xD[m], this.yD[m], 5);
      rotateZ(this.rD[m]);

      fill(bkgdColor);
      stroke(foreColor);
      strokeWeight(4);

      ellipse(0, 0, this.sDw[m], this.sDh[m]);
      pop();
    }

    //////////// TOP CLOUD
    push();
    translate(50, this.yCore[2], 10);

    fill(bkgdColor);
    stroke(foreColor);
    strokeWeight(4);

    beginShape();
    vertex(this.x[1][0], this.y[1][0]);
    for (var n = 1; n < this.pointCount; n++) {
      bezierVertex(
        this.xH[1][n - 1],
        this.yH[1][n - 1],
        this.xH[1][n],
        this.yH[1][n],
        this.x[1][n],
        this.y[1][n]
      );
    }
    bezierVertex(
      this.xH[1][this.pointCount - 1],
      this.yH[1][this.pointCount - 1],
      this.xH[1][0],
      this.yH[1][0],
      this.x[1][0],
      this.y[1][0]
    );
    endShape();
    pop();
    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  makeCloud() {
    for (var m = 0; m < this.cloudCount; m++) {
      this.x[m] = [];
      this.y[m] = [];
      this.xH[m] = [];
      this.yH[m] = [];

      for (var n = 0; n < this.pointCount; n++) {
        var radRanX = random(width / 8, width / 4);
        var radRanY = random(height / 8, height / 4);
        var angRad = random(-PI / 8, PI / 8);
        var handleLength = random(200, 300);

        this.x[m][n] = cos(n * this.ang - angRad) * (this.cloudW - radRanX);
        this.y[m][n] = sin(n * this.ang - angRad) * (this.cloudH - radRanY);

        this.xH[m][n] =
          this.x[m][n] + cos(n * this.ang - angRad) * handleLength;
        this.yH[m][n] =
          this.y[m][n] + sin(n * this.ang - angRad) * handleLength;
      }
    }

    for (var m = 0; m < this.debrisCount; m++) {
      var ang = m * 1.2;
      var radStart = random(width / 8, width / 4);
      var radEnd = radStart + random(width / 8, width / 2);

      this.xStart[m] = cos(ang) * radStart;
      this.yStart[m] = sin(ang) * radStart;

      this.xEnd[m] = cos(ang) * radEnd;
      this.yEnd[m] = sin(ang) * radEnd;

      var direction = 1;
      if (random(10) < 5) {
        direction = -1;
      }
      this.rStart[m] = random(direction * PI);
      this.rEnd[m] = this.rStart[m] + random(direction * PI);

      this.sDw[m] = random(10, 80);
      this.sDh[m] = random(10, 80);
    }
  }

  removeGraphics() {}
}
class Grid {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();

    this.ticker = 0;

    this.ramp = ramp_;

    this.xCount = 10;
    this.xSpace = this.pgA.width / this.xCount;
    this.yCount = 30;
    this.ySpace = this.pgA.height / this.yCount;

    this.yAnim = [];
    this.xAnim = [];
    this.yAnimTarget = [];
    this.xAnimTarget = [];
    this.findTargets();
  }

  update() {
    this.ticker++;

    for (var m = 0; m <= this.yCount; m++) {
      for (var n = 0; n <= this.xCount; n++) {
        var delayDist = dist(n, m, this.xCount / 2, this.yCount / 2);

        var tk00 = constrain(
          this.ticker - delayDist * 0.5 + 10,
          0,
          sceneLength
        );
        var tk0 = map(tk00, 0, sceneLength, 0, 1);
        var tk1;
        if (this.ramp == 0) {
          tk1 = easeOutQuad(tk0);
        } else if (this.ramp == 1) {
          tk1 = easeInQuad(tk0);
        }

        this.xAnim[m][n] = map(tk1, 0, 1, this.xAnimTarget[m][n], 0);
        this.yAnim[m][n] = map(tk1, 0, 1, this.yAnimTarget[m][n], 0);
      }
    }
  }

  display() {
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);
    translate(-this.pgA.width / 2, -this.pgA.height / 2);

    texture(this.pgA);
    // stroke(foreColor);
    // fill(bkgdColor);

    for (var m = 0; m < this.yCount; m++) {
      beginShape(TRIANGLE_STRIP);
      for (var n = 0; n <= this.xCount; n++) {
        var xLeft = n * this.xSpace;
        var xRight = (n + 1) * this.xSpace;
        var yTop = m * this.ySpace;
        var yBot = (m + 1) * this.ySpace;

        var uLeft = map(xLeft + this.xAnim[m][n], 0, this.pgA.width, 0, 1);
        var uRight = map(xRight + this.xAnim[m][n], 0, this.pgA.width, 0, 1);
        var vTop = map(yTop + this.yAnim[m][n], 0, this.pgA.height, 0, 1);
        var vBot = map(yBot + this.yAnim[m][n], 0, this.pgA.height, 0, 1);

        vertex(xLeft, yTop, uLeft, vTop);
        vertex(xLeft, yBot, uLeft, vBot);
        vertex(xRight, yTop, uRight, vTop);
        vertex(xRight, yBot, uRight, vBot);
      }
      endShape();
    }
    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  findTargets() {
    for (var m = 0; m <= this.yCount; m++) {
      this.xAnim[m] = [];
      this.yAnim[m] = [];

      this.xAnimTarget[m] = [];
      this.yAnimTarget[m] = [];
      for (var n = 0; n <= this.xCount; n++) {
        var pacer = dist(n, m, this.xCount / 2, this.yCount / 2);

        var xDirect = 1;
        var yDirect = 1;
        if (n > this.xCount / 2) {
          xDirect = -1;
        }
        if (m > this.yCount / 2) {
          yDirect = -1;
        }

        this.xAnimTarget[m][n] = xDirect * (5 * pacer) + random(-25, 25);
        this.yAnimTarget[m][n] = yDirect * (20 * pacer);
      }
    }
  }

  drawTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));

    this.pgA = createGraphics(repeatSize, this.pgTextSize * 0.8);
    this.pgA.background(bkgdColor);

    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    this.pgA.text(
      this.inp,
      this.pgA.width / 2,
      this.pgA.height / 2 + (this.pgTextSize * thisFontAdjust) / 2
    );
  }

  removeGraphics() {
    this.pgA.remove();
  }
}
class Halo {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();

    this.ticker = 0;

    this.ramp = ramp_;

    this.res = 100;
    this.ang = (2 * PI) / this.res;
    this.radius = width / 2;
    this.sec = (2 * PI * this.radius) / this.res;
    this.stripH = this.pgA.height;

    this.xRot;
    this.xRotMax = random(-PI / 4, PI / 4);

    this.zRot;
    this.zRotMax = random(-PI / 4, PI / 4);

    this.heightRatio = (this.pgA.width * this.stripH) / this.pgA.height;
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    let a0, b0;
    let a1, b1;
    if (accelMode == 0) {
      if (this.ramp == 0) {
        tk1 = easeOutCirc(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInCirc(tk0);
      }

      a0 = 0;
      b0 = this.xRotMax;
      a1 = 0;
      b1 = this.zRotMax;
    } else {
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = 0;
        b0 = this.xRotMax / 2;
        a1 = 0;
        b1 = this.zRotMax / 2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = this.xRotMax / 2;
        b0 = this.xRotMax;
        a1 = this.zRotMax / 2;
        b1 = this.zRotMax;
      }
    }

    this.xRot = map(tk1, 0, 1, a0, b0);
    this.zRot = map(tk1, 0, 1, a1, b1);
  }

  display() {
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);
    rotateX(this.xRot);
    rotateZ(this.zRot);

    for (var m = 0; m < 2; m++) {
      if (m == 0) {
        texture(this.pgA);
      } else {
        texture(this.pgB);
      }

      beginShape(TRIANGLE_STRIP);
      for (var n = 0; n <= this.res; n++) {
        var x = cos(n * this.ang + PI) * (this.radius - m / 2);
        var z = sin(n * this.ang + PI) * (this.radius - m / 2);
        var yTop = -this.stripH / 2 + m;
        var yBot = this.stripH / 2 - m;

        var thisDist =
          (n * this.sec + this.ticker * 2 + 600) % this.heightRatio;
        var u = map(thisDist, 0, this.heightRatio, 1, 0);

        vertex(x, yTop, z, u, 0);
        vertex(x, yBot, z, u, 1);

        if (thisDist > this.heightRatio - this.sec) {
          vertex(x, yTop, z, 1, 0);
          vertex(x, yBot, z, 1, 1);
        }
      }
      endShape();
    }

    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp)) + 200;

    this.pgA = createGraphics(
      repeatSize,
      this.pgTextSize * (thisFontAdjust + 0.1)
    );
    this.pgA.background(bkgdColor);
    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width / 2, thisAdjust);

    this.pgB = createGraphics(
      repeatSize,
      this.pgTextSize * (thisFontAdjust + 0.1)
    );
    this.pgB.background(foreColor);
    this.pgB.fill(bkgdColor);
    this.pgB.noStroke();
    this.pgB.textSize(this.pgTextSize);
    this.pgB.textAlign(CENTER);
    this.pgB.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgB.text(this.inp, this.pgA.width / 2, thisAdjust);
  }

  removeGraphics() {
    this.pgA.remove();
    this.pgB.remove();
  }
}
class RiseSun {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();

    this.res = 50;
    this.ang = (2 * PI) / this.res;
    this.radiusX = height * 1.25;
    this.radiusY = height;

    this.xCenter = width / 2;
    this.direction = 1;
    if (random(10) < 5) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
    this.direction2 = 1;
    if (random(10) < 5) {
      this.direction2 = 1;
    } else {
      this.direction2 = -1;
    }
    this.yCenterStart = height / 2 + this.direction * (this.radiusY - 25);
    this.yCenterEnd = this.yCenterStart + 100;

    this.ticker = 0;

    this.ramp = ramp_;
  }

  update() {
    // this.yCenter += (this.direction2 * 0.5);
    // this.yCenter += 0.5;

    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    var a0, b0;
    if (accelMode == 0) {
      if (this.ramp == 0) {
        tk1 = easeOutCirc(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInCirc(tk0);
      }
      a0 = this.yCenterStart;
      b0 = this.yCenterEnd;
    } else {
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = this.yCenterStart;
        b0 = (this.yCenterStart + this.yCenterEnd) / 2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = (this.yCenterStart + this.yCenterEnd) / 2;
        b0 = this.yCenterEnd;
      }
    }

    this.yCenter = map(tk1, 0, 1, a0, b0);
  }

  display() {
    image(this.pgA, 0, 0);

    texture(this.pgB);
    // stroke(0, 0, 255);

    beginShape(TRIANGLE_FAN);
    // vertex(this.xCenter, this.yCenter);
    for (var n = 0; n < this.res; n++) {
      var x = this.xCenter + cos(n * this.ang) * this.radiusX;
      var y = this.yCenter + sin(n * this.ang) * this.radiusY;

      var u = map(x, 0, width, 0, 1);
      var v = map(y, 0, height, 0, 1);

      vertex(x, y, u, v);
    }
    endShape();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    this.pgA = createGraphics(width, height);
    this.pgA.background(foreColor);
    this.pgA.noStroke();
    this.pgA.fill(bkgdColor);
    this.pgA.textFont(currentFont);
    this.pgA.textAlign(CENTER);
    this.pgA.textSize(this.pgTextSize);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.translate(width / 2, thisAdjust);
    this.pgA.text(this.inp, 0, 0);

    this.pgB = createGraphics(width, height);
    this.pgB.background(bkgdColor);
    this.pgB.noStroke();
    this.pgB.fill(foreColor);
    this.pgB.textFont(currentFont);
    this.pgB.textAlign(CENTER);
    this.pgB.textSize(this.pgTextSize);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgB.translate(width / 2, thisAdjust);
    this.pgB.text(this.inp, 0, 0);
  }

  removeGraphics() {
    this.pgA.remove();
    this.pgB.remove();
  }
}
class Shutters {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.xSpots = [];
    this.findXpos();

    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.shutterAnim = [];
    this.shutterYanim = [];

    this.ramp = ramp_;

    this.pacer = sceneLength / 2 / this.inp.length;
  }

  update() {
    this.ticker++;

    for (var n = 0; n < this.inp.length; n++) {
      var tk00 = constrain(this.ticker - this.pacer * n, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1.0);

      var tk1;
      if (this.ramp == 0) {
        tk1 = easeOutQuad(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInOutQuad(tk0);
      }

      this.shutterAnim[n] = map(tk1, 0, 1, this.pg[0].height, 0);
      this.shutterYanim[n] = map(tk1, 0, 1, -this.pg[0].height / 2, 0);
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(0, height / 2);
    translate(0, -this.pg[0].height / 2);

    textSize(this.pgTextSize);
    textAlign(LEFT);

    fill(foreColor);
    noStroke();

    for (var n = 0; n < this.inp.length; n++) {
      push();
      translate(this.xSpots[n], this.shutterYanim[n]);

      texture(this.pg[n]);

      var vTop = 0;
      var vBot = map(
        this.pg[n].height - this.shutterAnim[n],
        0,
        this.pg[n].height,
        0,
        1
      );

      beginShape(TRIANGLE_STRIP);
      vertex(0, this.shutterAnim[n], 0, vTop);
      vertex(0, this.pg[n].height, 0, vBot);
      vertex(this.pg[n].width, this.shutterAnim[n], 1, vTop);
      vertex(this.pg[n].width, this.pg[n].height, 1, vBot);
      endShape();
      pop();
    }
    pop();
  }

  findXpos() {
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width / 2 - fullSize / 2;

    for (var n = 0; n < this.inp.length; n++) {
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0, n + 1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  makeTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);

    for (var n = 0; n < this.inp.length; n++) {
      var repeatSize = round(textWidth(this.inp.charAt(n)));

      this.pg[n] = createGraphics(
        repeatSize,
        this.pgTextSize * (thisFontAdjust + 0.05)
      );
      this.pg[n].background(bkgdColor);

      this.pg[n].fill(foreColor);
      this.pg[n].noStroke();
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(currentFont);
      var thisAdjust =
        this.pg[n].height / 2 +
        (this.pgTextSize * thisFontAdjust) / 2 +
        this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width / 2, thisAdjust);
    }
  }

  removeGraphics() {
    for (var n = 0; n < this.inp.length; n++) {
      this.pg[n].remove();
    }
  }
}
class Shutters2 {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.xSpots = [];
    this.findXpos();

    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.xAnim = [];

    this.shutterAnim = [];

    this.ramp = ramp_;

    this.pacer = sceneLength / 3 / this.inp.length;
  }

  update() {
    this.ticker++;

    for (var n = 0; n < this.inp.length; n++) {
      var tk00 = constrain(this.ticker - this.pacer * n, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1.0);

      var tk1;
      var a0, b0;
      var a1, b1;
      if (accelMode == 0) {
        if (this.ramp == 0) {
          tk1 = easeOutQuad(tk0);
        } else if (this.ramp == 1) {
          tk1 = easeInOutQuad(tk0);
        }
        a0 = 0;
        b0 = this.pg[n].width;
        a1 = width / 2;
        b1 = this.xSpots[n];
      } else {
        if (tk0 < 0.5) {
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a0 = 0;
          b0 = this.pg[n].width;
          a1 = width / 2;
          b1 = this.xSpots[n];
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a0 = this.pg[n].width;
          b0 = 0;
          a1 = this.xSpots[n];
          b1 = this.xSpots[n];
        }
      }

      this.shutterAnim[n] = map(tk1, 0, 1, a0, b0);
      this.xAnim[n] = map(tk1, 0, 1, a1, b1);
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(0, height / 2);
    translate(0, -this.pg[0].height / 2);

    textSize(this.pgTextSize);
    textAlign(LEFT);

    fill(foreColor);
    noStroke();

    for (var n = 0; n < this.inp.length; n++) {
      push();
      translate(this.xAnim[n], 0);

      texture(this.pg[n]);
      stroke(0, 0, 255);

      var uLeft = 0;
      var uRight = map(
        this.pg[n].width - this.shutterAnim[n],
        0,
        this.pg[n].width,
        1,
        0
      );
      // var uRight =1;

      beginShape(TRIANGLE_STRIP);
      vertex(0, 0, uLeft, 0);
      vertex(0, this.pg[n].height, uLeft, 1);
      vertex(this.shutterAnim[n], 0, uRight, 0);
      vertex(this.shutterAnim[n], this.pg[n].height, uRight, 1);
      endShape();
      pop();
    }
    pop();
  }

  findXpos() {
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width / 2 - fullSize / 2;

    for (var n = 0; n < this.inp.length; n++) {
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0, n + 1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  makeTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);

    for (var n = 0; n < this.inp.length; n++) {
      var repeatSize = round(textWidth(this.inp.charAt(n)));

      this.pg[n] = createGraphics(
        repeatSize,
        this.pgTextSize * (thisFontAdjust + 0.05)
      );
      this.pg[n].background(bkgdColor);

      this.pg[n].fill(foreColor);
      this.pg[n].noStroke();
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(currentFont);
      var thisAdjust =
        this.pg[n].height / 2 +
        (this.pgTextSize * thisFontAdjust) / 2 +
        this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width / 2, thisAdjust);
    }
  }

  removeGraphics() {
    for (var n = 0; n < this.inp.length; n++) {
      this.pg[n].remove();
    }
  }
}
class ShuttersEE {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.xSpots = [];
    this.findXpos();

    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.shutterAnim = [];
    this.shutterAnimBot = [];
    this.shutterYanim = [];

    this.ramp = ramp_;

    this.pacer = sceneLength / 2 / this.inp.length;
  }

  update() {
    this.ticker++;

    for (var n = 0; n < this.inp.length; n++) {
      var tk00 = constrain(this.ticker - this.pacer * n, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1.0);

      var tk1;
      var a0, b0;
      var a1, b1;
      var a2, b2;
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = this.pg[n].height;
        b0 = 0;
        a1 = this.pg[n].height;
        b1 = this.pg[n].height;

        a2 = this.pg[0].height / 2;
        b2 = 0;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = 0;
        b0 = 0;
        a1 = this.pg[n].height;
        b1 = 0;

        a2 = 0;
        b2 = -this.pg[0].height / 2;
      }

      this.shutterAnim[n] = map(tk1, 0, 1, a0, b0);
      this.shutterAnimBot[n] = map(tk1, 0, 1, a1, b1);
      this.shutterYanim[n] = map(tk1, 0, 1, a2, b2);
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(0, height / 2);
    translate(0, -this.pg[0].height / 2);

    textSize(this.pgTextSize);
    textAlign(LEFT);

    fill(foreColor);
    noStroke();

    for (var n = 0; n < this.inp.length; n++) {
      push();
      translate(this.xSpots[n], this.shutterYanim[n]);

      texture(this.pg[n]);

      var vTop = map(this.shutterAnimBot[n], 0, this.pg[n].height, 1, 0);
      var vBot = map(
        this.pg[n].height - this.shutterAnim[n],
        0,
        this.pg[n].height,
        0,
        1
      );

      beginShape(TRIANGLE_STRIP);
      vertex(0, this.shutterAnim[n], 0, vTop);
      vertex(0, this.shutterAnimBot[n], 0, vBot);
      vertex(this.pg[n].width, this.shutterAnim[n], 1, vTop);
      vertex(this.pg[n].width, this.shutterAnimBot[n], 1, vBot);
      endShape();
      pop();
    }
    pop();
  }

  findXpos() {
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width / 2 - fullSize / 2;

    for (var n = 0; n < this.inp.length; n++) {
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0, n + 1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  makeTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);

    for (var n = 0; n < this.inp.length; n++) {
      var repeatSize = round(textWidth(this.inp.charAt(n)));

      this.pg[n] = createGraphics(
        repeatSize,
        this.pgTextSize * (thisFontAdjust + 0.05)
      );
      this.pg[n].background(bkgdColor);

      this.pg[n].fill(foreColor);
      this.pg[n].noStroke();
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(currentFont);
      var thisAdjust =
        this.pg[n].height / 2 +
        (this.pgTextSize * thisFontAdjust) / 2 +
        this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width / 2, thisAdjust);
    }
  }

  removeGraphics() {
    for (var n = 0; n < this.inp.length; n++) {
      this.pg[n].remove();
    }
  }
}
class Snap {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.xKern = [];
    this.xWidths = [];
    this.xScaleMax = 0.2;
    this.xScale = [];
    this.xShear = [];
    this.xShearMax = -PI / 8;
    this.findSpacing();

    this.ticker = 0;

    this.ramp = ramp_;

    this.pacer = sceneLength / 1.5 / this.inp.length;
  }

  update() {
    this.ticker++;

    for (var n = 0; n < this.inp.length; n++) {
      var tk00 = constrain(this.ticker - n * this.pacer, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1);
      var tk1;
      var a0, b0;
      var a1, b1;
      if (accelMode == 0) {
        if (this.ramp == 0) {
          tk1 = easeOutQuad(tk0);
        } else if (this.ramp == 1) {
          tk1 = easeInQuad(tk0);
        }
        a0 = this.xScaleMax;
        b0 = 1;
        a1 = this.xShearMax;
        b1 = 0;
      } else {
        if (tk0 < 0.5) {
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a0 = this.xScaleMax;
          b0 = (this.xScaleMax + 1) / 2;
          a1 = this.xShearMax;
          b1 = this.xShearMax / 2;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a0 = (this.xScaleMax + 1) / 2;
          b0 = 1;
          a1 = this.xShearMax / 2;
          b1 = 0;
        }
      }

      this.xScale[n] = map(tk1, 0, 1, a0, b0);
      this.xShear[n] = map(tk1, 0, 1, a1, b1);

      this.xWidths[n] = textWidth(this.inp.charAt(n)) * this.xScale[n];
    }

    var fullSize = 0;
    for (var n = 0; n < this.inp.length - 1; n++) {
      this.xKern[n] = this.xWidths[n] / 2 + this.xWidths[n + 1] / 2;
      fullSize += this.xKern[n];
    }
    this.xKern[this.inp.length - 1] = 0;

    this.xStart = -fullSize / 2;
  }

  display() {
    background(bkgdColor);

    fill(foreColor);
    noStroke();

    push();
    translate(width / 2, height / 2);
    translate(this.xStart, 0);
    translate(0, (this.pgTextSize * thisFontAdjust) / 2);

    textFont(currentFont);
    textSize(this.pgTextSize);
    textAlign(CENTER);
    for (var n = 0; n < this.inp.length; n++) {
      push();
      fill(foreColor);
      noStroke();
      shearX(this.xShear[n]);
      scale(this.xScale[n], 1);
      text(this.inp.charAt(n), 0, 0);
      pop();
      translate(this.xKern[n], 0);
    }
    pop();
  }

  findSpacing() {
    textFont(currentFont);
    textSize(this.pgTextSize);

    for (var n = 0; n < this.inp.length; n++) {
      this.xWidths[n] = textWidth(this.inp.charAt(n));
    }
    var fullSize = 0;
    for (var n = 0; n < this.inp.length - 1; n++) {
      this.xKern[n] = this.xWidths[n] / 2 + this.xWidths[n + 1] / 2;
      fullSize += this.xKern[n];
    }
    this.xKern[this.inp.length - 1] = 0;

    this.xStart = -fullSize / 2;
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  removeGraphics() {}
}
class SlotMachine {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.repeats = 2;
    this.pgTextSize = 2;
    this.findTextSize();

    this.xSpots = [];
    this.findXpos();

    this.yAnim = [];
    this.yTarget = [];
    this.yStart = 50;
    this.yMin = 0;
    this.yMax = -150;
    this.setYtarget();

    this.ticker = 0;

    this.blPadding = 25;
    this.blSpacing = (width - 2 * this.blPadding) / (keyArray.length - 1);

    this.ramp = ramp_;
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    for (var n = 0; n < this.inp.length; n++) {
      var tk1;
      var a0, b0;
      if (accelMode == 0) {
        if (this.ramp == 0) {
          tk1 = easeOutCirc(tk0);
        } else if (this.ramp == 1) {
          tk1 = easeInCirc(tk0);
        }
        a0 = this.yStart;
        b0 = this.yTarget[n];
      } else {
        if (tk0 < 0.5) {
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a0 = this.yStart;
          b0 = (this.yStart + this.yTarget[n]) / 2;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a0 = (this.yStart + this.yTarget[n]) / 2;
          b0 = this.yTarget[n];
        }
      }

      this.yAnim[n] = map(tk1, 0, 1, a0, b0);
    }
  }

  display() {
    background(bkgdColor);
    push();
    translate(0, (this.pgTextSize * thisFontAdjust) / 2);
    textSize(this.pgTextSize);
    textAlign(LEFT);

    fill(foreColor);
    noStroke();

    for (var n = 0; n < this.inp.length; n++) {
      push();
      translate(this.xSpots[n], height / 2);
      translate(0, this.yAnim[n]);

      translate(0, (-this.repeats * (this.pgTextSize * 0.8)) / 2);
      for (var p = 0; p < this.repeats; p++) {
        text(this.inp.charAt(n), 0, p * this.pgTextSize * 0.8);
      }
      pop();
    }
    pop();
  }

  findXpos() {
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width / 2 - fullSize / 2;

    for (var n = 0; n < this.inp.length; n++) {
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0, n + 1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  setYtarget() {
    for (var n = 0; n < this.inp.length; n++) {
      this.yTarget[n] = random(-this.pgTextSize * 2, this.pgTextSize * 2);
    }
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }

    this.repeats = round((height * 2) / this.pgTextSize) + 5;
  }

  removeGraphics() {}
}
class Split {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();

    this.direction = 1;
    if (random(10) < 5) {
      this.direction = -1;
    }

    this.ticker = 0;

    this.ramp = ramp_;

    this.animShear = 0;
    this.animShearMax = (this.direction * PI) / 8;

    this.splitR = [];
    this.splitR[0] = 0;
    this.splitR[1] = this.splitR[0] + random(0.1, 0.4);
    this.splitR[2] = this.splitR[1] + random(0.1, 0.6);
    this.splitR[3] = 1;

    this.animX = [];
    this.animXmax = [];
    this.animXmax[0] = this.direction * -100;
    this.animXmax[1] = this.direction * 50;
    this.animXmax[2] = this.direction * 25;
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    if (accelMode == 0) {
      if (this.ramp == 0) {
        tk1 = easeOutCirc(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInCirc(tk0);
      }

      this.animShear = map(tk1, 0, 1, 0, this.animShearMax);

      for (var m = 0; m < 3; m++) {
        this.animX[m] = map(tk1, 0, 1, 0, this.animXmax[m]);
      }
    } else {
      let a, b;
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a = 0;
        b = this.animShearMax / 2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a = this.animShearMax / 2;
        b = this.animShearMax;
      }
      this.animShear = map(tk1, 0, 1, a, b);

      for (var m = 0; m < 3; m++) {
        let a, b;
        if (tk0 < 0.5) {
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a = 0;
          b = this.animXmax[m] / 2;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a = this.animXmax[m] / 2;
          b = this.animXmax[m];
        }
        this.animX[m] = map(tk1, 0, 1, a, b);
      }
    }
  }

  display() {
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);

    scale(0.75);
    shearX(this.animShear);
    translate(-this.pgA.width / 2, -this.pgA.height / 2);

    texture(this.pgA);

    for (var m = 0; m < 3; m++) {
      translate(this.animX[m], 0);
      beginShape(TRIANGLE_STRIP);
      vertex(0, this.pgA.height * this.splitR[m], 0, this.splitR[m]);
      vertex(0, this.pgA.height * this.splitR[m + 1], 0, this.splitR[m + 1]);
      vertex(
        this.pgA.width,
        this.pgA.height * this.splitR[m],
        1,
        this.splitR[m]
      );
      vertex(
        this.pgA.width,
        this.pgA.height * this.splitR[m + 1],
        1,
        this.splitR[m + 1]
      );
      endShape();
    }
    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));

    this.pgA = createGraphics(
      repeatSize,
      this.pgTextSize * (thisFontAdjust + 0.05)
    );
    this.pgA.background(bkgdColor);

    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width / 2, thisAdjust);
  }

  removeGraphics() {
    this.pgA.remove();
  }
}
class Starburst {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();

    this.res = round(random(2, 10)) * 4;
    this.ang = (2 * PI) / this.res;
    this.radiusX;
    this.radiusY;
    this.radiusMinX = 0;
    this.radiusMaxX = width / 2;
    this.radiusMinY = 0;
    this.radiusMaxY = height / 2;
    this.radiusXinner = width / 8;
    this.radiusYinner = height / 8;

    this.xCenter = width / 2;
    this.yCenter = height / 2;
    this.yMin = (height * 3) / 4;
    this.yMax = height / 2;

    this.rotZ = 0;
    this.rotZmax = random(-PI, PI);

    this.ticker = 0;

    this.ramp = ramp_;
  }

  update() {
    // this.yCenter += (this.direction2 * 0.5);
    // this.yCenter += 0.5;

    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    var a0, b0;
    var a1, b1;
    var a2, b2;
    var a3, b3;
    if (accelMode == 0) {
      if (this.ramp == 0) {
        tk1 = easeOutCirc(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInCirc(tk0);
      }
      a0 = this.radiusMinX;
      b0 = this.radiusMaxX;
      a1 = this.radiusMinY;
      b1 = this.radiusMaxY;
      a2 = 0;
      b2 = this.rotZmax;
      a3 = this.yMin;
      b3 = this.yMax;
    } else {
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = this.radiusMinX;
        b0 = (this.radiusMinX + this.radiusMaxX) / 2;
        a1 = this.radiusMinY;
        b1 = (this.radiusMinY + this.radiusMaxY) / 2;
        a2 = 0;
        b2 = this.rotZmax / 2;
        a3 = this.yMin;
        b3 = (this.yMin + this.yMax) / 2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = (this.radiusMinX + this.radiusMaxX) / 2;
        b0 = this.radiusMaxX;
        a1 = (this.radiusMinY + this.radiusMaxY) / 2;
        b1 = this.radiusMaxY;
        a2 = this.rotZmax / 2;
        b2 = this.rotZmax;
        a3 = (this.yMin + this.yMax) / 2;
        b3 = this.yMax;
      }
    }

    this.radiusX = map(tk1, 0, 1, a0, b0);
    this.radiusY = map(tk1, 0, 1, a1, b1);
    this.rotZ = map(tk1, 0, 1, 0, a2, b2);

    this.yCenter = map(tk1, 0, 1, a3, b3);
  }

  display() {
    image(this.pgA, 0, 0);

    texture(this.pgB);
    // stroke(0, 0, 255);

    beginShape(TRIANGLE_FAN);
    vertex(this.xCenter, this.yCenter, 0.5, 0.5);
    for (var n = 0; n <= this.res; n++) {
      var nowRadiusX = this.radiusXinner;
      var nowRadiusY = this.radiusYinner;
      if (n % 2 == 0) {
        nowRadiusX = this.radiusX;
        nowRadiusY = this.radiusY;
      }

      var x = this.xCenter + cos(n * this.ang + this.rotZ) * nowRadiusX;
      var y = this.yCenter + sin(n * this.ang + this.rotZ) * nowRadiusY;

      var u = map(x, 0, width, 0, 1);
      var v = map(y, 0, height, 0, 1);

      vertex(x, y, u, v);
    }
    endShape();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    this.pgA = createGraphics(width, height);
    this.pgA.background(foreColor);
    this.pgA.noStroke();
    this.pgA.fill(bkgdColor);
    this.pgA.textFont(currentFont);
    this.pgA.textAlign(CENTER);
    this.pgA.textSize(this.pgTextSize);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.translate(width / 2, thisAdjust);
    this.pgA.text(this.inp, 0, 0);

    this.pgB = createGraphics(width, height);
    this.pgB.background(bkgdColor);
    this.pgB.noStroke();
    this.pgB.fill(foreColor);
    this.pgB.textFont(currentFont);
    this.pgB.textAlign(CENTER);
    this.pgB.textSize(this.pgTextSize);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgB.translate(width / 2, thisAdjust);
    this.pgB.text(this.inp, 0, 0);
  }

  removeGraphics() {
    this.pgA.remove();
    this.pgB.remove();
  }
}
class Twist {
  constructor(ramp_, inp_) {
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();

    this.ticker = 0;

    this.ramp = ramp_;

    this.yOutside = (height - this.pgA.height) / 2;

    this.d = 1;
    if (random(10) < 5) {
      this.d = -1;
    }

    this.res = 300;
    this.tl = createVector(0, 0);
    this.bl = createVector(0, this.pgA.height);
    this.tml = createVector(this.pgA.width / 3, 0);
    this.bml = createVector(this.pgA.width / 3, this.pgA.height);
    this.tmr = createVector((this.pgA.width * 2) / 3, 0);
    this.bmr = createVector((this.pgA.width * 2) / 3, this.pgA.height);
    this.tr = createVector(this.pgA.width, 0);
    this.br = createVector(this.pgA.width, this.pgA.height);
  }

  update() {
    this.ticker++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    var a0, b0;
    var a1, b1;

    if (accelMode == 0) {
      if (this.ramp == 0) {
        tk1 = easeOutCirc(tk0);
      } else if (this.ramp == 1) {
        tk1 = easeInCirc(tk0);
      }
      if (this.d == 1) {
        a0 = 0;
        b0 = -this.yOutside;
        a1 = this.pgA.height;
        b1 = this.pgA.height + this.yOutside;
      } else {
        a0 = this.pgA.height;
        b0 = this.pgA.height + this.yOutside;
        a1 = 0;
        b1 = this.d * this.yOutside;
      }
    } else {
      if (tk0 < 0.5) {
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        if (this.d == 1) {
          a0 = 0;
          b0 = -this.yOutside / 2;
          a1 = this.pgA.height;
          b1 = this.pgA.height + this.yOutside / 2;
        } else {
          a0 = this.pgA.height;
          b0 = this.pgA.height + this.yOutside / 2;
          a1 = 0;
          b1 = (this.d * this.yOutside) / 2;
        }
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        if (this.d == 1) {
          a0 = -this.yOutside / 2;
          b0 = -this.yOutside;
          a1 = this.pgA.height + this.yOutside / 2;
          b1 = this.pgA.height + this.yOutside;
        } else {
          a0 = this.pgA.height + this.yOutside / 2;
          b0 = this.pgA.height + this.yOutside;
          a1 = (this.d * this.yOutside) / 2;
          b1 = this.d * this.yOutside;
        }
      }
    }

    if (this.d == 1) {
      this.tl.y = map(tk1, 0, 1, a0, b0);
      this.tml.y = this.tl.y;
      this.bmr.y = map(tk1, 0, 1, a1, b1);
      this.br.y = this.bmr.y;
    } else {
      this.bl.y = map(tk1, 0, 1, a0, b0);
      this.bml.y = this.bl.y;
      this.tmr.y = map(tk1, 0, 1, a1, b1);
      this.tr.y = this.tmr.y;
    }
  }

  display() {
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);
    translate(-this.pgA.width / 2, -this.pgA.height / 2);

    texture(this.pgA);
    stroke(foreColor);
    // fill(bkgdColor);

    beginShape(TRIANGLE_STRIP);
    for (var n = 0; n <= this.res; n++) {
      let t = n / this.res;

      let xTop = bezierPoint(this.tl.x, this.tml.x, this.tmr.x, this.tr.x, t);
      let yTop = bezierPoint(this.tl.y, this.tml.y, this.tmr.y, this.tr.y, t);

      let xBot = bezierPoint(this.bl.x, this.bml.x, this.bmr.x, this.br.x, t);
      let yBot = bezierPoint(this.bl.y, this.bml.y, this.bmr.y, this.br.y, t);

      var u = map(xTop, 0, this.pgA.width, 0, 1);

      vertex(xTop, yTop, u, 0);
      vertex(xBot, yBot, u, 1);
    }
    endShape();
    pop();
  }

  findTextSize() {
    var measured = 0;
    while (measured < width) {
      textSize(this.pgTextSize);
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if (this.pgTextSize * thisFontAdjust > (height * 7) / 8) {
      this.pgTextSize = (height * 7) / 8 / thisFontAdjust;
    }
  }

  drawTextures() {
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));

    this.pgA = createGraphics(
      repeatSize,
      this.pgTextSize * (thisFontAdjust + 0.05)
    );
    this.pgA.background(bkgdColor);

    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust =
      this.pgA.height / 2 +
      (this.pgTextSize * thisFontAdjust) / 2 +
      this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width / 2, thisAdjust);
  }

  removeGraphics() {
    this.pgA.remove();
  }
}
