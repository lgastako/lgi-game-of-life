function main(){
async function gameClock(speed){
speed=1/speed;
	while (true){
  	await new Promise((speed => setTimeout(speed, 2000)))
    console.log("ping");
  }
  
}
function initHTML(){
var container=document.querySelector(".container");
	for (var i=0; i<100; i++){
  for (var o=0; o<100; o++){
  var cell=document.createElement("div");
  cell.classList.add("cell");
  cell.id=`${i};${o}`;
  cell.addEventListener("click", (e)=>{
  var cell=e.target;
  var position=cell.id.split(";");
  board.data[position[0]][position[1]].changeState();
  board.updateCells();
  
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
	this.alive=!this.alive;
  if (this.alive){
  	board.checkCells.push(this.position);
    }
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
updateCells(){

  var cells=this.checkCells;
  var actions=[]; // ["k", [position]], ["A", position]]
  var checkedCells=[];
  
  for (var i=0; i<cells.length;i++){
  var cell=cells[i];
  var aliveNeighbors=0;
  var nearbyCells=this.data[cells[i][0]][cells[i][1]].returnNearbyCells();
  for(var o=0; o<nearbyCells.length;o++){
			if (nearbyCells[o].alive){ 
      aliveNeighbors++
      }
  }
  console.log(aliveNeighbors);
  }

  
} 

updateDisplay(){

	for (var i=0; i<this.checkCells.length; i++){
  var cell = document.getElementById(`${this.checkCells[i][0]};${this.checkCells[i][1]}`);
  console.log(this.checkCells);
  if (this.data[this.checkCells[i][0]][this.checkCells[i][1]].alive){
  	cell.classList.add("alive");
  }
  else{
  cell.classList.remove("alive")

  this.checkCells.splice(this.checkCells.indexOf(this.checkCells[i]))

  }}
  }

}


var board= new Board();
initHTML();
gameClock(1000);
}
main();
