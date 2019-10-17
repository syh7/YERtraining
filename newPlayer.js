
let firstNameInput = document.getElementById("firstNameInput");
let lastNameInput = document.getElementById("lastNameInput");
let dateOfBirthInput = document.getElementById("dateOfBirthInput");
let playerLevelInput = document.getElementById("playerLevelInput");

function saveNewPlayer(){
    let players = [];
    if(localStorage.players){
        players = JSON.parse(localStorage.getItem("players"));
    }

    let player = {};
    player.firstName = firstNameInput.value;
    player.lastName = lastNameInput.value;
    player.dateOfBirth = dateOfBirthInput.value;
    player.playerLevel = playerLevelInput.value;

    players.push(JSON.stringify(player));
    localStorage.setItem("players", players);

    console.log(players);
}