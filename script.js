const GRIDSIZE = 9;

// DOM Elements
const pageHeaderElement = document.querySelector('.page-header');
const boardGridElement = document.querySelector('.game-board');
const playerXInputElement = document.getElementById('player-x');
const playerOInputElement = document.getElementById('player-o');
const startButtonElement = document.getElementById('start-button');
const resetButtonElement = document.getElementById('reset-button');



const gameBoard = (() => {
    let grid = [];

    // Generate grid
    for (let i = 0; i < GRIDSIZE; i++) {
        grid.push('');
        const square = document.createElement('div');
        square.classList = 'square';
        square.id = `square${i}`;
        square.addEventListener('click', updateSquare);
        boardGridElement.appendChild(square);
    }

    function isSquareEmpty(squareNumber) {
        if (grid[squareNumber] == '') return true;
    }

    // Update the square in the grid array and html element
    function updateSquare(e) {
        const squareNumber = e.target.id.replace('square', '');
        if (!isSquareEmpty(squareNumber)) return;

        const currentPlayer = game.currentPlayersTurn();
        grid[squareNumber] = currentPlayer;
        document.getElementById(`square${squareNumber}`)
            .textContent = currentPlayer;

        if (game.isOver()) {
            game.displayResult('win');
        } else if (grid.includes('')) {
            game.toggleTurn();
        } else {
            game.displayResult('tie');
        }
    }

    // Set each grid and html element to an empty string
    function reset() {
        for (let i = 0; i < GRIDSIZE; i++) {
            grid[i] = '';
            document.getElementById(`square${i}`)
                .textContent = '';
        }
        pageHeaderElement.textContent = 'Tic Tac Toe'
    }

    function getGrid() {
        return grid;
    }

    return {
        reset,
        getGrid
    };

})();


// currentPlayer factory function
const player = (name, symbol) => {
    const playerName = name;
    const playerSymbol = symbol;

    function getSymbol() {
        return playerSymbol;
    }

    function getName() {
        return playerName;
    }

    return {
        getName,
        getSymbol
    };
}


// Module that controls the flow of the game
const game = (() => {
    resetButtonElement.addEventListener('click', gameBoard.reset);

    let turn = 'x';
    const playerX = player('a', 'x');
    const playerO = player('b', 'o');

    function currentPlayersTurn() {
        return turn;
    }

    function toggleTurn() {
        if (turn == 'x') {
            turn = 'o';
        } else {
            turn = 'x';
        }
    }

    // All possible grid combinations to win
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function isOver() {
        const grid = gameBoard.getGrid();
        const currentPlayer = currentPlayersTurn();
        let win = false;

        // Check each wincombination
        winCombos.forEach(winCombo => {
            let combo = 0;
            for (let i = 0; i < winCombo.length; i++) {
                if (grid[winCombo[i]] == currentPlayer) {
                    combo++;
                }
            }
            if (combo == 3) {
                win = true;
            }
        });
        return win;
    }


    function displayResult(result) {
        if (result == 'win') {
            console.log(`${game.currentPlayersTurn()} won!`)
            pageHeaderElement.textContent = `${game.currentPlayersTurn()} won!`;
        } else {
            console.log('It\'s a tie');
            pageHeaderElement.textContent = 'It\'s a tie';
        }

        setTimeout(gameBoard.reset, 2000);
    }


    return {
        currentPlayersTurn,
        toggleTurn,
        isOver,
        displayResult
    }

})();