/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

// my added variables
const DodgerDirectionEnum = {                                 // didrection dodger is moving
                LEFT:     "left",
                RIGHT:    "right",
                STOPPED:  "stopped"
}

var dodger = {
  width:        DODGER.clientWidth,
  leftMaxPos:   0,                                // max left position of left edge of dodger
  rightMaxPos:  GAME_WIDTH,
  moveStepSize: 4,                                // number of pixels for each dodger movement
  frameID:      0,                                // 0 is never a valid animation frame ID
  direction:    DodgerDirectionEnum,
  get leftEdgePos() { return parseInt(DODGER.style.left, 10)},   // parseInt() strips "px" off css syle.left value
  get rightEdgePos() { return this.leftEdgePos + this.width}

  /*
   *moveLeft:     function () {

  },
  moveRight:    function moveRight() {
                //place holder
  },
  stopMoving:   function () {
                    window.cancelAnimationFrame(this.frameID);
  }
  */
}

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */

   if (e.which === LEFT_ARROW) {
     // console.log(dodger);
     moveDodgerLeft();
   } else if (e.which === RIGHT_ARROW) {
     moveDodgerRight();
   } else {
     // stopMoving();
   }
}

function stopMoving() { // placeholder - to be put into dodger Objectives
  console.log("stopMoving called");
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   // log(this.moveLeft());

   // dodger.moveLeft()

   function step() {
     DODGER.style.left = `${dodger.leftEdgePos - dodger.moveStepSize}px`; // !!!MAKE THIS A dodger obj method/settable property

     if (dodger.leftEdgePos > dodger.leftMaxPos) {
         //&& !(dodger.direction === DodgerDirectionEnum.LEFT)    // don't add frame if already going left
       // dodger.direction = DodgerDirectionEnum.LEFT;
       dodger.frameID = window.requestAnimationFrame(step);
     } else {
       // place holder
     }
 }

 dodger.frameID = window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  //console.log('moveRight called');
  // dodger.moveRight();
  // dodger.moveLeft()
  function step() {
    DODGER.style.left = `${dodger.leftEdgePos + dodger.moveStepSize}px`; // !!!MAKE THIS A dodger obj method/settable property

    if (dodger.rightEdgePos < dodger.rightMaxPos) {
        //&& !(dodger.direction === DodgerDirectionEnum.LEFT)    // don't add frame if already going left
      // dodger.direction = DodgerDirectionEnum.LEFT;
      dodger.frameID = window.requestAnimationFrame(step);
    } else {
      // place holder
    }
  }
  dodger.frameID = window.requestAnimationFrame(step);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  dodger.direction = DodgerDirectionEnum.STOPPED;  // dodger starts out stopped
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
