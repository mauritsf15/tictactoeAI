const articles = document.querySelectorAll('article')
const resetBtn = document.querySelector('.reset-btn')

let board = [       // visual board for computer
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

resetBtn.addEventListener('click', resetGame)

for (let i = 0; i < articles.length; i++) {         // passes data of clicked object
    articles[i].addEventListener('click', onClick)  // so it knows which place its been clicked
}

const dataBoard = [ // data board for special values
    [articles[0], articles[3], articles[6]],
    [articles[1], articles[4], articles[7]],
    [articles[2], articles[5], articles[8]]
]

function onClick(data) {
    let row = data.path[1].classList[0].charAt(4)
    let col = data.path[1].classList[1].charAt(4)
    if (board[row][col] == '') {
        data.target.attributes[0].nodeValue = "img/cross.png"
        board[row][col] = 'x'
        aiTurn()
    }
}

function resetGame() {
    for (let i = 0; i < articles.length; i++) {
        articles[i].children[0].attributes[0].nodeValue = "img/trans.png"   // reset bg image to nothing
        articles[i].style.backgroundColor = ''
        turn = true
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }
}

function aiTurn() {
    if (board[1][1] == '') {
        placeAI(1, 1)
        return;
    }
    
}

function placeAI(row, col) {
    document.querySelector(`.row-${row}.col-${col}`).children[0].attributes[0].nodeValue = "img/circle.png"
    board[row][col] = 'o'
}

function checkWin(player) {
    for (let i = 0; i <= 2; i++)
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
}