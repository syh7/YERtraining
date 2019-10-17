
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
    if(firstNameInput.value == ""){
        alert("First name cannot be empty.");
        return;
    } else if(lastNameInput.value == ""){
        alert("Last name cannot be empty.");
        return;
    } else if(dateOfBirthInput.value == ""){
        alert("Date of birth must be entered.");
        return;
    } else {
        player.firstName = firstNameInput.value;
        player.lastName = lastNameInput.value;
        player.dateOfBirth = dateOfBirthInput.value;
        player.playerLevel = playerLevelInput.value;

        players.push(JSON.stringify(player));
        localStorage.setItem("players", players);

        console.log(players);
    }
}