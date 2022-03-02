

function createMatrix() {
    for (let i = 0; i < 2; i++) {
        matrixLenght = parseInt(document.getElementById("select").value);
        matrix = new Array(matrixLenght)
            .fill(FREE_CELL)
            .map(() => new Array(matrixLenght).fill(FREE_CELL));
    }
};


function keyControls(code) { moveCharacter(code) }

const moveCharacter = (code) => {
    moveRabbit(code);
    moveWolf();
}

const moveRabbit = (code) => {
    let allPossibleDirections = getAllPossibleDirections(RABBIT_CELL);
    const characterCordinate = getCharacterCordinate(RABBIT_CELL);

    let possibleMoves = getPossibleMoveDirection(allPossibleDirections[0], RABBIT_CELL);

    Object.keys(possibleMoves).forEach(function (key) {
        if (key == code) {
            getGameResultStatus(possibleMoves[key]);
            moveCurrentCharacter(characterCordinate[0], possibleMoves[key], RABBIT_CELL);
        }
    });
}

const moveWolf = () => {
    const allPossibleDirections = getAllPossibleDirections(WOLF_CELL);
    const characterCordinate = getCharacterCordinate(WOLF_CELL);
    for (let i = 0; i < gameSettings.WOLFCOUNT; i++) {
        attackRabbit(characterCordinate[i], allPossibleDirections[i], WOLF_CELL);
    }
}

const attackRabbit = (characterIndex, allPossibleDirections) => {
    const wolfNextPossibleCells = getPossibleMoveDirection(allPossibleDirections, WOLF_CELL);
    const nearCellToRabbit = getRabbitNearPath(wolfNextPossibleCells, characterIndex, WOLF_CELL);
    moveCurrentCharacter(characterIndex, nearCellToRabbit, WOLF_CELL);
}

const getRabbitNearPath = (wolfNextPossibleCells) => {
    const getRabbitIndex = getCharacterCordinate(RABBIT_CELL);
    const [rabbitX, rabbitY] = getRabbitIndex[0];
    let nearPath = [];

    const allPossibleCoordinates = Object.keys(wolfNextPossibleCells).map((keyCode) => {
        return wolfNextPossibleCells[keyCode];
    })
    allPossibleCoordinates.reduce((minimumCellPathResult, coordinate) => {
        const [checkXcell, checkYcell] = coordinate;
        const side1 = Math.abs(rabbitX - checkXcell);
        const side2 = Math.abs(rabbitY - checkYcell);
        const resultOfTeorem = Math.floor(Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2)));
        if (minimumCellPathResult === null || resultOfTeorem < minimumCellPathResult) {
            minimumCellPathResult = resultOfTeorem;
            nearPath = coordinate;
        }
        return minimumCellPathResult;

    }, minimumCellPathResult = null)
    return nearPath;
}


function chooseButton() {
    document.getElementById(`board${currentBoard}`).classList.remove('selected')

    if ((boardCount - 1) == currentBoard) {
        currentBoard = 0
    } else {
        currentBoard++
    }


    document.getElementById(`board${currentBoard}`).classList.add('selected')

}
const moveCurrentCharacter = (currentIndex, move, character) => {
    const [currentX, currentY] = currentIndex;
    const [nextMoveX, nextMoveY] = move;
    matrix[currentBoard][currentX][currentY] = FREE_CELL;
    getGameResultStatus(move);
    matrix[currentBoard][nextMoveX][nextMoveY] = character;
    const rabbit = document.getElementById(`board${currentBoard}${currentX}${currentY}`).firstChild;
    document.getElementById(`board${currentBoard}${nextMoveX}${nextMoveY}`).appendChild(rabbit);
    document.getElementById(`board${currentBoard}${currentX}${currentY}`).removeChild;

}


function getWolfPossibleMoves(cordinate) {
    const possibleCoord = cordinate.map(cell => {
        cell < 0 && (cell = 0)
        cell > matrix[currentBoard].length - 1 && (cell = matrix[currentBoard].length - 1)
        return cell;
    })
    return possibleCoord;
}


function getRabbitPossibleMoves(cordinate) {
    const possibleCoord = cordinate.map(cell => {
        cell < 0 && (cell = matrix[currentBoard].length - 1)
        cell > matrix[currentBoard].length - 1 && (cell = 0)
        return cell;
    })
    return possibleCoord;
}

const getPossibleMoveDirection = (allPossibleDirections, character) => {
    const allowedMoves = characters[character].allowedMoves;
    return Object.keys(allPossibleDirections).reduce((characterPossibleMoves, key) => {

        const rabbitMoves = getRabbitPossibleMoves(allPossibleDirections[key]);
        const wolfMoves = getWolfPossibleMoves(allPossibleDirections[key]);
        const checkedCoord = (character === RABBIT_CELL) ? rabbitMoves : wolfMoves;

        const [newX, newY] = checkedCoord;
        if (allowedMoves.includes(matrix[currentBoard][newX][newY])) {
            characterPossibleMoves[key] = [newX, newY];
        }
        return characterPossibleMoves
    }, {})

}

const getCharacterCordinate = (character) => {
    return matrix[currentBoard].reduce((acc, array, rowIndex) => {
        array.forEach((element, columnIndex) => {
            if (element === character) {
                acc.push([x, y] = [rowIndex, columnIndex]);
            }
        });
        return acc
    }, [])

}

const getAllPossibleDirections = (character) => {
    const getCharacterAllMovesArray = getCharacterCordinate(character).map((cordinates) => {
        const [x, y] = cordinates;
        return ({
            37: [newX, newY] = [x, y - 1],
            38: [newX, newY] = [x - 1, y],
            39: [newX, newY] = [x, y + 1],
            40: [newX, newY] = [x + 1, y],
        })
    });
    return getCharacterAllMovesArray;
}

function setCharacterCounts() {
    gameSettings.WOLFCOUNT = (matrix[currentBoard].length * 60) / 100;
    gameSettings.BANCOUNT = (matrix[currentBoard].length * 40) / 100;
}

function createMatrix() {
    matrixLenght = parseInt(document.getElementById("select").value);
    for (let i = 0; i < boardCount; i++) {
        matrix.push(new Array(matrixLenght)
            .fill(FREE_CELL)
            .map(() => new Array(matrixLenght).fill(FREE_CELL)));
    }
};

function createUI() {
    gameStatus.style.display = "none"
    for (let index = 0; index < boardCount; index++) {
        const createBoard = document.createElement('div');
        createBoard.className = `board`;
        createBoard.id = `board${index}`
        const main = document.getElementsByClassName('gameContainer')
        main[0].appendChild(createBoard);
        board.push(document.getElementById(`board${index}`))
    }
    document.getElementById(`board${currentBoard}`).classList.add('selected')
    for (let i = 0; i < boardCount; i++) {
        board[i].innerHTML = "";
        board[i].style.width = `${matrixLenght * BOX_WIDTH}`
        matrix[i].forEach((x, indexX) => {
            x.forEach((y, indexY) => {
                const cell = document.createElement("div");
                board[i].appendChild(cell);
                cell.id = `${'board' + i}${indexX}${indexY}`;
            });
        })
    }

};




function getRandomCoord(count) {
    return Math.floor(Math.random() * count);
}

function getRandomFreeCoords(board) {

    const x = getRandomCoord(matrix[currentBoard].length);
    const y = getRandomCoord(matrix[currentBoard].length);
    if (board[x][y] === FREE_CELL) {
        return [x, y];
    }
    return getRandomFreeCoords(board);
}

function positionPlayers() {
    positionCharacter(HOUSE_CELL, 1);
    positionCharacter(RABBIT_CELL, 1);
    positionCharacter(WOLF_CELL, gameSettings.WOLFCOUNT);
    positionCharacter(BAN_CELL, gameSettings.BANCOUNT);
}

function positionCharacter(character, count) {
    for (let i = 0; i < count; i++) {
        positionSingleCharacter(character);
    }
}


function positionSingleCharacter(character) {
    for (let i = 0; i < boardCount; i++) {
        const [x, y] = getRandomFreeCoords(matrix[i]);
        matrix[i][x][y] = character;
        let image = document.createElement('img');
        image.src = characters[character].src;
        document.getElementById(`board${i}${x}${y}`).appendChild(image);

    }


}


function getGameResultStatus(checkMoveCell) {
    const [x, y] = checkMoveCell;
    const Rabbit = matrix[currentBoard][x][y];

    if (Rabbit === WOLF_CELL || Rabbit) {
        const gameStatus = "Game Over";
        setStatusGame(gameStatus);
    }
    if (Rabbit == HOUSE_CELL) {
        const gameStatus = "Congratulations! You Won!";
        setStatusGame(gameStatus);
    }
}

function setStatusGame(status) {
    matrix = [];
    board.innerHTML = "";
    statusText.innerHTML = status;
    gameStatus.style.display = "block";
}

