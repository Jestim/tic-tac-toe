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
        boardGridElement.appendChild(square);
    }

    function updateGrid(squareNumber, player) {
        grid[squareNumber] = player;
    }

    function updateSquareElement(squareNumber, player) {
        document.getElementById(`square${squareNumber}`)
            .textContent = player;
    }

    function isSquareEmpty(squareNumber) {
        if (grid[squareNumber] == '') return true;
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
        updateGrid,
        updateSquareElement,
        isSquareEmpty,
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

    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('click', updateSquareElementAndGrid);
    });

    const playerX = player(playerXInputElement.value, 'x');
    const playerO = player(playerOInputElement.value, 'o');

    let turn = playerX;

    // Update the square in the grid array and html element
    function updateSquareElementAndGrid(e) {
        const squareNumber = e.target.id.replace('square', '');
        const currentPlayerSymbol = currentPlayersTurn().getSymbol();
        const grid = gameBoard.getGrid();

        if (!gameBoard.isSquareEmpty(squareNumber)) return;

        gameBoard.updateSquareElement(squareNumber, currentPlayerSymbol);

        gameBoard.updateGrid(squareNumber, currentPlayerSymbol);

        if (isOver()) {
            displayResult('win');
        } else if (grid.includes('')) {
            toggleTurn();
        } else {
            displayResult('tie');
        }
    }

    function currentPlayersTurn() {
        return turn;
    }

    function toggleTurn() {
        if (turn == playerX) {
            turn = playerO;
        } else {
            turn = playerX;
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
        const currentPlayer = currentPlayersTurn().getSymbol();
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
            pageHeaderElement.textContent = `${currentPlayersTurn().getName()} won!`;
        } else {
            pageHeaderElement.textContent = 'It\'s a tie';
        }

        setTimeout(gameBoard.reset, 2000);
    }


    return {
        updateSquareElementAndGrid,
        currentPlayersTurn,
        toggleTurn,
        isOver,
        displayResult
    }

})();