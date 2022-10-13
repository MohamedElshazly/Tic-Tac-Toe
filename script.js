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
    let containers = {
        rowContainer: [0, 0, 0],
        columnContainer: [0, 0, 0],
        diagContainer: [0, 0, 0],
        oppositeDiagContainer: [0, 0, 0]
    }
    return {
        marker,
        containers,
        move: (pos) => {
            return board.isLegal(pos) ? pos : null;
        }
    };
};

const GameLoop = (function GameLoopModule() {
    const _checkWin = (row, col, player) => {

        /* 
            credit for the algorithm goes to this guy! 
            https://jayeshkawli.ghost.io/tic-tac-toe/
        */

        //process for figuring out wins along rows and columns
        player.containers.rowContainer[row] += 1;
        player.containers.columnContainer[col] += 1;

        if (row == col) {
            player.containers.diagContainer[row] += 1;
        };

        if ((row + col + 1) == 3) {
            player.containers.oppositeDiagContainer[row] += 1;
        };

        let diagonalElementsSum = 0;
        let oppositeDiagonalElementsSum = 0;

        for (let i = 0; i < 3; i++) {
            diagonalElementsSum += player.containers.diagContainer[i];
            oppositeDiagonalElementsSum += player.containers.oppositeDiagContainer[i];
        };

        //checks for wins along columns or rows
        if (player.containers.rowContainer[row] == 3 || player.containers.columnContainer[col] == 3) {
            return player.marker;
        }
        //check for wins along diagonals 
        if (diagonalElementsSum == 3 || oppositeDiagonalElementsSum == 3) {
            return player.marker;
        }
    };

    const _checkDraw = () => {
        let full = 0;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            if (square.innerText) {
                full += 1;
            }
        });
        return full < 9 ? false : true;
    }

    const _resetGame = (players) => {

        document.querySelector('.winner').innerText = '';

        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.innerText = ''
        });

        players.p1.containers = {
            rowContainer: [0, 0, 0],
            columnContainer: [0, 0, 0],
            diagContainer: [0, 0, 0],
            oppositeDiagContainer: [0, 0, 0]
        };

        players.p2.containers = {
            rowContainer: [0, 0, 0],
            columnContainer: [0, 0, 0],
            diagContainer: [0, 0, 0],
            oppositeDiagContainer: [0, 0, 0]
        };
    };

    const initGame = () => {
        GameBoard.initSetup();
    };

    const startGame = () => {
        const p1 = playersFactory('X', GameBoard);
        const p2 = playersFactory('O', GameBoard);

        let current_player = p1;
        let pos;
        let row;
        let col;
        let winner;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', () => {
                //to prevent clicks after game has been won
                if (winner) {
                    return;
                }
                else {
                    pos = square.id;
                    pos = current_player.move(pos);
                    //put the marker down and switch players
                    if (pos) {
                        document.getElementById(pos).innerText = current_player.marker;

                        //get row and col clicked
                        row = Number(pos[0]);
                        col = Number(pos[1]);

                        winner = _checkWin(row, col, current_player);
                        if (winner) {
                            document.querySelector('.winner').innerText = `Winner is ${winner}`
                        }
                        if (_checkDraw()) {
                            document.querySelector('.winner').innerText = "It's a draw!"
                        }

                        current_player = current_player === p1 ? p2 : p1;
                    }

                }
            })

        });
        document.querySelector('.reset').addEventListener('click', () => {
            current_player = p1;
            let players = {
                p1,
                p2
            }
            winner = undefined;
            _resetGame(players);
        })

    };

    return {
        initGame,
        startGame,
    }
})();

//driver code! 
GameLoop.initGame();
GameLoop.startGame();




