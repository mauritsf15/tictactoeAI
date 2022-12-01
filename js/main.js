const articles = document.querySelectorAll('main div');

let board = [           // visual board for computer
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let hboard = [          // horizontal board for computer
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let gameActive = true;
let turn = true;

// For every possible three-in-a-row row
// there is a value that increases when an X has been placed there
//            H1 H2 H3   V1 V2 V3   D1 D2
let xboard = [[0, 0, 0], [0, 0, 0], [0, 0]];

let turns = 0;  // counts how many turns there have been

for (let i = 0; i < articles.length; i++) {             // passes data of clicked object
    articles[i].addEventListener('click', onClick);     // so it knows which place its been clicked
}

const dataBoard = [     // data board for special values
    [articles[0], articles[3], articles[6]],
    [articles[1], articles[4], articles[7]],
    [articles[2], articles[5], articles[8]]
];

// On click of article
function onClick(data) {
    if (turn == true) {
        let row = data.target.parentElement.className.charAt(4);    // finds the path to the row in class name
        let col = data.target.parentElement.className.charAt(10);
        if (board[row][col] == '') {
            data.target.attributes[0].nodeValue = "img/cross.png";
            board[row][col] = 'x';
            hboard[col][row] = 'x';
            // For the AI to recognize where there are 2 x's in a row or column (or diagonal)
            xboard[0][row]++;   // Horizontal
            xboard[1][col]++;   // Vertical
            if (`${row}${col}` == '11') {
                xboard[2][0]++;
                xboard[2][1]++;
            } else if (`${row}${col}` == '20' || `${row}${col}` == '02') {
                xboard[2][1]++;
            } else if (`${row}${col}` == '00' || `${row}${col}` == '22') {
                xboard[2][0]++;
            }
            checkWin('x');
            turns++;
            turn = false;
            setTimeout(aiTurn, 100);   // Give turn to the AI!
        }
    }
}

// Resets the board and variables
function resetGame() {
    for (let i = 0; i < articles.length; i++) {
        articles[i].children[0].attributes[0].nodeValue = "img/trans.png";   // reset bg image to nothing
        articles[i].style.backgroundColor = '';
    }
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    hboard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    xboard = [[0, 0, 0], [0, 0, 0], [0, 0]];
    turns = 0;
    turn = true;
    gameActive = true;
    closeRestartModal();
}

// THE MAGIC! My first artificial intelligence ;)
function aiTurn() {
    let placed = false;     // Check if the AI has already placed in this turn
    // Puts the 'o' in the middle if the player hasn't placed it in the middle yet
    if (board[1][1] == '') {
        if (placed == false) {
            placeAI(1,1);
            placed = true;
            turns++;
            turn = true;
            return;
        }
    }
    // Checks for double x's in every three-in-a-row row
    if (board[0][1] == 'x' && board[1][0] == 'x') {
        if (board[0][0] == '') {
            if (placed == false) {
                placeAI(0, 0);
                turns++;
                turn = true;
                return;
            }
        }
    } else if (board[2][1] == 'x' && board[1][2] == 'x') {
        if (board[2][2] == '') {
            if (placed == false) {
                placeAI(2, 2);
                turns++;
                turn = true;
                return;
            }
        }
    } else if (board[0][1] == 'x' && board[1][2] == 'x') {
        if (board[0][2] == '') {
            if (placed == false) {
                placeAI(0, 2);
                turns++;
                turn = true;
                return;
            }
        }
    } else if (board[1][0] == 'x' && board[2][1] == 'x') {
        if (board[2][0] == '') {
            if (placed == false) {
                placeAI(2, 0);
                turns++;
                turn = true;
                return;
            }
        }
    }
    for (let i = 0; i < xboard.length; i++) {
        for (let j = 0; j < xboard[i].length; j++) {
            if (xboard[i][j] == 2) {    // If it finds two x's,
                if (i == 0) {           // and (in this case) the row is horizontal (for the computer at least)
                    if (board[j].includes('o') == false) {      // Does the row contain an 'o' yet?
                        for (k = 0; k < board[j].length; k++) { // If not, it finds the empty place!
                            if (board[j][k] == '') {            // and puts an 'o' there.
                                if (placed == false) {
                                    placeAI(j, k);
                                    placed = true;
                                    turns++;
                                    turn = true;
                                    break;
                                }
                            }
                        }
                    }
                } else if (i == 1) {                            // The same is done for the visual rows.
                    if (hboard[j].includes('o') == false) {
                        for (k = 0; k < board[j].length; k++) {
                            if (hboard[j][k] == '') {
                                if (placed == false) {
                                    placeAI(k, j);
                                    placed = true;
                                    turns++;
                                    turn = true;
                                    break;
                                }
                            }
                        }
                    }
                } else if (i == 2) {                // Now to the diagonal rows.
                    if (j == 0) {                   // Since there are only two possible diagonals, it's just as easy
                        if (board[2][2] == '') {    // to write the exact coordinates instead of using loops.
                            if (placed == false) {
                                placeAI(2, 2);
                                placed = true;
                                turns++;
                                turn = true;
                                break;
                            }
                        } else if (board[0][0] == '') {
                            if (placed == false) {
                                placeAI(0, 0);
                                placed = true;
                                turns++;
                                turn = true;
                                break;
                            }
                        }
                    } else {
                        if (board[0][2] == '') {
                            if (placed == false) {
                                placeAI(0, 2);
                                placed = true;
                                turns++;
                                turn = true;
                                break;
                            }
                        } else if (board[2][0] == '') {
                            if (placed == false) {
                                placeAI(2, 0);
                                placed = true;
                                turns++;
                                turn = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    if (placed == false) {  // Is there nothing placed yet? This happens when there are no rows with 2 x's.
        let g = Math.floor(Math.random() * 3)   // Chooses a random number between 1-3
        let h = Math.floor(Math.random() * 3)   // And, of course, here too.
        if (board[g][h] == '') {        // If it's empty, place it!
            if (placed == false) {
                placeAI(g, h)
                placed = true
                turns++;
                turn = true;
                return;
            }
        } else if (turns > 7) {         // Is it not empty? Check if the game is still running :p
            placed = true
        } else if (gameActive == false) {
            placed = true
        } else {                        // Not empty and game is still on? While loop!
            while (placed == false) {
                g = Math.floor(Math.random() * 3)
                h = Math.floor(Math.random() * 3)
                if (board[g][h] == '') {
                    if (placed == false) {
                        placeAI(g, h)
                        placed = true
                        turns++;
                        turn = true;
                        return;
                    }
                }
            }
        }
    }
}

// Short function to get the AI to place an O somewhere
function placeAI(row, col) {
    document.querySelector(`.row-${row}.col-${col}`).children[0].attributes[0].nodeValue = "img/circle.png"
    board[row][col] = 'o';
    hboard[col][row] = 'o';
    checkWin('o');
}

// Did someone win yet? Every turn, this is checked for respectably 'x' and 'o',
// whichever gets mentioned when calling the function.
function checkWin(player) {
    for (let i = 0; i <= 2; i++) {
        if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {          // vertical check
            dataBoard[i][0].style.backgroundColor = '#42f563';
            dataBoard[i][1].style.backgroundColor = '#42f563';
            dataBoard[i][2].style.backgroundColor = '#42f563';
            if (player == 'x') {
                addWin();
            } else if (player == 'o') {
                addLoss();
            }
            stopGame();
        } else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {   // horizontal check
            dataBoard[0][i].style.backgroundColor = '#42f563';
            dataBoard[1][i].style.backgroundColor = '#42f563';
            dataBoard[2][i].style.backgroundColor = '#42f563';
            if (player == 'x') {
                addWin();
            } else if (player == 'o') {
                addLoss();
            }
            stopGame();
        }
    }
    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {              // cross check
        dataBoard[0][0].style.backgroundColor = '#42f563';
        dataBoard[1][1].style.backgroundColor = '#42f563';
        dataBoard[2][2].style.backgroundColor = '#42f563';
        if (player == 'x') {
            addWin();
        } else if (player == 'o') {
            addLoss();
        }
        stopGame();
    } else if (board [0][2] == player && board[1][1] == player && board[2][0] == player) {      // cross check
        dataBoard[0][2].style.backgroundColor = '#42f563';
        dataBoard[1][1].style.backgroundColor = '#42f563';
        dataBoard[2][0].style.backgroundColor = '#42f563';
        if (player == 'x') {
            addWin();
        } else if (player == 'o') {
            addLoss();
        }
        stopGame();
    }
    if (turns > 7) {
        if (gameActive)
        addDraw();
    }
}

// STOP THE GAME!!!
function stopGame() {       // changes visual board to everything filled
    board = [               // so nothing can be added
        ['n', 'n', 'n'],
        ['n', 'n', 'n'],
        ['n', 'n', 'n']
    ];
    gameActive = false;
}