const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0

// my block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}

// all my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
]

// draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
  }
}
addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

// move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 10
        drawUser()
      }
      break
  }
}
document.addEventListener('keydown', moveUser)

// draw User
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

// draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkForCollisions()
}
timerId = setInterval(moveBall, 30)

// check for collisions
function checkForCollisions() {
  // Check for block collision
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    if (
      ballCurrentPosition[0] + ballDiameter > block.bottomLeft[0] &&
      ballCurrentPosition[0] < block.bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > block.bottomLeft[1] &&
      ballCurrentPosition[1] < block.topLeft[1]
    ) {
      // Remove block from grid
      blocks.splice(i, 1)
      score++
      scoreDisplay.innerHTML = score

      // Remove the block element from DOM
      document.querySelectorAll('.block')[i].remove()

      // Play block hit sound
      blockHit()

      // Change direction of the ball
      changeDirection()

      // Check if all blocks are destroyed
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = 'You Win!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }
      break
    }
  }

  // Check for wall hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0) {
    xDirection = -xDirection
  }

  if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
    yDirection = -yDirection
  }

  // Check for user collision
  if (
    ballCurrentPosition[0] + ballDiameter > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] + ballDiameter > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    yDirection = -yDirection
  }

  // Game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    gameOver()
    document.removeEventListener('keydown', moveUser)
  }
}

// Change direction of ball after collision
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
  }
}

// Function to play sound
function playSound(soundFile) {
  const audio = new Audio(soundFile)
  audio.volume = 0.5 // Adjust the volume if needed
  audio.play().catch((err) => {
    console.error('Audio play failed:', err)
  })
}

// Play block hit sound
function blockHit() {
  playSound('sounds/ballhit.mp3')
}

// Play game over sound
function gameOver() {
  playSound('sounds/gameover.mp3')
}
