
const ROWS = 6;
const COLS = 7;

let boardDiv = document.getElementById("boarddiv");
let boardTable = document.getElementById("boardtable");

function makeBoard(){
	for(let i = 0; i < ROWS; i++){
		let tr = document.createElement("tr");
		for(let j = 0; j < COLS; j++){
			let td = document.createElement("td");
			td.classList.add("empty");
			tr.appendChild(td);
		}
		boardTable.appendChild(tr);
	}
}


function clickColumn(col){
	console.log("function: clickColumn");
}

function gameFinished(){
	console.log("function: gameFinished");
}

function clickButton(){
	alert();
}

makeBoard();