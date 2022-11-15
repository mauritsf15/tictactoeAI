// Scoreboards

// Declaring Variables
const wins = document.querySelector('.wins');
const draws = document.querySelector('.draws');
const losses = document.querySelector('.losses');
const total = document.querySelector('.total');
const savedWins = document.querySelector('.saved-wins');
const savedDraws = document.querySelector('.saved-draws');
const savedLosses = document.querySelector('.saved-losses');
const savedTotal = document.querySelector('.saved-total');
const playerNameText = document.querySelector('.player-name');

const saveBtn = document.querySelector('.save');
const submitModal = document.querySelector('.submit-modal');
const closeSubmitModalBtn = document.querySelector('.submit-close');
const submit = document.querySelector('.submit');

const input = document.querySelector('input');
const errorMsg = document.querySelector('.error');
const errorLines = document.querySelectorAll('.errorline');

const restartModal = document.querySelector('.restart-modal');
const closeRestartModalBtn = document.querySelector('.restart-close');
const restartBtn = document.querySelector('.restart');
const restartText = document.querySelector('.end-game-message');

const twn1pn = document.querySelector('.top-wins-number-one-playername');
const twn2pn = document.querySelector('.top-wins-number-two-playername');
const twn3pn = document.querySelector('.top-wins-number-three-playername');
const twn1a = document.querySelector('.top-wins-number-one-amount');
const twn2a = document.querySelector('.top-wins-number-two-amount');
const twn3a = document.querySelector('.top-wins-number-three-amount');

const wln1pn = document.querySelector('.top-wl-number-one-playername');
const wln2pn = document.querySelector('.top-wl-number-two-playername');
const wln3pn = document.querySelector('.top-wl-number-three-playername');
const wln1a = document.querySelector('.top-wl-number-one-amount');
const wln2a = document.querySelector('.top-wl-number-two-amount');
const wln3a = document.querySelector('.top-wl-number-three-amount');

let playerName;
let gamesPlayed;

function updateBoard() {
    let lw = localStorage.getItem(`wins`);
    let ld = localStorage.getItem(`draws`);
    let ll = localStorage.getItem(`losses`);
    let lt = localStorage.getItem(`total`);
    let gw = localStorage.getItem(`${playerName}wins`);
    let gd = localStorage.getItem(`${playerName}draws`);
    let gl = localStorage.getItem(`${playerName}losses`);
    let gt = localStorage.getItem(`${playerName}total`);
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
    if (gw == null) {
        gw = 0;
    }
    if (gd == null) {
        gd = 0;
    }
    if (gl == null) {
        gl = 0;
    }
    if (gt == null) {
        gt = 0;
    }
    wins.innerHTML = lw;
    draws.innerHTML = ld;
    losses.innerHTML = ll;
    total.innerHTML = lt;
    savedWins.innerHTML = gw;
    savedDraws.innerHTML = gd;
    savedLosses.innerHTML = gl;
    savedTotal.innerHTML = gt;
    if (playerName) {
        playerNameText.innerHTML = playerName;
    }
    let playerList = localStorage.getItem('playerList');
    if (playerList) {
        playerArr = playerList.split(',');
        console.log(playerArr);
        winsarrnames = []
        winsarr = []
        for (i = 0; i < playerArr.length; i++) {
            winsarrnames.push(`${playerArr[i]}:${parseInt(localStorage.getItem(`${playerArr[i]}wins`))}`);
            let j = parseInt(localStorage.getItem(`${playerArr[i]}wins`));
            winsarr.push(j);
        }
        for (i = 0; i < 3; i++) {
            let highest = Math.max(...winsarr);
            let found = winsarrnames.find(element => element.includes(highest));
            //winsarr.
            found = found.split(':');
            if (i == 0) {
                twn1pn.innerHTML = found[0];
                twn1a.innerHTML = found[1];
            } else if (i == 1) {
                twn2pn.innerHTML = found[0];
                twn2a.innerHTML = found[1];
            }
        }
    }
}

function resetBoard() {
    playerName = '';
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
    updateBoard();
    openRestartModal('Congratulations, you won!');
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
        playerName = input.value;
        errorMsg.style.display = 'none';
        errorMsg.innerHTML = '';
        let gw = localStorage.getItem(`${playerName}wins`);
        let gd = localStorage.getItem(`${playerName}draws`);
        let gl = localStorage.getItem(`${playerName}losses`);
        let gt = localStorage.getItem(`${playerName}total`);
        if (gw == null) {
            gw = 0;
        }
        if (gd == null) {
            gd = 0;
        }
        if (gl == null) {
            gl = 0;
        }
        if (gt == null) {
            gt = 0;
        }
        gw = parseInt(gw) + parseInt(lw);
        gd = parseInt(gd) + parseInt(ld);
        gl = parseInt(gl) + parseInt(ll);
        gt = parseInt(gt) + parseInt(lt);
        localStorage.setItem('wins', 0);
        localStorage.setItem('draws', 0);
        localStorage.setItem('losses', 0);
        localStorage.setItem('total', 0);
        localStorage.setItem(`${playerName}wins`, gw);
        localStorage.setItem(`${playerName}draws`, gd);
        localStorage.setItem(`${playerName}losses`, gl);
        localStorage.setItem(`${playerName}total`, gt);
        let playerList = localStorage.getItem(`playerList`);
        if (playerList == null) {
            playerList = ''
        }
        if (playerList.includes(playerName) == false) {
            if (playerList == '') {
                localStorage.setItem('playerList', playerName);
            } else {
                playerList += `,${playerName}`
                localStorage.setItem('playerList', playerList);
            }
        }
        updateBoard();
    } else {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Your name must be 2 characters or longer!';
    }
}

updateBoard();

closeSubmitModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', openModal);
submit.addEventListener('click', submitName);

closeRestartModalBtn.addEventListener('click', closeRestartModal);
restartBtn.addEventListener('click', resetGame);