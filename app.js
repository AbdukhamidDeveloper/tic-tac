const screens = document.querySelectorAll('.screen')     
const startBtn = document.querySelector('#start')
const res = document.querySelector('.res')
const board = document.querySelector('.board')
const draw = document.querySelector('.draw')
const ticX = document.querySelector('.ticX')
const ticO = document.querySelector('.ticO')
const finish = document.querySelector('.finishGame')
const gameWin = document.querySelector('.gameWin')

// Создаем переменные для игры 

const cells = 9  // количество клеток 
let x = 0    // счет для х
let o = 0    // счет для о
let dr = 0   // счет для ничьи
let xo = 'x';   // начальная значение игры
let winner = 0  // переменная для определения победителя
let grid = []; // пустой массив для проверки игры

startBtn.addEventListener('click', (event) => {      // кнопка старт
    event.preventDefault()
    screens[0].classList.add('up')      
    startGame()                                 // функция начинает игру
})

res.addEventListener('click', () => {     // кнопка перезагрузка игры        
    xo = 'x'
    winner = 0
    grid.splice(0)
    finish.style.display = 'none'
    board.innerHTML = ''
    startGame()
})

function startGame() {           
    board.append(finish)

    for (i = 0; i < cells; i++) {    // цикл для создание клетки игры
        const cell = document.createElement('div')
        cell.classList.add('cell')
        board.append(cell)

        let createArrayforGame = grid.push(i)   // добавление элементов массива

        cell.addEventListener('click', () => {     // обработка событие для каждой клетки
            grid[createArrayforGame - 1] = returningXO()         // присваивается массиву значение либо х либо о
            cell.classList.add(`${xo}`)                     // отображает либо х либо о
            winner++
            if (testGame(grid)) {    //  это условие проверяет закончилось ли игра
                finishGame()        
            } else if (winner == 9) {    // определяет ничью если все клетки заполнены
                viewFinishMessage()
                dr++    
                draw.innerHTML = `${dr}`       
            }
        }, { once: true })
    }
}

function returningXO() {    // по очередно возвращает х и о
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

function finishGame() {          // определяет победителя
    viewFinishMessage()
    winner = winner % 2
    if (winner == 0) {
        x++
        ticX.innerHTML = ` ${x}`
    } else if (winner == 1) {
        o++
        ticO.innerHTML = ` ${o}`
    }
}

function viewFinishMessage () {    // выводит конец игры
    finish.style.display = 'block'
}