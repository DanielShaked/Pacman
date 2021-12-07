'use strict'
const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' ';
const SUPER = '<img src="img/superfood.png" >'
const CHERRY = '<img src="img/cherry.png" >'

//globals
var gGhostImgs;
var gFoodAmount;
var gNotFood;
var gBoard;

//intervals 
var gIntervalCherry;

//Audio
var audioCollected = new Audio('sounds/collect.wav')
var audioLose = new Audio('sounds/lose.wav')


var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gFoodAmount = 0;
    gNotFood = 0;
    gGhostImgs = ['ghost1.png', 'ghost2.png', 'ghost3.png']
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    updateScore(0, true)
    toggleModal('none');
    gGame.score = 0;
    gIntervalCherry = setInterval(setCherry, 15000)
    gDeletedGhosts = []

}



function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gFoodAmount++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                // gNotFood++
                gFoodAmount--
            }
        }
    }


    board[1][1] = SUPER;
    board[board.length - 2][1] = SUPER;
    board[1][board.length - 2] = SUPER;
    board[board.length - 2][board.length - 2] = SUPER

    //calculate for gFoodAmount:
    // gNotFood += 5;
    gFoodAmount -= 5;
    return board;
}



// function updateScore(diff, isReset) {
//     gGame.score += diff;
//     document.querySelector('h2 span').innerText = (isReset) ? 0 : gGame.score
// }

function updateScore(diff, isReset) {
    gGame.score += diff;
    if (isReset) gGame.score = diff
    document.querySelector('h2 span').innerText =  gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry);
}


function toggleModal(display, status) {
    var elModal = document.querySelector('.modal');
    if (status) {
        var elModalContent = elModal.querySelector('h2');

        elModal.style.backgroundColor = (status === 'win') ? 'green' : 'red';
        elModalContent.innerText = (status === 'win') ? 'wow! you Win!' : 'oh... you lose';
    }
    elModal.style.display = display;
}



function setCherry() {
    var targetPos = getRandomEmptyCell();
    if (!targetPos) return

    //update Model
    gBoard[targetPos.i][targetPos.j] = CHERRY;

    //update Dom
    renderCell(targetPos, CHERRY);
}



function getRandomEmptyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                // emptyCells.push({ i: i, j: j })
                emptyCells.push({ i, j })
            }
        }
    }
    var randIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randIdx]
}
