const submitButton = document.getElementById("add-players");
const zimoButton = document.getElementById("zi-mo");
const chiButton = document.getElementById("chi");
const pongButton = document.getElementById("pong");
const inputN = document.querySelectorAll(".inputName");
const amountInput = document.getElementById("dollars");
const loserSelect = document.getElementById("loser-name");
const winSelect = document.getElementById("winner-name");
let amount = amountInput.value;
let loser;
let history;
let losers = [];
let loser_names = [];
let winner;
let winMethod;
let winner_name;
let lost;
let who_owes = [];

const scores = {
    "p1": 0,
    "p2": 0,
    "p3": 0,
    "p4": 0
};

const owed = {
    "p1":[0, 0, 0, 0],
    "p2":[0, 0, 0, 0],
    "p3":[0, 0, 0, 0],
    "p4":[0, 0, 0, 0]
}
loserSelect.addEventListener("change", function() {
    loser = loserSelect.value; 
    if(loser == "l1"){
        lost = loser_names[0];
    }else if(loser == "l2"){
        lost = loser_names[1];
    }else if(loser == "l3"){
        lost = loser_names[2];
    }else{
        lost = "(No Loser Selected)";
    }
});



amountInput.addEventListener("input", function() {
    amount = amountInput.value;
    
});

submitButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    addNames();
});

function addNames() {
    const option1 = document.querySelector(`option[value="p1"]`);
    option1.textContent = inputN[0].value;
    const option2 = document.querySelector(`option[value="p2"]`);
    option2.innerText = inputN[1].value;
    const option3 = document.querySelector(`option[value="p3"]`);
    option3.innerText = inputN[2].value;
    const option4 = document.querySelector(`option[value="p4"]`);
    option4.innerText = inputN[3].value;
}


const selectElement = document.getElementById("winner-name");
selectElement.addEventListener("change", function(event){
    winner = selectElement.value;
    winner_player = document.querySelector(`option[value="${winner}"]`);
    winner_name = winner_player.innerText;
    
    loser_names = [];
    losers = [];
    
    for(const inp of inputN){
        if(winner_player.innerText != inp.value && inp.value != ""){
            loser_names.push(inp.value);
            losers.push(inp.id);
        }
    }
    
    const loption1 = document.querySelector('option[value="l1"]')
    loption1.innerText = loser_names[0] || ""; 
    const loption2 = document.querySelector('option[value="l2"]')
    loption2.innerText = loser_names[1] || ""; 
    const loption3 = document.querySelector('option[value="l3"]')
    loption3.innerText = loser_names[2] || ""; 
});


document.addEventListener("click", function(event) {
    if (event.target.matches("#zi-mo")) {
        event.preventDefault();     
        winMethod = "zi mo";
        zimo(winner);
    }else if(event.target.matches("#chi")){
        event.preventDefault();
        winMethod = "chi";
        chi(winner, loser);
    }else if(event.target.matches("#pong")){
        event.preventDefault();
        winMethod = "pong";
        pong(winner, loser);
    }
});


function zimo(w){
    let index;
    if(w == "p1"){
        index = 0;
    }else if(w == "p2"){
        index = 1;
    }else if(w == "p3"){
        index = 2;
    }else{
        index = 3;
    }
    scores[w] += (losers.length * parseInt(amount));
    for(const l of losers){
        scores[l] -= parseInt(amount);
        owed[l][index] -= parseInt(amount);
    }    
    history = `${winner_name} won by zi mo against ${loser_names}\n\n`;
    update();
}

function chi(w, l){
    let index;
    if(w == "p1"){
        index = 0;
    }else if(w == "p2"){
        index = 1;
    }else if(w == "p3"){
        index = 2;
    }else{
        index = 3;
    }
    scores[w] += parseInt(amount);
    let lol = loser_names.indexOf(lost);
    let l_index = losers[lol];
    scores[l_index] -= parseInt(amount);
    owed[l_index][index] -= parseInt(amount);
    history = `${winner_name} won by chi from ${lost}\n\n`;
    update();
}

function pong(w, l){
    let index;
    if(w == "p1"){
        index = 0;
    }else if(w == "p2"){
        index = 1;
    }else if(w == "p3"){
        index = 2;
    }else{
        index = 3;
    }
    scores[w] += parseInt(amount);
    let lol = loser_names.indexOf(lost);
    let l_index = losers[lol];
    scores[l_index] -= parseInt(amount);
    owed[l_index][index] -= parseInt(amount);
    history = `${winner_name} won by pong from ${lost}\n\n`;
    update();
}

function update(){
    const p1s = document.getElementById("p1_score");
    p1s.innerText = `${inputN[0].value}: ${scores["p1"]}`;
    const p2s = document.getElementById("p2_score");
    p2s.innerText = `${inputN[1].value}: ${scores["p2"]}`;
    const p3s = document.getElementById("p3_score");
    p3s.innerText = `${inputN[2].value}: ${scores["p3"]}`;
    const p4s = document.getElementById("p4_score");
    p4s.innerText = `${inputN[3].value}: ${scores["p4"]}`;
    const p1t = document.getElementById("p1_transfer");
    p1t.innerText = getmoney("p1");
    const p2t = document.getElementById("p2_transfer");
    p2t.innerText = getmoney("p2");
    const p3t = document.getElementById("p3_transfer");
    p3t.innerText = getmoney("p3");
    const p4t = document.getElementById("p4_transfer");
    p4t.innerText = getmoney("p4");
    const hhh = document.getElementById("h");
    hhh.innerText += history;

    
}

function getmoney(p){
    const p_array = owed[p];
    let state = [];
    for(let i = 0; i < p_array.length; i++){
        if(p_array[i] < 0){
            state.push(`give ${inputN[i].value} $${Math.abs(p_array[i])}\n`);
        }
    }
    return state;
}

