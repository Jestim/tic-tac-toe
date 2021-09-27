const GRIDSIZE = 9;

const gameBoard = (() => {
    let grid = [];

    // Generate grid
    const boardGrid = document.querySelector('.game-board');
    for (let i = 0; i < GRIDSIZE; i++) {
        grid.push('');
        const square = document.createElement('div');
        square.classList = 'square';
        square.id = `square${i}`;
        square.addEventListener('click', squareIsEmpty);
        boardGrid.append(square);
    }

    // Check if the clicked square is empty
    function squareIsEmpty(e) {
        const squareNumber = e.target.id.replace('square', '');
        if (grid[squareNumber] == '') {
            updateSquare(squareNumber);
        }
    }

    // Update the square in the grid array and html element
    function updateSquare(squareNumber) {
        const player = game.currentPlayersTurn();
        grid[squareNumber] = player;
        document.getElementById(`square${squareNumber}`)
            .textContent = player;

        if (game.gameOver()) {
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
    }

    function getGrid() {
        return grid;
    }

    return {
        reset,
        getGrid
    };

})();

// Player factory function
const player = (symbol) => {
    const playerSymbol = symbol;

    function getSymbol() {
        return playerSymbol;
    }

    return { getSymbol };
}

// Module that controls the flow of the game
const game = (() => {
    let turn = 'x';
    const playerX = player('x');
    const playerO = player('o');

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

    function gameOver() {
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
        } else {
            console.log('It\'s a tie');
        }
    }


    return {
        currentPlayersTurn,
        toggleTurn,
        gameOver,
        displayResult
    }

})();