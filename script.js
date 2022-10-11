//gameboard module 
const GameBoard = (function gameBoardModule() {
    let _gameBoardArr;

    const _initSetup = () => {
       _gameBoardArr = Array(3)
       .fill()
       .map(() => Array(3).fill().map(() => 1));
    };
    const render = () => {
        const grid = document.querySelector('.grid');
        _initSetup();
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
    const isLegal = (pos) => {
        let desiredCell = document.getElementById(pos); 
        return !desiredCell.innerText ? true: false;
     };

    return {
        render,
        isLegal
    };
})();











GameBoard.render();
