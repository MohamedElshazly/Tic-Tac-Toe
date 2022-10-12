//gameboard module 
const GameBoard = (function gameBoardModule() {
    let _gameBoardArr;

    const _initialRender = () => {
        //initial render of empty board
        const grid = document.querySelector('.grid');
        _gameBoardArr.map((row, rowIndex) => {
            row.map((cell, cellIndex) => {
                const _id = `${rowIndex}${cellIndex}`; 
                const square = document.createElement('div');
                square.classList.add('square');
                square.id = _id;
                grid.appendChild(square);
            })
        })
    };
    const initSetup = () => {
        //sets up the board initially
        _gameBoardArr = Array(3)
        .fill()
        .map(() => Array(3).fill().map(() => 1));
        _initialRender();
     };
    const render = () => {
        //renders new changes to the board
    };
    const isLegal = (pos) => {
        let desiredCell = document.getElementById(pos);
        if(desiredCell) return !desiredCell.innerText ? true: false;
        return Error('Square doesn\'t exist');
     };

    return {
        initSetup,
        render,
        isLegal
    };
})();

//players factory 
const playersFactory = (marker, board) => {
    return {
        marker, 
        move: (pos) => {
            return pos ? board.isLegal(pos) : null; 
        }
    };
}; 

const GameLoop = (function GameLoopModule() {
    const initGame = () => {
        GameBoard.initSetup();
        const p1 = playersFactory('X', GameBoard);
        const p2 = playersFactory('O', GameBoard);
    };
    
    return {
        initGame
    }
})();


//driver code! 
GameLoop.initGame();

