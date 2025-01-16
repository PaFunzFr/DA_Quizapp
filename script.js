let answerChosen = false;
let rightAnswers = 0;

let currentPage = 0;
function renderInit() {
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
            <div class="card-body" onclick="checkAnswer(event, ${index}, ${i})">
                ${questions[index].answerOptions[i].answer}
            </div>
        </div> `;
    }
    return innerHTML;
}


function checkAnswer(event, index, i) {
    if (answerChosen) {
        return
    } else {
        answerChosen = true;
        document.getElementById("btn-nxt").disabled = false;
        if (questions[index].answerOptions[i].rightAnswer) {
            showRightAnswer(index);
            rightAnswers ++
        } else {
            event.target.style.backgroundColor = "red";
            showRightAnswer(index);
        }
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
    console.log(currentPage);
    index++;
    if (index < questions.length) {
        renderSingleAnswer(index);
    } else {
        document.getElementById('mainSection').innerHTML = `
            <h1 class="text-white">Quiz beendet!</h1>
            <p class="text-white">Du hast ${rightAnswers} von ${questions.length} Fragen richtig beantwortet!`;
    }
}
