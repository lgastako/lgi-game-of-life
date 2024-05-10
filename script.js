function main(){
async function gameClock(speed){
speed=1000/speed;
	while (true){
  	await new Promise(r => setTimeout(r, speed));
   board.updateCells();
   board.updateDisplay()
   console.log("ping");
  }
  
}
function initHTML(){
var container=document.querySelector(".container");
	var columns=10;
  var rows =10;
  container.style["grid-template-rows"]=`repeat(${rows}, 50px)`;
  container.style["grid-template-columns"]= `repeat(${columns}, 50px)`;
  
	for (var i=0; i<100; i++){
  for (var o=0; o<100; o++){
  var cell=document.createElement("div");
  cell.classList.add("cell");
  cell.id=`${i};${o}`;
  cell.addEventListener("click", (e)=>{
  var cell=e.target;
  var position=cell.id.split(";");
  board.data[position[0]][position[1]].changeState();
  
  board.updateDisplay();
  });
  
  	container.appendChild(cell);
  }
  }
}
class Cell{
constructor(row, col){
this.position=[row,col];
this.alive=false;
}
changeState(){
//console.log("alive before: ", this.alive)
	this.alive=!this.alive;
 // console.log("alive after: ", this.alive)
  if (this.alive){
  	board.checkCells.push(this.position);
    }
    return true;
}

returnNearbyCells(){
var cells=[];

for (var row=-1;row<2;row++)
	for (var col=-1;col<2; col++){
 
  var cell=[row+this.position[0],col+this.position[1]];
  if (cell[0]<0){
  cell[0]=0;
  }
  if (cell[1]<0){
  cell[1]=0;
  }
  if (!(this.position[0]==cell[0] && this.position[1]==cell[1])){
  
  cells.push(board.data[cell[0]][cell[1]]);
  }  
  }
return cells;
}
}

class Board{
constructor(){
this.checkCells=[];
this.data={};
for (var i=0; i<100; i++){
this.data[i]={};
  for (var o=0; o<100; o++){
 this.data[i][o]=new Cell(i,o);
  }
  }
}
checkRules(cell){
var aliveNeighbors=0;
  var nearbyCells=cell.returnNearbyCells();
  for(var i=0; i<nearbyCells.length;i++){
  if (nearbyCells[i].alive){
  	aliveNeighbors++;
  }
    }
    if (cell.alive){
    	if (aliveNeighbors<2 || aliveNeighbors>3){
      	return [false, cell];
      }}
      else if(!cell.alive){
      	if (aliveNeighbors==3){
        return [true, cell];
        }
        return [false, cell];
      }
    
  return "fail";
  }
  

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
        if (this.data[cellsToUpdate[i][0]][cellsToUpdate[i][1]].alive) {cell.classList.add("alive")}
        else{
            cell.classList.remove("alive");
            this.checkCells.splice(this.checkCells.indexOf(cellsToUpdate[i]), 1);
        }
    }
}

}


var board= new Board();
initHTML();
gameClock(0.75);
}
main();

