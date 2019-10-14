
const ROWS = 6;
const COLS = 7;

let boardDiv = document.getElementById("boarddiv");
let boardTable = document.getElementById("boardtable");
let rowArray = [];
let clickedCell;
let hoveredCell;

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
				mouseOverCell(this)
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
	
}

function mouseOverCell(cell){
	console.log("hovering");
	hoveredCell = cell;
	let index = -1;
	
	//get column number in row
	for(let i = 0; i < cell.parentElement.childElementCount; i++){
		if(cell === cell.parentElement.children[i]){
			index = i;
			break;
		}
	}

	for(let i = 0; i < ROWS; i++){
		for(let j = 0; j < COLS; j++){
			rowArray[i].children[j].style.backgroundColor = "white";
		}
	}

	for(let i = 0; i < ROWS; i++){
		rowArray[i].children[index].style.backgroundColor = "gray";
	}

}

function gameFinished(){
	console.log("function: gameFinished");
}

function clickButton(){
	alert();
}

makeBoard();