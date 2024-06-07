'use strict'

// Required Variable Declarations
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');

let diceImg = document.querySelector('.dice');

let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');

// To keep track of current score
let current = 0;

// player
let player = 0;

// starting 
diceImg.classList.add('hidden');
let playing = true;


// Functioning

// Function to switch players
const switchPlayer = function() {
    player = player === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// Function to update current score and dice image
const currentAndImg = function(number, active) {
    diceImg.src = `/Dice-Roll-Game/Images/dice-${number}.png`; 
    current += (number === 1 ? 0 : number);

    if(active === 0) currentScore0.innerHTML = current;
    else currentScore1.innerHTML = current;
};

btnRoll.addEventListener('click', function() {

    if(playing) {
        // Random Number
        let diceRoll = Math.floor((Math.random() * 6) + 1);

        diceImg.classList.remove('hidden');

        if(diceRoll === 1) {
            diceImg.src = '/Dice-Roll-Game/Images/dice-1.png';
            current = 0;
            currentAndImg(1, player);
            switchPlayer(); 
        }
        else {
            currentAndImg(diceRoll, player);
        }
    }
});

// To hold the score
btnHold.addEventListener('click', function() {
    if(playing) {
        player === 0 ? score0.innerHTML = Number(score0.innerHTML) + current : score1.innerHTML = Number(score1.innerHTML) + current;
        current = 0;
    
        player === 0 ? currentScore0.innerHTML = current : currentScore1.innerHTML = current;
    
        // To finish the game
        if(Number(score0.textContent) >= 100 || Number(score1.textContent) >= 100) {
            playing = false;

            player === 0 ? player0.classList.add('player--winner') : player1.classList.add('player--winner');
        }
        else {
            switchPlayer();
        }
    }
});

// restart the game
btnNew.addEventListener('click', function() {
    playing = true;
    diceImg.classList.add('hidden');
    current = 0;

    currentScore0.textContent = current;
    currentScore1.textContent = current;

    score0.textContent = current;
    score1.textContent = current;

    player = 0;
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
});