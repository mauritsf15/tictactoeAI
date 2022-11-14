// Scoreboards

// Declaring Variables
const wins = document.querySelector('.wins');
const draws = document.querySelector('.draws');
const losses = document.querySelector('.losses');
const total = document.querySelector('.total');

const saveBtn = document.querySelector('.save')
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close');
const submit = document.querySelector('.submit')

const input = document.querySelector('input')
const errorMsg = document.querySelector('.error')
const errorLines = document.querySelectorAll('.errorline')

let playerName;
let gamesPlayed;

function updateBoard() {
    let lw = localStorage.getItem(`wins`);
    let ld = localStorage.getItem(`draws`);
    let ll = localStorage.getItem(`losses`);
    let lt = localStorage.getItem(`total`);
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

function resetBoard() {
    playerName = ''
    localStorage.setItem(`wins`, 0);
    localStorage.setItem(`draws`, 0);
    localStorage.setItem(`losses`, 0);
    localStorage.setItem(`total`, 0);
    updateBoard();
}

function addWin() {
    let lw = localStorage.getItem(`wins`);
    if (lw == null) {
        localStorage.setItem(`${playerName}wins`, 1);
        console.log('testi')
    } else {
        lw++;
        localStorage.setItem(`${playerName}wins`, lw);
    }
    addGame();
    updateBoard();
}

function addDraw() {
    let ld = localStorage.getItem(`${playerName}draws`);
    if (ld == null) {
        localStorage.setItem(`${playerName}draws`, 1);
    } else {
        ld++;
        localStorage.setItem(`${playerName}draws`, ld);
    }
    addGame();
    updateBoard();
}

function addLoss() {
    let ll = localStorage.getItem(`${playerName}losses`);
    if (ll == null) {
        localStorage.setItem(`${playerName}losses`, 1);
    } else {
        ll++;
        localStorage.setItem(`${playerName}losses`, ll);
    }
    addGame();
    updateBoard();
}

function addGame() {
    let lt = localStorage.getItem(`${playerName}total`);
    if (lt == null) {
        localStorage.setItem(`${playerName}total`, 1);
    } else {
        lt++;
        localStorage.setItem(`${playerName}total`, lt);
    }
    updateBoard();
}

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function submitName() {
    if (input.value.length > 2) {
        closeModal();
        let lw = localStorage.getItem(`wins`);
        let ld = localStorage.getItem(`draws`);
        let ll = localStorage.getItem(`losses`);
        let lt = localStorage.getItem(`total`);
        playerName = input.value;
        errorMsg.style.display = 'none'
        errorMsg.innerHTML = ''
    } else {
        errorMsg.style.display = 'block'
        errorMsg.innerHTML = 'Your name must be 2 characters or longer!'
    }
}

updateBoard();

closeModalBtn.addEventListener('click', closeModal)
saveBtn.addEventListener('click', openModal)
submit.addEventListener('click', submitName)