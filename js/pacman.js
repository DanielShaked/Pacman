'use strict'

//Globals
var PACMAN = '<img  class="pacman" src="img/gPacman.png" >';
var gDeletedGhosts = [];
var gPacman;


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {


    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    // if (nextCell === SUPER && gPacman.isSuper) return
    // console.log(gPacman.isSuper);
    if (nextCell === SUPER) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false;
            restoreGhosts()
            gDeletedGhosts = []
        }, 5000);
    }
    
    if (nextCell === FOOD) {
        updateScore(1);
        gFoodAmount--
        // audioCollected.play()
        console.log('gFoodAmount:', gFoodAmount);

        if (!gFoodAmount) {
            gameOver();
            toggleModal('block', 'win')
        }
    }

    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            toggleModal('block', 'lose')
            // audioLose.play()
            return;
        } else {
            var deletedGhost = deleteGhost(nextLocation)
            gDeletedGhosts.push(deletedGhost); // get objects in 1 array
            if (deletedGhost.currCellContent === FOOD) {
                updateScore(1);
                gFoodAmount--
                deletedGhost.currCellContent = EMPTY
            }
            

        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            PACMAN = '<img style="transform: rotate(270deg);" class="pacman" src="img/gPacman.png" >';
            // setImgHtmlRotate(270)
            nextLocation.i--;
            break;
        case 'ArrowDown':
            PACMAN = '<img style="transform: rotate(90deg);" class="pacman" src="img/gPacman.png" >';
            // setImgHtmlRotate(90)
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            PACMAN = '<img style="transform: scaleX(-1);" class="pacman" src="img/gPacman.png" >';
            // setImgHtmlRotate(180)
            break;
        case 'ArrowRight':
            PACMAN = '<img style="transform: rotate(0deg);" class="pacman" src="img/gPacman.png" >';
            // setImgHtmlRotate(0)
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}




// function setImgHtmlRotate(deg) {
//     var elPacman = document.querySelector('.pacman');
//     elPacman.style.transform = "rotate(${deg}deg)"
// }