
const ROWS = 6;
const COLS = 7;

let boardDiv = document.getElementById("boarddiv");
let boardTable = document.getElementById("boardtable");
let rowArray = [];
let clickedCell;
let hoveredCell;
let turn = 0;

function makeBoard(){
	for(let i = 0; i < ROWS; i++){
		let tr = document.createElement("tr");
		for(let j = 0; j < COLS; j++){
			let td = document.createElement("td");
			td.classList.add("empty");
			td.addEventListener('click', function(){
				clickCell(this);
			});
			td.addEventListener('mouseover', function(){
				mouseToggleHover(this)
			});
			td.addEventListener('mouseout', function(){
				mouseToggleHover(this);
			});
			tr.appendChild(td);
		}
		boardTable.appendChild(tr);
		rowArray.push(tr);
	}
}

function clickCell(cell){
	console.log(cell);
	clickedCell = cell;
	
	if(!cell.classList.contains("empty")){
		return;
	}

	cell.classList.remove("empty");
	
	if(turn%2 == 0){
		cell.classList.add("player0");
	} else {
		cell.classList.add("player1");
	}

	turn++;
}

function mouseToggleHover(cell){
	let index = -1;
	
	//get column number in row
	for(let i = 0; i < cell.parentElement.childElementCount; i++){
		if(cell === cell.parentElement.children[i]){
			index = i;
			break;
		}
	}

	//if row not found, weird error
	if(index === -1){
		alert("Toggle hover can't find row!");
		return;
	}

	for(let i = 0, row; row = boardTable.rows[i]; i++){
		row.cells[index].classList.toggle("hovered");
	}
}

function gameFinished(){
	console.log("function: gameFinished");
}

function clickButton(){
	alert();
}

makeBoard();