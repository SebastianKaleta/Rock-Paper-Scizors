const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = [...document.querySelectorAll('.game__select .game__image')];

//Pierwsza funkcja
function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px red';
}

//Funkcja wyboru ai
function aiChoise() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;

    return aiHand;
}


//Funkcja sprawdzająca wybór
function checkResult(player, ai) {
    if (player === ai) {
        return "draw"
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "win"
    } else {
        return "lose";
    }
}

//Publikacja wyniku

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your__choice"]').textContent = player;
    document.querySelector('[data-summary="ai__choice"]').textContent = ai;

    document.querySelector('.panel__numbers .panel__span').textContent = ++gameSummary.numbers;

    if (result === "win") {
        document.querySelector('.panel__wins .panel__span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who__win"]').textContent = "Wygrałeś!";
        document.querySelector('[data-summary="who__win"]').style.color = "green";
        resultGame();
    } else if (result === "lose") {
        document.querySelector('.panel__losses .panel__span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who__win"]').textContent = "Przegrałeś ;(";
        document.querySelector('[data-summary="who__win"]').style.color = "red";
        resultGame();
    } else {
        document.querySelector('.panel__draws .panel__span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who__win"]').textContent = "Remis :\\";
        document.querySelector('[data-summary="who__win"]').style.color = "gray";
        resultGame();
    }

}

// wyświetlenie wyniku
function btnResultGame() {
    document.querySelector('.game__start--result').style.display = "none";
    document.querySelector('.game__result').style.display = "none";
}

function resultGame() {
    document.querySelector('.game__start--result').style.display = "block";
    document.querySelector('.game__result').style.display = "block";
}


function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";
}

//funkcja sterująca
function startGame() {
    if (!game.playerHand) return alert("Wybierz dłoń!!")

    game.aiHand = aiChoise();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult)
    endGame()
}



hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.game__start').addEventListener('click', startGame)
document.querySelector('.game__start--result').addEventListener('click', btnResultGame)