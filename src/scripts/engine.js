const state = {
    views: {
       squares: document.querySelectorAll(".square"),
       enemy: document.querySelector(".enemy"),
       timeLeft: document.querySelector("#time-left"),
       score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.currentTime--;
    state.views.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime === 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert(`Game Over!!! O seu resultado foi: ${state.values.result}`);
    }
}

function playSound() {
    let audio = new Audio("./src/sounds/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.views.squares.forEach((sqr) => {
        sqr.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSqr = state.views.squares[randomNumber];
    randomSqr.classList.add("enemy");
    state.values.hitPosition = randomSqr.id;
}

function addListenerHitBox() {
    state.views.squares.forEach((sqr) => {
        sqr.addEventListener("mousedown", () => {
            if(sqr.id === state.values.hitPosition) {
                state.values.result++;
                state.views.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    })
}

function init() {
    addListenerHitBox();
}

init();