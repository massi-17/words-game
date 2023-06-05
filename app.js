const words = [
    'casa',
    'cane',
    'gatto',
    'pioggia',
    'sole',
    'vento',
    'cielo',
    'mare',
    'montagna',
    'strada',
    'bosco',
    'fiume',
    'giardino',
    'gioco',
    'libro',
    'scuola',
    'amico',
    'famiglia',
    'cibo',
    'vino',
    'birra',
    'caffè',
    'arancia',
    'limone',
    'mela',
    'banana',
    'fragola',
    'uva',
    'mele',
    'carne',
    'pesce',
    'verdura',
    'pomodoro',
    'patate',
    'riso',
    'pasta',
    'pizza',
    'formaggio',
    'burro',
    'olio',
    'sale',
    'pepe',
    'zucchero',
    'miele',
    'farina',
    'panna',
    'latte',
    'uovo',
    'panino',
    'panettone',
    'torrone',
    'gelato',
    'torta',
    'biscotto',
    'cioccolato',
    'caramelle',
    'festa',
    'natale',
    'capodanno',
    'compleanno',
    'vacanza',
    'viaggio',
    'mare',
    'montagna',
    'città',
    'paese',
    'mondo',
    'storia',
    'arte',
    'musica',
    'film',
    'teatro',
    'poesia',
    'letteratura',
    'lingua',
    'religione',
    'politica',
    'economia',
    'scienza',
    'tecnologia',
    'internet',
    'smartphone',
    'computer',
    'tablet',
    'auto',
    'moto',
    'bicicletta',
    'treno',
    'aereo',
    'navigazione',
    'trasporto',
    'servizio',
    'mercato',
    'negozio',
    'banca',
    'poste',
    'ufficio',
    'casa',
    'giardino',
    'arredamento',
    'decorazione',
    'abbigliamento',
    'calzature',
    'orologio',
    'gioiello',
    'borsa',
    'occhiali',
    'bevanda',
    'alcolico',
    'non alcolico',
    'acqua',
    'bibita',
    'bevanda calda',
    'caffè',
    'tè',
    'succo',
    'latte',
    'aperitivo',
    'digestivo',
    'antipasto',
    'primo',
    'secondo',
    'contorno',
    'dolce',
    'formaggio',
    'vino',
]
//DOM
const keyboard = document.getElementById('keyboard')
let timerOutput = document.querySelector('.timer')
let pointOutput = document.querySelector('.points')
let wordOutput = document.querySelector('.word')
let keys = document.querySelectorAll('.key')
//GLOBAL
let children = wordOutput.children
let i = 0
//SOUND
let keySound = new Audio('/assets/keyboardClick.mp3')
let errorSound = new Audio('/assets/error.wav')
errorSound.volume = 0.2
//POINTS
let pointCounter = 0
let pressedDigitArray = []
//RENDER RANDOM WORD
let randomWord = []
function renderRandomWord(array) {
    randomWord = [array[Math.floor(Math.random() * array.length)]]
    for (let i = 0; i < randomWord[0].length; i++) {
        wordOutput.innerHTML += `
        <div data-letter="${randomWord[0][i]}">${randomWord[0][i]}</div>
        `
    }
}
renderRandomWord(words)
let wordStr = randomWord.join('')
let arrayWord = wordStr.split('')
//TIMER
let countTimer = null
function startCount() {
    let sec = 1
    countTimer = setInterval(function () {
        timerOutput.innerHTML = sec
        sec++
    }, 1000)
}
function stopCount() {
    clearInterval(countTimer)
}
//GAME CONTROLS
function sameDigit() {
    console.log('same digit')
    children[i].style.color = 'yellowgreen'
    pointCounter++
    pointOutput.innerHTML = pointCounter
    i++
}
function wrongDigit(e) {
    errorSound.play()
    console.log('wrong digit')
    pressedDigitArray.pop(e.key)
    children[i].style.color = 'red'
    pointCounter--
    pointOutput.innerHTML = pointCounter
}
const modal = document.querySelector('.modal-overlay')
const playAgain = document.querySelector('.modal-content')

function finishedWord() {
    
    console.log('done')
    window.removeEventListener('keydown', keyboardEvent)
    keyboard.style.pointerEvents = 'none'
    stopCount()
    
    for (var z = 0; z < 100; z++) {
        createConfetti();
    }
    modal.style.visibility = 'visible'
}
function handleGame(e) {
    if (countTimer == null) {
        startCount()
    }
    if (e.target.dataset.key == arrayWord[i]) {
        sameDigit()
    } else {
        wrongDigit(e)
    }
    if (pressedDigitArray.length == arrayWord.length) {
        finishedWord()
        
    }
}
//EVENT LISTENER
keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        keySound.play()
        pressedDigitArray.push(e.key)
        handleGame(e)
    })
})
window.addEventListener('keydown', keyboardEvent)
function keyboardEvent(e) {
    console.log(e.key)
    keySound.play()
    pressedDigitArray.push(e.key)
    for (let y = 0; y < keys.length; y++) {
        console.log(keys[y].dataset.key)
        if (keys[y].dataset.key == e.key) {
            keys[y].classList.add('pressed')
        }
    }
    if (countTimer == null) {
        startCount()
    }
    if (e.key == arrayWord[i]) {
        sameDigit()
    } else {
        wrongDigit(e)
    }
    if (pressedDigitArray.length == arrayWord.length) {
        finishedWord()
    }
}
window.addEventListener('keyup', e => {
    for (let y = 0; y < keys.length; y++) {
        console.log(keys[y].dataset.key)
        if (keys[y].dataset.key == e.key) {
            keys[y].classList.remove('pressed')
        }
    }
})

playAgain.addEventListener('click', e => {
    location.reload();
})

function createConfetti() {
    var confetti = document.createElement("div");
    confetti.classList.add("confetti");
    var x = Math.floor(Math.random() * window.innerWidth);
    var y = Math.floor(Math.random() * window.innerHeight);
    confetti.style.left = x + "px";
    confetti.style.top = y + "px";
    document.body.appendChild(confetti);
    setTimeout(function() {
      confetti.parentNode.removeChild(confetti);
    }, 3000);
  }
