function main(){
function initHTML(){
var container=document.querySelector(".container");
	for (var i=0; i<100; i++){
  for (var o=0; o<100; o++){
  var cell=document.createElement("div");
  cell.classList.add("cell");
  cell.tag=`${i};${o}`;
  cell.addEventListener("click", (e)=>{
  var cell=e.target;
  var position=cell.tag.split(";");
 board.data[position[0]][position[1]].changeState();
 //board.updateCells();
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
  	board.aliveCells.push(this.position);
    console.log(board.aliveCells);
  } else{
  board.aliveCells.splice(board.aliveCells.indexOf(this.position))
  }
  board.updateDisplay();
  
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
  cells.push(cell);
  }  
  }
return cells;
}
}

class Board{
constructor(){
this.aliveCells=[];
this.data={};
for (var i=0; i<100; i++){
this.data[i]={};
  for (var o=0; o<100; o++){
 this.data[i][o]=new Cell(i,o);
  }
  }
}
/* updateCells(){
console.log(this.aliveCells)
  var cells=this.aliveCells;
  console.log(cells);
  var actions=[];
  for (var i=0; i<cells.length;i++){
  var cell=cells[i];
  var checkCells=this.data[cells[i].position].returnNearbyCells();
  for(var o=0; o<checkCells.length;o++){
    console.log(checkCells[o]);
  }
  }
  this.updateDisplay();
} */
updateDisplay(){
console.log(this.data[this.alivecells[0]].position)

  for (var i=0; i<this.aliveCells.length; i++){
  var cell = document.querySelector(`${this.data[this.alivecells[i]].position[0]};${this.data[this.alivecells[i]].position[1]}`)
  console.log(cell);
  if (this.aliveCells[i].state){
  	cell.classList.add("alive");
  }
  else{
  cell.classList.remove("alive");
  }
  }
}
}



var board= new Board();
initHTML();
}
main();
