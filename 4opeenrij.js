
const ROWS = 6;
const COLS = 7;

let boardDiv = document.getElementById("boarddiv");
let boardTable = document.getElementById("boardtable");
let turn = 0;
let done = false;

function makeBoard(){
	for(let i = 0; i < ROWS; i++){
		let tr = document.createElement("tr");
		for(let j = 0; j < COLS; j++){
			let td = document.createElement("td");
			td.classList.add("empty", "col"+j);
			td.addEventListener('click', function(){
				clickCell(this);
			});
			td.addEventListener('mouseover', function(){
				mouseToggleColumnHover(this)
			});
			td.addEventListener('mouseout', function(){
				mouseToggleColumnHover(this);
			});
			tr.appendChild(td);
		}
		boardTable.appendChild(tr);
	}
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function getColumnIndexFromCell(cell){
	for(let i = 0; i < COLS; i++){
		if(hasClass(cell, "col"+i)){
			return i;
		}
	}
	return -1;
}

function clickCell(cell){
	if(done || !cell.classList.contains("empty")){
		return;
	}
	
	console.log("cell:");
	console.log(cell);
	
	let colIndex = getColumnIndexFromCell(cell);
	console.log("colIndex:");
	console.log(colIndex);
	let rowIndex = getLowestEmptyCell(colIndex);
	console.log("rowIndex:");
	console.log(rowIndex);

	let row = boardTable.rows[rowIndex];
	let lowestCell = row.cells[colIndex];

	console.log("lowest cell:");
	console.log(lowestCell);

	if(turn%2 == 0){
		lowestCell.classList.replace("empty", "player0");
	} else {
		lowestCell.classList.replace("empty", "player1");
	}

	turn++;
}

function mouseToggleColumnHover(cell){
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

	//Add or remove hovered class from all cells in column
	for(let i = 0, row; row = boardTable.rows[i]; i++){
		row.cells[index].classList.toggle("hovered");
	}
}

function getLowestEmptyCell(col){
	for (let i = ROWS-1, row; row = boardTable.rows[i]; i--) {
		if(row.cells[col].classList.contains("empty")){
			console.log("lowest cell index: " + i);
			return i;
		}
	}
	return -1;
}

function gameFinished(){
	console.log("function: gameFinished");
	done = true;
}

function clickButton(){
	alert();
}

makeBoard();