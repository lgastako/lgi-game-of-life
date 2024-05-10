updateCells() {
    var cells = this.checkCells.slice(); // Copy the array to avoid modifying it during iteration
    var actions = [];

    for (var i = 0; i < cells.length; i++) {
        var cell = this.data[cells[i][0]][cells[i][1]];
        var nearbyCells = cell.returnNearbyCells();
        
        for (var o = 0; o < nearbyCells.length; o++) {
            if (!actions.includes(nearbyCells[o])) {
                actions.push(nearbyCells[o]);
            }
        }
        actions.push(cell);
    }
  
    for (var action of actions) {
        var [actionType, cell] = this.checkRules(action);
        if (cell.alive !== actionType) {
            cell.changeState();
        }
    }
}

updateDisplay() {
    var cellsToUpdate = this.checkCells.slice(); // Copy the array to avoid modifying it during iteration
    for (var i = 0; i < cellsToUpdate.length; i++) {
        var cell = document.getElementById(`${cellsToUpdate[i][0]};${cellsToUpdate[i][1]}`);
        if (!this.data[cellsToUpdate[i][0]][cellsToUpdate[i][1]].alive) {
            cell.classList.remove("alive");
            this.checkCells.splice(this.checkCells.indexOf(cellsToUpdate[i]), 1);
        }
    }
}
