
const ROWS = 6;
const COLS = 7;

let winDiv = document.getElementById("windiv");
let textDiv = document.getElementById("text");
let boardTable = document.getElementById("boardtable");
let p0NameSpan = document.getElementById("p0NameSpan");
let p0WinSpan = document.getElementById("p0WinSpan");
let p1NameSpan = document.getElementById("p1NameSpan");
let p1WinSpan = document.getElementById("p1WinSpan");
let turns = 0;
let finished = false;
let player0 = {};
let player1 = {};

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
	
	let colIndex = getColumnIndexFromCell(cell);
	let rowIndex = getLowestEmptyCell(colIndex);

	let lowestCell = boardTable.rows[rowIndex].cells[colIndex];

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
				gameWon(boardTable.rows[i].cells[j]);
				return;
			}
		}
	}

	//check vertical win
	for(let i = 0; i < ROWS-3; i++){
		for(let j = 0; j < COLS; j++){
			if(checkLine(boardTable.rows[i].cells[j], boardTable.rows[i+1].cells[j], boardTable.rows[i+2].cells[j], boardTable.rows[i+3].cells[j])){
				gameWon(boardTable.rows[i].cells[j]);
				return;
			}
		}
	}

	//check diagonal win
	for(let i = 0; i < ROWS-3; i++){
		for(let j = 0; j < COLS-3; j++){
			if(checkLine(boardTable.rows[i].cells[j], boardTable.rows[i+1].cells[j+1], boardTable.rows[i+2].cells[j+2], boardTable.rows[i+3].cells[j+3])){
				gameWon(boardTable.rows[i].cells[j]);
				return;
			}
		}
	}
	for(let i = ROWS-3; i < ROWS; i++){
		for(let j = 0; j < COLS-3; j++){
			if(checkLine(boardTable.rows[i].cells[j], boardTable.rows[i-1].cells[j+1], boardTable.rows[i-2].cells[j+2], boardTable.rows[i-3].cells[j+3])){
				gameWon(boardTable.rows[i].cells[j]);
				return;
			}
		}
	}

	//If entire board is filled, even if no one won.
	if(turns == ROWS*COLS){
		finished = true;
		textDiv.innerHTML += "Oh no, looks like no one won. Better luck next time!"
	}
}

function resetLocalStorage(){
	let bool = confirm("Are you absolutely sure you want to delete saved games?");
	if(bool){
		localStorage.removeItem("p0JSON");
		localStorage.removeItem("p1JSON");
	}
	updateWinsDiv();
}

function resetGame(){
	let reset = confirm("Are you sure you want to reset the game?");
	if(reset){
		for(let i = 0; i < ROWS; i++){
			for(let j = 0; j < COLS; j++){
				boardTable.rows[i].cells[j].classList.replace("player0", "empty");
				boardTable.rows[i].cells[j].classList.replace("player1", "empty");
			}
		}
		finished = false;
		turns = 0;
		textDiv.innerHTML += "Reset the game. <br>";
	}
}

function victoryDance(){
	let str = "Hooray! ";
	if(turns%2 == 0){
		str += player1.name;
	} else {
		str += player0.name;
	}
	str+= " has won the game! It took " + turns + " turns. <br>"
	textDiv.innerHTML += str;
}

function gameWon(cell){
	finished = true;
	victoryDance();
	if(cell.classList.contains("player0")){
		player0.wins++;
	} else {
		player1.wins++;
	}
	updateLocalStorage();
	updateWinsDiv();
}

function changeName(nr){
	if(nr==0){
		let newName = prompt("What do you want the new name of " + player0 + " to be?");
		if(newName != null && newName != ""){
			player0.name = newName;
			updateLocalStorage();
			updateWinsDiv();
		} else {
			textDiv.innerHTML += "New name was cancelled.";
		}
	} else {
		let newName = prompt("What do you want the new name of " + player1 + " to be?");
		if(newName != null && newName != ""){
			player1.name = newName;
			updateLocalStorage();
			updateWinsDiv();
		} else {
			textDiv.innerHTML += "New name was cancelled.";
		}
	}
}

function updateWinsDiv(){
	p0NameSpan.innerHTML = "<b>" + player0.name + "</b>. Wins: ";
	p0WinSpan.innerHTML = player0.wins + "<br>";
	p1NameSpan.innerHTML = "<b>" + player1.name + "</b>. Wins: ";
	p1WinSpan.innerHTML = player1.wins + "<br>";
}

function updateLocalStorage(){
	localStorage.setItem("p0JSON", JSON.stringify(player0));
	localStorage.setItem("p1JSON", JSON.stringify(player1));
}

function pregame(){
	document.getElementById("resetGameButton").onclick = function(){
		resetGame();
	};
	document.getElementById("removeLocalStorageButton").onclick = function(){
		resetLocalStorage();
	};
	document.getElementById("nameButton0").onclick = function(){
		changeName(0);
	};
	document.getElementById("nameButton1").onclick = function(){
		changeName(1);
	};

	if(localStorage.p0JSON){
		player0 = JSON.parse(localStorage.getItem("p0JSON"));
		player1 = JSON.parse(localStorage.getItem("p1JSON"));
	} else {
		player0.name = "player 0";
		player0.wins = 0;
		player1.name = "player 1";
		player1.wins = 0;
	}

	makeBoard();
	updateWinsDiv();
}

pregame();