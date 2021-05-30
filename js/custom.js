showQuestions();

async function showQuestions() {

    try {
            let response = await fetch('https://api.jsonbin.io/b/608e6a2a8a409667ca02ef20');
            let data = await response.json(); 


const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const btnResult = document.getElementById('btn-result');
const btnClose = document.getElementById('btn-close');
const btnResultPopUp = document.querySelector('.btn-result-popUp');
const sectionInputName = document.querySelector('.section-input-name');
const sectionQuiz = document.querySelector('.section-quiz');
const inputName = document.querySelector('.input-name');
const btnInputName = document.querySelector('.btn-input-name');
const timer = document.querySelector('.timer');
const popUp = document.querySelector('.popUp');
const sectionResult = document.querySelector('.section-result');
const sectionResultName = document.querySelector('.section-result-name');
const sectionResultPoints = document.querySelector('.section-result-points');
const sectionResultTextTimeoff = document.querySelector('.section-result-text-timeoff');


let nameUser = 'Элвис Пресли';
let preResult = 15;
let localResults = {};

inputName.addEventListener('change', () => {
    nameUser = inputName.value;
    calcResult();
})

btnInputName.addEventListener('click', (event) => {
    if (event.target) {
        sectionInputName.classList.remove('active-block');
        sectionQuiz.classList.add('active-block');
        timer.style.visibility = 'visible';
        timerShow();
    } 
})

const renderQuestions = (index) => { 
    renderIndicator(index + 1);
    questions.dataset.currentStep = index;
    const renderAnawers = () => data[index].answers
    .map((answer) => `
                <label><li>
                <input class="answer-input" type="radio" name=${index} value=${answer.id}>${answer.value}
                </li></label>
    `)
    .join('');
    questions.innerHTML = `    
                <div class="quiz-questions-item">
                        <div class="quiz-questions-item-question">${data[index].questions}</div>
                        <ul class="quiz-questions-item-answers">${renderAnawers()}</ul>
                </div>
    `;
};

const renderResults = () => {
    let content = '';
    const getClassname = (answer, questionIndex) => {
        let classname = '';
        if (!answer.correct && answer.id == localResults[questionIndex]) { 
            classname = 'answer--invalid';
            preResult--;
            calcResult(preResult);   
        } else if (answer.correct) { 
            classname = 'answer--valid'; 
            calcResult(preResult);
        }
        return classname;
    };  
    
    const getAnswers = (questionIndex) => data[questionIndex].answers 
      .map((answer) => `<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
      .join('');
    
    data.forEach((question, index) => { 
        content +=  `
                <div class="quiz-results-item">
                        <div class="quiz-results-item-question">${question.questions}</div> 
                        <ul class="quiz-results-item-answers">${getAnswers(index)}</ul>
                </div>
        `;
    });

    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${data.length}`;
};

quiz.addEventListener('change', (event) => { 
    if (event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => { 
    if (event.target.classList.contains('btn-next')) { 
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;
        clearInterval(intervalId);
        timerShow();
        document.body.style.backgroundImage = `url(source/img/${Math.floor((Math.random()*39)+1)}.jpg)`; 
        
        if (data.length === nextQuestionIndex) {  
                timer.style.visibility = 'hidden';
                clearInterval(intervalId);
                questions.classList.add('questions--hidden'); 
                indicator.classList.add('indicator--hidden'); 
                results.classList.add('indicator--visible'); 
                btnNext.classList.add('btn-next--hidden'); 
                btnRestart.classList.add('btn-restart--visible'); 
                btnResult.classList.add('btn-restart--visible');
                document.body.style.backgroundImage = 'url(source/img/background/imgFinish.jpg)';
                sectionQuiz.style.backgroundColor = '#0013f842';
                sectionQuiz.style.borderColor = '#0013f842';
                renderResults();
            } else {
                renderQuestions(nextQuestionIndex); 
            }
            btnNext.disabled = true;
    }

    if (event.target.classList.contains('btn-restart')) {
        let localResults = {}; 
        results.innerHTML = ''; 
        preResult = 15;
        timer.style.visibility = 'visible';
        sectionQuiz.style.backgroundColor = '#808080ad';
        sectionQuiz.style.borderColor = '#808080ad';
        questions.classList.remove('questions--hidden');  
        indicator.classList.remove('indicator--hidden'); 
        results.classList.remove('indicator--visible'); 
        btnNext.classList.remove('btn-next--hidden'); 
        btnRestart.classList.remove('btn-restart--visible'); 
        btnResult.classList.remove('btn-restart--visible');
        timerShow();
        renderQuestions(0);
    }

    if (event.target.classList.contains('btn-result')) {
        sectionQuiz.classList.remove('active-block');
        sectionResult.classList.add('active-block');
        timer.style.visibility = 'hidden';
    }
});

renderQuestions(0);

btnClose.addEventListener('click', () => {
    window.location.reload();
});

function calcResult(result) {
    let finishResult = result;
    sectionResultPoints.innerHTML = finishResult;
    sectionResultName.innerHTML = nameUser;
}

let intervalId;
function timerShow () {
    const timerShowValue = document.querySelector('.timer-show-value');
    const popUp = document.querySelector('.popUp');
    let count = 30; 
    intervalId = setInterval(() => {
        count--;
        timerShowValue.innerHTML = count;
        if (count <= 15) {
            timerShowValue.style.color = 'yellow';
        }
        if (count <= 5) {
            timerShowValue.style.color = 'red';
        }
        if (count <= 0) {
            clearInterval(intervalId);
            popUp.style.display = 'block';
            let darkLayer = document.createElement('div');
            darkLayer.classList = 'shadow';
            document.body.appendChild(darkLayer);
        }
    }, 1000);
}

btnResultPopUp.addEventListener('click', (event)=> {
    if (event.target) {
        popUp.style.display="none";
        document.querySelector('.shadow').remove();
        sectionQuiz.classList.remove('active-block');
        sectionResult.classList.add('active-block');
        timer.style.visibility = 'hidden';
        sectionResultTextTimeoff.innerHTML = 'К сожалению, время закончилось :( Попробуйте еще!';
        sectionResultPoints.innerHTML = '0';
        } 
});
   
    }   catch(err) {
            console.log('Ошибка загрузки вопросов из удаленного сервера!');
            alert('По техническим причинам викторина не работает. Зайдите, пожалуйста, позже!');
            window.close();
    }
}




