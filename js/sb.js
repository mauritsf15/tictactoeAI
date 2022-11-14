// Scoreboards

// Declaring Variables
const wins = document.querySelector('.wins');
const draws = document.querySelector('.draws');
const losses = document.querySelector('.losses');

let playerName;

const updateBoard = () => {
    playerName = localStorage.getItem('activePlayer');
    if (playerName == null) {
        playerName = '';
    }
    let lw = localStorage.getItem(`${playerName}wins`);
    let ld = localStorage.getItem(`${playerName}draws`);
    let ll = localStorage.getItem(`${playerName}losses`);
    if (lw == null) {
        lw = 0;
        ld = 0;
        ll = 0;
    }
    wins.innerHTML = lw;
    draws.innerHTML = ld;
    losses.innerHTML = ll;
}

const addWin = () => {
    let lw = localStorage.getItem(`${playerName}wins`);
    if (lw == null) {
        localStorage.setItem(`${playerName}wins`, 1);
    } else {
        lw++;
        localStorage.setitem(`${playerName}wins`, lw)
    }
    updateBoard();
}

const addDraw = () => {
    let ld = localStorage.getItem(`${playerName}draws`);
    if (ld == null) {
        localStorage.setItem(`${playerName}draws`, 1);
    } else {
        ld++;
        localStorage.setitem(`${playerName}draws`, ld)
    }
    updateBoard();
}

const addLoss = () => {
    let ll = localStorage.getItem(`${playerName}losses`);
    if (ll == null) {
        localStorage.setItem(`${playerName}losses`, 1);
    } else {
        ll++;
        localStorage.setitem(`${playerName}losses`, ll)
    }
    updateBoard();
}