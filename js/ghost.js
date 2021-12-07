'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        ghostImg: drawImg()
    }
    gGhosts.push(ghost)
    //Model
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}


function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}


function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        gameOver();
        toggleModal('block', 'lose')
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function drawImg() {
    var idx = getRandomInt(0, gGhostImgs.length)
    var img = gGhostImgs[idx]
    gGhostImgs.splice(idx, 1)
    return img
}



function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    var imgSrc = (gPacman.isSuper) ? 'ghost4.png' : ghost.ghostImg;
    return `<img src="img/${imgSrc}">`;
}



function deleteGhost(pos) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost.location.i === pos.i && ghost.location.j === pos.j) {
            var deletedGhost = gGhosts.splice(i, 1)[0]; // [{i, j}]
            // return deletedGhost

        }
    }
    return deletedGhost;
}

function restoreGhosts() {
    for (var i = 0; i < gDeletedGhosts.length; i++) {
        var ghost = gDeletedGhosts[i];
        gGhosts.push(ghost)
    }

}