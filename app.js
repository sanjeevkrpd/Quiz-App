
const questions  = [
    {
        question: "Q. which is the national bird of india?",
        answers : [
            {text : "peacock" ,correct: true},
            {text : "girrafe" ,correct: false},
            {text : "tiger" ,correct: false},
            {text : "lion" ,correct: false}
        ]
    },
    {
        question: "Q. which is the national animal of india?",
        answers : [
            {text : "peacock" ,correct: false},
            {text : "girrafe" ,correct: false},
            {text : "tiger" ,correct: true},
            {text : "lion" ,correct: false}
        ]
    },
    {
        question: "Q. which is the national flower of india?",
        answers : [
            {text : "lotus" ,correct: true},
            {text : "rose" ,correct: false},
            {text : "jasmine" ,correct: false},
            {text : "marigold" ,correct: false}
        ]
    },
];


const question = document.getElementById("question");
const answerbutton = document.getElementById("answer-button");
const next = document.getElementById("next");


let currentQuestionIndex = 0;
let score = 0 ;

function startQuiz(){

    currentQuestionIndex = 0;
    score  = 0; 

    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questioNo = currentQuestionIndex + 1;
    question.innerHTML = questioNo + ". " + currentQuestion.question;

    resetState();
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    next.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

 function selectAnswer(e){
    const selectedBtn = e.target;
    const  isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button=>{

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    next.style.display = "block";
 }

 function showScore(){
            resetState();
        
        question.innerHTML = `You Scored ${score} out of ${questions.length} !`;

        next.innerHTML= "Play Again";
        next.style.display = "block";
 }

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

 next.addEventListener("click",()=>{

    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

 });

 startQuiz();