const WORDS = [
    'DEVELOPER', 'ENGINEER', 'NODE', 'JAVASCRIPT', 
    'CODING', 'HTML','BACKEND', 'GUI', 'BOOLEAN', 
    'REACT', 'FUNCTION', 'COMPUTER SCIENCE', 
    'SEPARATION OF CONCERNS'
];

const WRONG_GUESS_HUNG_COUNT = 6;
const SPRITE_WIDTH = 11.25; 

let secretWord;
let guessWord;
let usedLetters;
let wrongLetters;

const guessEl = document.getElementById('guess');
const letterBtns = document.querySelectorAll('#letters > button');
const msgEl = document.querySelector('h1');
const replayBtn = document.getElementById('replay');
const gallowsEl = document.getElementById('gallows');

document.getElementById('letters').addEventListener('click', handleLetterClick);
replayBtn.addEventListener('click', init);

init();

function isGameOver(){
    return (secretWord === guessWord || wrongLetters.length === WRONG_GUESS_HUNG_COUNT);
}

function handleLetterClick(evt) {
    let letter = evt.target.textContent;
    if (
        evt.target.tagName !== 'BUTTON' || 
        usedLetters.includes(letter) ||
        isGameOver()
        ) return;
        usedLetters.push(letter);
        if (secretWord.includes(letter)){ 
            let newGuessWord = '';
            for(let i = 0; i < secretWord.length; i++) {
                newGuessWord += secretWord[i] === letter ? letter : guessWord[i]; 
            }
            guessWord = newGuessWord;
        } else {
            wrongLetters.push(letter);
        }
        replayBtn.style.visibility = isGameOver() ? 'visible' : 'hidden';
        render();
    }

function render() {
    guessEl.textContent = guessWord;
    letterBtns.forEach(function(btn) {
        let letter = btn.textContent;
        if (wrongLetters.includes(letter)){
            btn.className = 'wrong';
        } else if (usedLetters.includes(letter)){
            btn.className = 'correct';
        } else {
            btn.className = '';
        }
    });

        gallowsEl.style.backgroundPositionX = `-${SPRITE_WIDTH * wrongLetters.length}vmin`;

        renderMessage();
}

function renderMessage(){
    if (secretWord === guessWord){
        msgEl.textContent = 'Congrats!';

    } else if (wrongLetters.length === WRONG_GUESS_HUNG_COUNT) {
        msgEl.textContent = 'Sorry!';

    } else {
        msgEl.textContent = 'Good Luck!';
    }
}

function init () {
    let rndIdx = Math.floor(Math.random() * WORDS.length); 
    secretWord = WORDS[rndIdx];
    guessWord = '';
    for(let char of secretWord){
        guessWord += char === ' ' ? ' ' : '_'; 
    }

    usedLetters = [];
    wrongLetters = [];
    render();
}