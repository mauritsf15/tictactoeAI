// Scoreboards

// Declaring Variables
const wins = document.querySelector('.wins');
const draws = document.querySelector('.draws');
const losses = document.querySelector('.losses');
const total = document.querySelector('.total');

const saveBtn = document.querySelector('.save')
const submitModal = document.querySelector('.submit-modal');
const closeSubmitModalBtn = document.querySelector('.submit-close');
const submit = document.querySelector('.submit')

const input = document.querySelector('input')
const errorMsg = document.querySelector('.error')
const errorLines = document.querySelectorAll('.errorline')

const restartModal = document.querySelector('.restart-modal');
const closeRestartModalBtn = document.querySelector('.restart-close');
const restartBtn = document.querySelector('.restart')
const restartText = document.querySelector('.end-game-message')

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
        localStorage.setItem(`wins`, 1);
    } else {
        lw++;
        localStorage.setItem(`wins`, lw);
    }
    addGame();
    updateBoard('Congratiulations, you won!');
}

function addDraw() {
    let ld = localStorage.getItem(`draws`);
    if (ld == null) {
        localStorage.setItem(`draws`, 1);
    } else {
        ld++;
        localStorage.setItem(`draws`, ld);
    }
    addGame();
    updateBoard();
    openRestartModal("It's a tie!");
}

function addLoss() {
    let ll = localStorage.getItem(`losses`);
    if (ll == null) {
        localStorage.setItem(`losses`, 1);
    } else {
        ll++;
        localStorage.setItem(`losses`, ll);
    }
    addGame();
    updateBoard();
    openRestartModal('You lost...');
}

function addGame() {
    let lt = localStorage.getItem(`total`);
    if (lt == null) {
        localStorage.setItem(`total`, 1);
    } else {
        lt++;
        localStorage.setItem(`total`, lt);
    }
    updateBoard();
}

function openModal() {
    submitModal.style.display = 'block';
}

function closeModal() {
    submitModal.style.display = 'none';
}

function openRestartModal(text) {
    restartText.innerHTML = text
    restartModal.style.display = 'block';
}

function closeRestartModal() {
    restartModal.style.display = 'none';
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

closeSubmitModalBtn.addEventListener('click', closeModal)
saveBtn.addEventListener('click', openModal)
submit.addEventListener('click', submitName)

closeRestartModalBtn.addEventListener('click', closeRestartModal)
restartBtn.addEventListener('click', resetGame)