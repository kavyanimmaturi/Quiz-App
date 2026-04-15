const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text: "Paris", correct: true},
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Madrid", correct: false}
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Mars", correct: false},
            {text: "Saturn", correct: false}
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "H2O", correct: true},
            {text: "O2", correct: false},
            {text: "CO2", correct: false},
            {text: "NaCl", correct: false}
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            {text: "Mount Everest", correct: true},
            {text: "K2", correct: false},
            {text: "Kangchenjunga", correct: false},
            {text: "Lhotse", correct: false}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Leonardo da Vinci", correct: true},
            {text: "Pablo Picasso", correct: false},
            {text: "Vincent van Gogh", correct: false},
            {text: "Claude Monet", correct: false}
        ]
    },
    {
        question: "What is the smallest prime number?",
        answers: [
            {text: "1", correct: false},
            {text: "2", correct: true},
            {text: "3", correct: false},
            {text: "5", correct: false}
        ]
    },
    {
        question: "What is the largest mammal?",
        answers: [
            {text: "Elephant", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Giraffe", correct: false},
            {text: "Hippopotamus", correct: false}
        ]
    },
    {
        question: "What is the currency of Japan?",
        answers: [
            {text: "Yen", correct: true},
            {text: "Dollar", correct: false},
            {text: "Euro", correct: false},
            {text: "Pound", correct: false}
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +  ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
       
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
         button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
   
    if(score > 7){
        questionElement.innerHTML += " Excellent work!";
    } else if(score > 4){
        questionElement.innerHTML += " Good job!";
    } else{
        questionElement.innerHTML += " Better luck next time!";
    }
     nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
       handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();