class GameState {
  constructor(board) {
    this.board = board
    this.paused = true
    this.speed = 1
  }

  setSpeed(speed) {
    if (speed > 0) {
      this.speed = speed
    }
    return this.speed
  }

  start(speed = this.speed) {
    this.speed = speed
    this.paused = false
    this.gameClock()
    return true
  }

  stop() {
    this.paused = true
    return true
  }

  gameClock = async (speed = this.speed) => {
    while (this.paused == false) {
      this.board.updateCells()
      this.board.updateDisplay()
      await new Promise((r) => setTimeout(r, 1000 / speed))
    }
  }
}

function setupGame(board, gameState) {
  const rows = board.rows
  const columns = board.columns

  const container = document.querySelector('.container')
  const pauseButton = document.querySelector('.pause-button')

  pauseButton.addEventListener('click', (e) => {
    const btn = e.target
    if (btn.classList.contains('toggled')) {
      btn.textContent = '▐▐'
      btn.classList.toggle('toggled')
      gameState.start()
    } else {
      btn.textContent = '▶'
      btn.classList.toggle('toggled')
      gameState.stop()
    }
  })

  container.style['grid-template-rows'] = `repeat(${rows}, 50px)`
  container.style['grid-template-columns'] = `repeat(${columns}, 50px)`

  for (let r = 0; r < columns; r++) {
    for (let c = 0; c < rows; c++) {
      const cell = document.createElement('div')

      cell.classList.add('cell')
      cell.id = `${r};${c}`

      cell.addEventListener('click', (e) => {
        const cell = e.target
        const position = cell.id.split(';')
        board.cells[position[0]][position[1]].changeState()
        board.updateDisplay()
      })

      container.appendChild(cell)
    }
  }
}

class Cell {
  constructor(board, row, col) {
    this.board = board
    this.position = [row, col]
    this.alive = false
  }

  changeState() {
    this.alive = !this.alive
    if (this.alive) this.board.checkCells.push(this.position)
    return true
  }

  nearbyCells() {
    const board = this.board
    const neighbors = []
    const maxWidth = board.rows - 1
    const maxHeight = board.columns - 1
    for (let r = -1; r < 2; r++)
      for (let c = -1; c < 2; c++) {
        const cell = [r + this.position[0], c + this.position[1]]

        if (cell[0] < 0) cell[0] = maxWidth
        if (cell[1] < 0) cell[1] = maxHeight
        if (cell[0] > board.rows - 1) cell[0] = 0
        if (cell[1] > board.columns - 1) cell[1] = 0

        if (
          !(this.position[0] == cell[0] && this.position[1] == cell[1]) &&
          !neighbors.includes(board.cells[cell[0]][cell[1]])
        ) {
          neighbors.push(board.cells[cell[0]][cell[1]])
        }
      }
    return neighbors
  }
}

class Board {
  constructor(rows = 25, columns = 25) {
    this.columns = columns
    this.rows = rows
    this.checkCells = []
    this.cells = []
    for (let r = 0; r < this.rows; r++) {
      this.cells[r] = {}
      for (let c = 0; c < this.columns; c++) {
        this.cells[r][c] = new Cell(this, r, c)
      }
    }
  }

  checkRules(cell) {
    let aliveNeighbors = 0
    const nearbyCells = cell.nearbyCells()
    for (let r = 0; r < nearbyCells.length; r++) {
      if (nearbyCells[r].alive) {
        aliveNeighbors++
      }
    }
    if (cell.alive) {
      if (aliveNeighbors < 2 || aliveNeighbors > 3) {
        return [false, cell]
      } else {
        return [true, cell]
      }
    } else if (!cell.alive) {
      if (aliveNeighbors == 3) {
        return [true, cell]
      } else {
        return [false, cell]
      }
    }
    return 'fail'
  }

  updateCells() {
    const ccs = this.checkCells
    const actions = [] // [false, [position]], [true, position] false kill true revive
    const checkedCells = []

    for (let i = 0; i < ccs.length; i++) {
      // for cell
      const cell = this.cells[ccs[i][0]][ccs[i][1]]
      const nearbyCells = cell.nearbyCells()
      for (let o = 0; o < nearbyCells.length; o++) {
        //for nearby cell
        if (!checkedCells.includes(nearbyCells[o])) {
          actions.push(this.checkRules(nearbyCells[o]))

          checkedCells.push(nearbyCells[o])
        }
      }
      if (!checkedCells.includes(cell)) {
        actions.push(this.checkRules(cell))
        checkedCells.push(cell)
      }
    }
    for (const action of actions) {
      const [actionType, cell] = action
      if (cell.alive != actionType) cell.changeState()
    }
  }

  updateDisplay() {
    const cellsToCheck = this.checkCells.slice()
    for (let i = 0; i < cellsToCheck.length; i++) {
      const cell = document.getElementById(
        `${cellsToCheck[i][0]};${cellsToCheck[i][1]}`,
      )
      if (this.cells[cellsToCheck[i][0]][cellsToCheck[i][1]].alive) {
        cell.classList.add('alive')
      } else {
        cell.classList.remove('alive')
        this.checkCells.splice(this.checkCells.indexOf(cellsToCheck[i]), 1)
      }
    }
  }
}

function main() {
  const board = new Board()
  const gameState = new GameState(board)
  setupGame(board, gameState)
  gameState.setSpeed(Number(prompt('update speed: ')))
}

main()
