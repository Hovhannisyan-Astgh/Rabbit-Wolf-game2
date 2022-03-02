
document.addEventListener('keydown', (e) => keyControls(e.keyCode))
const gameStatus = document.querySelector('.gameStatus');
const statusText = document.getElementById('statusText');
let matrixLenght;
const BOX_WIDTH = 64
const BAN_CELL = 3;
const FREE_CELL = 0;
const WOLF_CELL = 2;
const ROCK_CELL = 5;
const HOUSE_CELL = 4;
const RABBIT_CELL = 1;
let matrix = [];
let board = [];
let boardCount = 2;
let currentBoard = 0;


const gameSettings = {
    WOLFCOUNT: 3,
    BANCOUNT: 1,
}


const characters = {
    [RABBIT_CELL]: {
        name: "rabbit",
        src: 'images/rabbit.png',
        allowedMoves: [FREE_CELL, WOLF_CELL, HOUSE_CELL],
    },
    [WOLF_CELL]: {
        name: "wolf",
        src: 'images/gamewolf.png',
        allowedMoves: [FREE_CELL, RABBIT_CELL]
    },
    [BAN_CELL]: {
        src: 'images/ban.png',
        name: "rock",
    },
    [HOUSE_CELL]: {
        name: "house",
        src: 'images/home.png',
    }
}


function startGame() {

    createMatrix();
    setCharacterCounts();
    createUI();
    positionPlayers();

}

