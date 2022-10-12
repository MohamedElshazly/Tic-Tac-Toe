//gameboard module 
const GameBoard = (function gameBoardModule() {
    let _gameBoardArr;
    const grid = document.querySelector('.grid');

    const _initialRender = () => {
        //initial render of empty board
        _gameBoardArr.map((row, rowIndex) => {
            row.map((_, cellIndex) => {
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
        if (desiredCell) return !desiredCell.innerText ? true : false;
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
            return board.isLegal(pos) ? pos : null;
        }
    };
};

const GameLoop = (function GameLoopModule() {
    const initGame = () => {
        GameBoard.initSetup();
    };

    const startGame = () => {
        const p1 = playersFactory('X', GameBoard);
        const p2 = playersFactory('O', GameBoard);

        let current_player = p1;

        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', () => {
                let pos = square.id;
                pos = current_player.move(pos);
                if(pos) {
                    document.getElementById(pos).innerText = current_player.marker;
                    current_player = current_player === p1 ? p2 : p1;
                }

            })
        });

    }

    return {
        initGame,
        startGame
    }
})();

//driver code! 
GameLoop.initGame();

GameLoop.startGame();

