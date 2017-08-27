var unit = 20;
var tailArray = [];
var tail = 3;

function startGame() {

  snake = new elt("teal", "snake");
  food = new elt("red", "food");

  gameArea.start();
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = this.canvas.height = 400;
      this.context = this.canvas.getContext("2d")
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      document.addEventListener("keydown", keyPush);
      this.interval = setInterval(logic, 100);

    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//constructor function for each element
function elt(color, type) {

  this.width = this.height = unit;
  this.type = type;

  //
  if (this.type === "snake") {
    this.x = this.y = unit;
    this.speedX = this.speedY = 0;

    //position function
    this.newdir = function() {
      this.x += this.speedX;
      this.y += this.speedY;

      	//snake wrap
        if(this.x < 0) {
          this.x = gameArea.canvas.height;
        }
        if(this.x > gameArea.canvas.height) {
          this.x = 0;
        }
        if(this.y < 0) {
          this.y = gameArea.canvas.height;
        }
        if(this.y > gameArea.canvas.height) {
          this.y = 0;
        } // end wrap

      // make snake grow
      for (var i = 0; i < tailArray.length; i++) {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(tailArray[i].x, tailArray[i].y, unit, unit);
        // check if snake eat itself
      }
      tailArray.push({x:this.x, y:this.y});

      while (tailArray.length>tail) {
        tailArray.shift();
      }

      ctx = gameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //eat function
    this.eat = function() {
      var eating = false;
      if(this.x === food.x && this.y === food.y) {
        eating = true;

        //updating snake tail
        tail++;

        return eating;
      }
    }

  } else {
    //making a random food position
    this.x = randNum();
    this.y = randNum();

    this.newpos = function() {

      if (snake.eat()) {
        this.x = randNum();
        this.y = randNum();
      }       

      // update food 
      ctx = gameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

}

//random number function
var randNum = function() {
  var randomNum = Math.floor(Math.random() * ((gameArea.canvas.height - unit) / unit)) * unit;

  return randomNum;
}

// key press eventlistener
function keyPush(btn) {
  switch (btn.keyCode) {
    case 37:
      snake.speedX = -unit; snake.speedY = 0;
      break;

    case 38:
      snake.speedX = 0; snake.speedY = -unit;
      break;

    case 39:
      snake.speedX = unit; snake.speedY = 0;
      break;

    case 40:
      snake.speedX = 0; snake.speedY = unit;
      break;
    default:

  }
}

//
function logic() {

  gameArea.clear();

  snake.newdir();
  food.newpos();

}
