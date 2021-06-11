var currentDie;
var diceTotal = 0;
var diceNmod;
const ws = new WebSocket("wss://dicewebsocket.glitch.me/:3000");
var threeHourCount = 0;

ws.addEventListener("open", function () {
    document.getElementById("roll-button").addEventListener("click", rollDice);
    setTimeout(beginTimeOutCount(), 50000);
    });

ws.addEventListener("message", function (event) {
    diceSet = event.data;
    diceSet = JSON.parse(diceSet);
    console.log(diceSet);

    const dice = [...document.querySelectorAll(".die-list")];
    setTimeout(showValue, 2000);
    var i = 0;
    dice.forEach((die) => {
        toggleClasses(die);
        console.log(diceSet[i])
        die.dataset.roll = diceSet[i];
        if (diceSet[i] == 1 || diceSet[i] == 2) currentDie = -1;
        else if (diceSet[i] == 3 || diceSet[i] == 4) currentDie = 0;
        else if (diceSet[i] == 5 || diceSet[i] == 6) currentDie = 1;
        i++;
        diceTotal = diceTotal + currentDie;
    });
    i = 1;
    const Value = document.querySelector("#SelectMod").value;
    const chosenSkill = document.querySelector("#SelectSkill").value;
    console.log(chosenSkill);
    var modVal = parseInt(Value, 10);
    var skillCheck = chosenSkill;
    diceNmod = diceTotal + modVal;
    document.getElementById("displayMod").innerHTML = diceNmod;
    document.getElementById("displaySkill").innerHTML = skillCheck;

    document.getElementById("displayMod").style.display = "none";

    diceTotal = 0;




    }
);

function rollDice() {
    console.log("attempting to send roll now");
    ws.send("roll");

}


function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

/*function intDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    setTimeout(showValue, 2000);
    dice.forEach((die) => {
        toggleClasses(die);
        var i = 0;
        die.dataset.roll = diceSet[i];
        if (diceSet[i] == 1 || diceSet[i] == 2) currentDie = -1;
        else if (diceSet[i] == 3 || diceSet[i] == 4) currentDie = 0;
        else if (diceSet[i] == 5 || diceSet[i] == 6) currentDie = 1;
        i++;
        diceTotal = diceTotal + currentDie;
  });
    i = 1;
  const Value = document.querySelector("#SelectMod").value;
  const chosenSkill = document.querySelector("#SelectSkill").value;
  console.log(chosenSkill);
  var modVal = parseInt(Value, 10);
  var skillCheck = chosenSkill;
  diceNmod = diceTotal + modVal;
  document.getElementById("displayMod").innerHTML = diceNmod;
  document.getElementById("displaySkill").innerHTML = skillCheck;

  document.getElementById("displayMod").style.display = "none";

  diceTotal = 0;
}

*/

function beginTimeOutCount() {
    setInterval(preventTimeOut(), 150000);
}

function preventTimeOut() {
    threeHourCount++;
    if (threeHourCount < 72) {
        ws.send("stayinAlive");
    }
    console.log("ping #" + threeHourCount + "of 72");
}

function showValue() {
  document.getElementById("displayMod").style.display = "inline-block";
}

//document.getElementById("roll-button").addEventListener("click", rollDice);
