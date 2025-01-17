let answerChosen = false;
let rightAnswers = 0;
let successAudio = new Audio('./assets/snd/success.mp3');
let errorAudio = new Audio('./assets/snd/error.mp3');
let resultAudio = new Audio('./assets/snd/result.mp3');

let currentPage = 0;
function renderInit() {
    rightAnswers = 0;
    currentPage = 0;
    renderSingleAnswer(0);
}

function getAllAnswers() {
    for (let i = 0; i < questions.length; i++) {
        renderSingleAnswer(i);
    }
} 

function renderSingleAnswer(index) {
    document.getElementById('mainSection').innerHTML = "";
    document.getElementById("mainSection").innerHTML += 
    `
    <div class="card card-container" id="questionCard${index}">
        <img src="./assets/img/03_quiz/quiz-pic.jpg" class="card-img-top" alt="...">
        <div class="progress mt-2 mx-2">
            <div class="progress-bar" role="progressbar" style="width: ${Math.round(currentPage / questions.length * 100)}%" aria-valuenow="${Math.round(currentPage / questions.length * 100)}" aria-valuemin="0" aria-valuemax="100">${Math.round(currentPage / questions.length * 100)}%</div>
        </div>
        <div class="card-body">
            <h5 class="card-title">${questions[index].question}</h5>
            ${renderAnswers(index)}
            <div class="question-footer mt-2">
                <div><b>${questions.indexOf(questions[index]) + 1}</b> von <b id="questionCountRef">${questions.length}</b> Fragen</div>
                <button type="button" class="btn btn-primary float-end" id="btn-nxt" onclick="nextQuestion(${index})" disabled>Nächste Frage</button>
            </div>
        </div>
    </div>
    `
}

function renderAnswers(index) {
    let innerHTML = "";
    for (let i = 0; i < questions[index].answerOptions.length; i++) {
        innerHTML += `
        <div class="card mb-2 single-answer" id="answer${index}${i}">
            <div class="card-body" onclick="selectedAnswer(event, ${index}, ${i})">
                ${questions[index].answerOptions[i].answer}
            </div>
        </div> `;
    }
    return innerHTML;
}


function selectedAnswer(event, index, i) {
    if (answerChosen) {
        return
    } else {
        answerChosen = true;
        document.getElementById("btn-nxt").disabled = false;
        checkAnswer(event, index, i);
    }
}

function checkAnswer(event, index, i) {
    if (questions[index].answerOptions[i].rightAnswer) {
        successAudio.play();
        showRightAnswer(index);
        rightAnswers ++
    } else {
        errorAudio.play();
        event.target.style.backgroundColor = "red";
        showRightAnswer(index);
    }
}

// check all entries of rightAnswer and do sth if rightAnswer = true
function showRightAnswer(index) {
for (let j = 0; j < questions[index].answerOptions.length; j++) {
        if (questions[index].answerOptions[j].rightAnswer) {
            document.getElementById(`answer${index}${j}`).style.backgroundColor = "green";
        }
    }
}

function nextQuestion(index) {
    answerChosen = false;
    currentPage ++;
    index++;
    if (index < questions.length) {
        renderSingleAnswer(index);
    } else {
        resultAudio.play();
        renderEndScreen();
    }
}

function renderEndScreen() {
    document.getElementById('mainSection').innerHTML = `
            <h1 class="text-white">Quiz beendet!</h1>
            <div class="progress my-2 mx-2">
                <div class="progress-bar" role="progressbar" style="width: 280px" aria-valuenow="${Math.round(currentPage / questions.length * 100)}" aria-valuemin="0" aria-valuemax="100">${Math.round(currentPage / questions.length * 100)}%</div>
            </div>
            <p class="text-white text-center">${rightAnswers} von ${questions.length} Fragen<br>wurden richtig beantwortet!</p>
            <button type="button" class="btn btn-primary float-end" onclick="renderInit()">Spiele erneut</button>`;
}