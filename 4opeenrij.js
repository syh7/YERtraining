
const ROWS = 6;
const COLS = 7;

let textDiv = document.getElementById("text");
let boardDiv = document.getElementById("boarddiv");
let boardTable = document.getElementById("boardtable");
let turns = 0;
let finished = false;

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
	if(finished || !cell.classList.contains("empty")){
		return;
	}
	
	console.log("cell:");
	console.log(cell);
	
	let colIndex = getColumnIndexFromCell(cell);
	let rowIndex = getLowestEmptyCell(colIndex);

	let lowestCell = boardTable.rows[rowIndex].cells[colIndex];

	console.log("lowest cell:");
	console.log(lowestCell);

	if(turns%2 == 0){
		lowestCell.classList.replace("empty", "player0");
	} else {
		lowestCell.classList.replace("empty", "player1");
	}

	turns++;

	checkGameFinished();
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

function getLowestEmptyCell(colIndex){
	for (let i = ROWS-1, row; row = boardTable.rows[i]; i--) {
		if(row.cells[colIndex].classList.contains("empty")){
			console.log("lowest cell index: " + i);
			return i;
		}
	}
	return -1;
}

function checkLine(cell1, cell2, cell3, cell4){
	return !cell1.classList.contains("empty") && ( 
		(cell1.classList.contains("player0") && cell2.classList.contains("player0") && cell3.classList.contains("player0") && cell4.classList.contains("player0")) || 
		(cell1.classList.contains("player1") && cell2.classList.contains("player1") && cell3.classList.contains("player1") && cell4.classList.contains("player1"))
	);
}

function checkGameFinished(){
	//check horizontal win
	for(let i = 0; i < ROWS; i++){
		for(let j = 0; j < COLS-3; j++){
			if(checkLine(boardTable.rows[i].cells[j], boardTable.rows[i].cells[j+1], boardTable.rows[i].cells[j+2], boardTable.rows[i].cells[j+3])){
				finished = true;
				victoryDance();
			}
		}
	}

	//check vertical win
	for(let i = 0; i < ROWS-3; i++){
		for(let j = 0; j < COLS; j++){
			if(checkLine(boardTable.rows[i].cells[j], boardTable.rows[i+1].cells[j], boardTable.rows[i+2].cells[j], boardTable.rows[i+3].cells[j])){
				finished = true;
				victoryDance();
			}
		}
	}
	//check diagonal win
}

function victoryDance(){
	let str = "Hooray! ";
	if(turns%2 == 0){
		str += "player 1 ";
	} else {
		str += "player 0 ";
	}
	str+= "has won the game! It took " + turns + " turns."
	textDiv.innerHTML += str;
}

makeBoard();