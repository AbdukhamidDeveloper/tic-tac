const screens = document.querySelectorAll('.screen')
const startBtn = document.querySelector('#start')
const res = document.querySelector('.res')
const board = document.querySelector('.board')
const draw = document.querySelector('.draw')
const ticX = document.querySelector('.ticX')
const ticO = document.querySelector('.ticO')
const finish = document.querySelector('.finishGame')
const gameWin = document.querySelector('.gameWin')

const cells = 9
let x = 0
let o = 0
let dr = 0
let xo = 'x';
let winner = 0
let grid = [];

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
    startGame()
})

res.addEventListener('click', () => {
    xo = 'x'
    winner = 0
    grid.splice(0)
    finish.style.display = 'none'
    board.innerHTML = ''
    startGame()
})

function startGame() {
    board.append(finish)

    for (i = 0; i < cells; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        board.append(cell)

        let a = grid.push(i)

        cell.addEventListener('click', () => {
            grid[a - 1] = returningXO()
            cell.classList.add(`${xo}`)
            winner++
            if (testGame(grid)) {
                finishGame()
            } else if (winner == 9) {
                finish.style.display = 'block'
                dr++
                draw.innerHTML = `${dr}`       
            }
        }, { once: true })
    }
}

function returningXO() {
    if (xo === "x") {
        xo = "o"
        return xo;
    } else if (xo === 'o') {
        xo = "x"
        return xo;
    }
}

function testGame(cell) {
    if (cell[0] === cell[1] && cell[1] === cell[2]) return true;
    if (cell[3] === cell[4] && cell[4] === cell[5]) return true;
    if (cell[6] === cell[7] && cell[7] === cell[8]) return true;
    if (cell[0] === cell[3] && cell[3] === cell[6]) return true;
    if (cell[1] === cell[4] && cell[4] === cell[7]) return true;
    if (cell[2] === cell[5] && cell[5] === cell[8]) return true;
    if (cell[0] === cell[4] && cell[4] === cell[8]) return true;
    if (cell[2] === cell[4] && cell[4] === cell[6]) return true;
}

function finishGame() {
    finish.style.display = 'block'
    winner = winner % 2
    if (winner == 0) {
        x++
        ticX.innerHTML = ` ${x}`
    } else if (winner == 1) {
        o++
        ticO.innerHTML = ` ${o}`
    }
}