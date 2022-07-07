const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#startPauseButton')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsright = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let currentIndex = 76
const width = 9
let timerId
let outComeTimerId 
let currentTime = 20

//creating and moving frog and managing its movement around borders
function moveFrog(e) {
squares[currentIndex].classList.remove('frog')

  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % width !==0 ) currentIndex -= 1
      break
        case 'ArrowRight':
       if (currentIndex % width < width - 1 ) currentIndex += 1
      break
        case 'ArrowUp':
       if (currentIndex - width >= 0 ) currentIndex -= width
      break
        case 'ArrowDown':
       if (currentIndex + width < width * width ) currentIndex += width
      break
 }

squares[currentIndex].classList.add('frog')
}





//moving log and car Elements
function autoMoveElements() {
  currentTime--
  timeLeftDisplay.textContent = currentTime
  logsLeft.forEach(logLeft => moveLogLeft(logLeft))
  logsright.forEach(logRight => moveLogRight(logRight))
  carsLeft.forEach(carLeft => moveCarLeft(carLeft))
  carsRight.forEach(carRight => moveCarRight(carRight))
  
}

function checkOutComes() {
  lose()
  win()
}


//moving log-blocks
function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains('l1') :
     logLeft.classList.remove('l1')
      logLeft.classList.add('l2')
      break
        case logLeft.classList.contains('l2') :
     logLeft.classList.remove('l2')
      logLeft.classList.add('l3')
      break
        case logLeft.classList.contains('l3') :
     logLeft.classList.remove('l3')
      logLeft.classList.add('l4')
      break
        case logLeft.classList.contains('l4') :
     logLeft.classList.remove('l4')
      logLeft.classList.add('l5')
      break
        case logLeft.classList.contains('l5') :
     logLeft.classList.remove('l5')
      logLeft.classList.add('l1')
      break
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains('l1') :
     logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break
        case logRight.classList.contains('l2') :
     logRight.classList.remove('l2')
      logRight.classList.add('l1')
      break
        case logRight.classList.contains('l3') :
     logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break
        case logRight.classList.contains('l4') :
     logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break
        case logRight.classList.contains('l5') :
     logRight.classList.remove('l5')
      logRight.classList.add('l4')
      break
  }
}


//moving car-blocks

function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains('c1') :
     carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
      break
        case carLeft.classList.contains('c2') :
     carLeft.classList.remove('c2')
      carLeft.classList.add('c3')
      break
        case carLeft.classList.contains('c3') :
     carLeft.classList.remove('c3')
      carLeft.classList.add('c1')
      break
  }
}

function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains('c1') :
     carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break
        case carRight.classList.contains('c2') :
     carRight.classList.remove('c2')
      carRight.classList.add('c1')
      break
        case carRight.classList.contains('c3') :
     carRight.classList.remove('c3')
      carRight.classList.add('c2')
      break
  }
}


//check for lose
// if the frog hits the block with the class c1 and if we go into water
//means blocks l4 and l5 will lose

function lose() {
  if ((squares[currentIndex].classList.contains('c1')) ||
     (squares[currentIndex].classList.contains('l4')) ||
    (squares[currentIndex].classList.contains('l5')) ||
     (currentTime <= 0))
  {
    resultDisplay.textContent = 'YOU LOSE!'
    clearInterval(timerId)
     clearInterval(outComeTimerId)
    squares[currentIndex].classList.remove('frog')
    document.removeEventListener('keyup' , moveFrog)
  }
}

//check for win
function win() {
  if (squares[currentIndex].classList.contains('ending-block')) {
    resultDisplay.textContent = "YOU WIN!"
    clearInterval(timerId)
     clearInterval(outComeTimerId)
    document.removeEventListener('keyup', moveFrog)
  }
}


startPauseButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId)
    clearInterval(outComeTimerId)
    outComeTimerId =null
    timerId = null
     document.removeEventListener('keyup' , moveFrog)
  } else {
    timerId = setInterval(autoMoveElements, 1000)
    outComeTimerId = setInterval(checkOutComes, 50)
    document.addEventListener('keyup' , moveFrog)
  }
})

