// Scoreboards

// Declaring Variables
const wins = document.querySelector('.wins');
const draws = document.querySelector('.draws');
const losses = document.querySelector('.losses');
const total = document.querySelector('.total');

let playerName;
let gamesPlayed;

function updateBoard() {
    playerName = localStorage.getItem('activePlayer');
    if (playerName == null) {
        playerName = '';
    }
    let lw = localStorage.getItem(`${playerName}wins`);
    let ld = localStorage.getItem(`${playerName}draws`);
    let ll = localStorage.getItem(`${playerName}losses`);
    let lt = localStorage.getItem(`${playerName}total`);
    if (lw == null) {
        lw = 0;
    }
    if (ld == null) {
        ld = 0;
    }
    if (ll == null) {
        ll = 0;
    }
    if (lt == null) {
        lt = 0;
    }
    wins.innerHTML = lw;
    draws.innerHTML = ld;
    losses.innerHTML = ll;
    total.innerHTML = lt;
}

function addWin() {
    let lw = localStorage.getItem(`${playerName}wins`);
    if (lw == null) {
        localStorage.setItem(`${playerName}wins`, 1);
        console.log('testi')
    } else {
        lw++;
        localStorage.setitem(`${playerName}wins`, lw)
    }
    updateBoard();
}

function addDraw() {
    let ld = localStorage.getItem(`${playerName}draws`);
    if (ld == null) {
        localStorage.setItem(`${playerName}draws`, 1);
    } else {
        ld++;
        localStorage.setitem(`${playerName}draws`, ld)
    }
    updateBoard();
}

function addLoss() {
    let ll = localStorage.getItem(`${playerName}losses`);
    if (ll == null) {
        localStorage.setItem(`${playerName}losses`, 1);
    } else {
        ll++;
        localStorage.setitem(`${playerName}losses`, ll)
    }
    updateBoard();
}

function addGame() {
    let lt = localStorage.getItem(`${playerName}total`);
    if (lt == null) {
        localStorage.setItem(`${playerName}total`, 1);
    } else {
        lt++;
        localStorage.setitem(`${playerName}total`, lt)
    }
    updateBoard();
}

updateBoard();