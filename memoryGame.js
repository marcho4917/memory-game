const memoryCards = document.querySelectorAll('.memory-card');
const endGame = document.querySelector('.end-text');
const newGame = document.querySelector('button');

let pairsAmount = 6;
let hasReverseMemoryCard = false;
let firstMemoryCard, secondMemoryCard;
let lockTable = false;


function reverseCard() {
    if (lockTable) return;
    if(this === firstMemoryCard) return;

    this.classList.add('reverse');

    if(!hasReverseMemoryCard) {
        hasReverseMemoryCard = true;
        firstMemoryCard = this;

        return;
    } 
    secondMemoryCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstMemoryCard.dataset.name === secondMemoryCard.dataset.name;
    
    isMatch ? disableMemoryCards() : unreverseCards();
}

function disableMemoryCards() {
    firstMemoryCard.removeEventListener('click', reverseCard);
    secondMemoryCard.removeEventListener('click', reverseCard);
    lockTable = true;
    setTimeout(() => {
        firstMemoryCard.classList.add('off');
        secondMemoryCard.classList.add('off');
        resetTable();
    }, 1500);

    pairsAmount--;
    pairsAmount === 0 ? 
    setTimeout(() => { endGame.classList.add('on')}, 1500) : null;
        
    newGame.addEventListener('click', startNewGame);
}

function unreverseCards() {
    lockTable = true;

    setTimeout(() => {
        firstMemoryCard.classList.remove('reverse');
        secondMemoryCard.classList.remove('reverse');
        resetTable();
    }, 1000);
}

function resetTable() {
    [hasReverseMemoryCard, lockTable] = [false, false];
    [firstMemoryCard, secondMemoryCard] = [null, null];
}

function startNewGame() {
    endGame.classList.remove('on');
    pairsAmount = 6;
    memoryCards.forEach(memoryCard => {
        memoryCard.classList.remove('reverse', 'off');
    });

    shuffleMemoryCards();

    memoryCards.forEach(memoryCard => 
        memoryCard.addEventListener('click', reverseCard));
}

function shuffleMemoryCards() {
    memoryCards.forEach(memoryCard => {
        let randomPosition = Math.floor(Math.random() * 12);
        memoryCard.style.order = randomPosition;
    });
};

memoryCards.forEach(memoryCard => 
    memoryCard.addEventListener('click', reverseCard));

shuffleMemoryCards();
