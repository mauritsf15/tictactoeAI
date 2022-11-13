const articles = document.querySelectorAll('article');
const resetBtn = document.querySelector('.reset-btn');

let board = [       // visual board for computer
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let hboard = [       // horizontal board for computer
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let gameActive = true;

//            H1 H2 H3   V1 V2 V3   D1 D2
let xboard = [[0, 0, 0], [0, 0, 0], [0, 0]];

let turns = 0;

resetBtn.addEventListener('click', resetGame);

for (let i = 0; i < articles.length; i++) {         // passes data of clicked object
    articles[i].addEventListener('click', onClick);  // so it knows which place its been clicked
}

const dataBoard = [ // data board for special values
    [articles[0], articles[3], articles[6]],
    [articles[1], articles[4], articles[7]],
    [articles[2], articles[5], articles[8]]
];

function onClick(data) {
    let row = data.target.parentElement.className.charAt(4);
    let col = data.target.parentElement.className.charAt(10);
    if (board[row][col] == '') {
        data.target.attributes[0].nodeValue = "img/cross.png";
        board[row][col] = 'x';
        hboard[col][row] = 'x';
        xboard[0][row]++;
        xboard[1][col]++;
        if (`${row}${col}` == '11') {
            xboard[2][0]++;
            xboard[2][1]++;
        } else if (`${row}${col}` == '20' || `${row}${col}` == '02') {
            xboard[2][1]++;
        } else if (`${row}${col}` == '00' || `${row}${col}` == '22') {
            xboard[2][0]++;
        }
        checkWin('x');
        aiTurn();
    }
    turns++;
}

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
    gameActive = true;
}

function aiTurn() {
    let placed = false;
    if (turns == 8) {
        placed = true;
        turns++;
        return;
    }
    if (board[1][1] == '') {
        if (placed == false) {
            placeAI(1,1);
            placed = true;
            turns++;
            return;
        }
    }
    for (let i = 0; i < xboard.length; i++) {
        for (let j = 0; j < xboard[i].length; j++) {
            if (xboard[i][j] == 2) {
                if (i == 0) {
                    if (board[j].includes('o') == false) {
                        for (k = 0; k < board[j].length; k++) {
                            if (board[j][k] == '') {
                                if (placed == false) {
                                    placeAI(j, k);
                                    placed = true;
                                    turns++;
                                    break;
                                }
                            }
                        }
                    }
                } else if (i == 1) {
                    if (hboard[j].includes('o') == false) {
                        for (k = 0; k < board[j].length; k++) {
                            if (hboard[j][k] == '') {
                                if (placed == false) {
                                    placeAI(k, j);
                                    placed = true;
                                    turns++;
                                    break;
                                }
                            }
                        }
                    }
                } else if (i == 2) {
                    if (j == 0) {
                        if (board[2][2] == '') {
                            if (placed == false) {
                                placeAI(2, 2);
                                placed = true;
                                turns++;
                                break;
                            }
                        } else if (board[0][0] == '') {
                            if (placed == false) {
                                placeAI(0, 0);
                                placed = true;
                                turns++;
                                break;
                            }
                        }
                    } else {
                        if (board[0][2] == '') {
                            if (placed == false) {
                                placeAI(0, 2);
                                placed = true;
                                turns++;
                                break;
                            }
                        } else if (board[2][0] == '') {
                            if (placed == false) {
                                placeAI(2, 0);
                                placed = true;
                                turns++;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    if (placed == false) {
        let g = Math.floor(Math.random() * 3)
        let h = Math.floor(Math.random() * 3)
        if (board[g][h] == '') {
            if (placed == false) {
                placeAI(g, h)
                placed = true
                turns++;
                return;
            }
        } else if (turns > 7) {
            placed = true
        } else if (gameActive == false) {
            placed = true
        } else {
            while (placed == false) {
                console.log('hi')
                g = Math.floor(Math.random() * 3)
                h = Math.floor(Math.random() * 3)
                if (board[g][h] == '') {
                    if (placed == false) {
                        placeAI(g, h)
                        placed = true
                        turns++;
                        return;
                    }
                }
            }
        }
    }
}

function placeAI(row, col) {
    document.querySelector(`.row-${row}.col-${col}`).children[0].attributes[0].nodeValue = "img/circle.png"
    board[row][col] = 'o';
    hboard[col][row] = 'o';
    checkWin('o')
}

function checkWin(player) {
    if (turns == 8) {
        stopGame();
        return;
    }
    for (let i = 0; i <= 2; i++) {
        if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {          // vertical check
            dataBoard[i][0].style.backgroundColor = '#42f563'
            dataBoard[i][1].style.backgroundColor = '#42f563'
            dataBoard[i][2].style.backgroundColor = '#42f563'
            stopGame()
        } else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {   // horizontal check
            dataBoard[0][i].style.backgroundColor = '#42f563'
            dataBoard[1][i].style.backgroundColor = '#42f563'
            dataBoard[2][i].style.backgroundColor = '#42f563'
            stopGame()
        }
    }
    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {              // cross check
        dataBoard[0][0].style.backgroundColor = '#42f563'
        dataBoard[1][1].style.backgroundColor = '#42f563'
        dataBoard[2][2].style.backgroundColor = '#42f563'
        stopGame()
    } else if (board [0][2] == player && board[1][1] == player && board[2][0] == player) {      // cross check
        dataBoard[0][2].style.backgroundColor = '#42f563'
        dataBoard[1][1].style.backgroundColor = '#42f563'
        dataBoard[2][0].style.backgroundColor = '#42f563'
        stopGame()
    }
}

function stopGame() {       // changes visual board to everything filled
    board = [               // so nothing can be added
        ['n', 'n', 'n'],
        ['n', 'n', 'n'],
        ['n', 'n', 'n']
    ]
    gameActive = false;
}