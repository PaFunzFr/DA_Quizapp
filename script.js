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
        <div class="card-body">
            <h5 class="card-title">${questions[index].question}</h5>
            ${renderAnswers(index)}
            <div class="question-footer mt-2">
                <div><b>1</b> von <b id="questionCountRef">${questions.length}</b> Fragen</div>
                <button type="button" class="btn btn-primary float-end" onclick="nextQuestion(${index})">Nächste Frage</button>
            </div>
        </div>
    </div>
    `
}

function renderAnswers(index) {
    let innerHTML = "";
    for (let i = 0; i < questions[index].answerOptions.length; i++) {
        innerHTML +=
        `
        <div class="card mb-2">
            <div class="card-body">
                ${questions[index].answerOptions[i].answer}
            </div>
        </div> `;
    }
    return innerHTML;
}