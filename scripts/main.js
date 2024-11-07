const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const keepScore = document.getElementById("keepScore")

let currentQuestionIndex = 0;
let questions = {};
const answersArray = [];
let score = 0;

const removeQuiz = () => {
  keepScore.style.visibility = "hidden"
  quizProgress.style.visibility = "hidden";
  questionContainer.style.visibility = "hidden";
  answerContainer.style.visibility = "hidden";
  score = 0;
};
removeQuiz();

const startAgain = () => {
  startButton.style.display = "flex";
  startScreen.style.display = "flex";
  
};
 
startButton.addEventListener("click", function () {
  startButton.style.display = "none";
  startScreen.style.display = "none";
  keepScore.style.visibility = "visible"
  quizProgress.style.visibility = "visible";
  questionContainer.style.visibility = "visible";
  answerContainer.style.visibility = "visible";
  
});

// function showScore (){
// if (q.correctAnswer === answersArray[i]){
//   score++;
// }
//   keepScore.innerHTML = `<div>"score"</div>`
// }

// showScore ()
function renderResult() {
  result.classList.add("active");
  resetButton.classList.add("active");
  const correct = questions.filter((q, i) => {
    return q.correctAnswer === answersArray[i];
    
  });

  //keepScore.innerHTML = `<div>${score}</div>`

  result.innerHTML = `
  <h1>${correct.length} av ${questions.length}</h1>
  `;
  resetButton.innerHTML = `<button class="resetTheButton"> Play again </button>`;

  resetButton.addEventListener("click", () => {
    console.log("klick");
    handleQuestion(currentQuestionIndex);
    resetButton.classList.remove("active");
    result.classList.remove("active");
    
    
    console.clear();
    startAgain();
    
    currentQuestionIndex = 0;
    answersArray.length = 0;
  });
}

function handleQuestion(index) {
  keepScore.innerHTML = `<div id="keepScore">Score ${score}</div>`
  quizProgress.innerHTML = "";
  questions.forEach((question) => {
    quizProgress.innerHTML += "<span></span>";
  });
  let spans = document.querySelectorAll("span");
  for (let i = 0; i <= index; i++) {
    spans[i].classList.add("seen");
  }

  // topic/question
  questionContainer.innerHTML = `
    <p>${questions[index].topic}</p>
    <p>${questions[index].question}</p>
    `;

  // answers
  answerContainer.innerHTML = "";
  questions[index].possibleAnswers.forEach((answer) => {
    answerContainer.innerHTML += `<button>${answer}</button>`;
  });
  let answers = document.querySelectorAll("button");
  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      answersArray.push(e.target.textContent);
      if (e.target.textContent === questions[index].correctAnswer) {
        score++;
        console.log("correct");
      }
      if (currentQuestionIndex === questions.length - 1) {
        currentQuestionIndex = 0;
      } else {
        currentQuestionIndex++;
      }
      if (questions.length - 1 !== index) {
        handleQuestion(currentQuestionIndex);
      } else if (true) {
        removeQuiz();
        setTimeout(() => {
          renderResult();
        }, "500");
      }
    });
  });
}

fetch("../json/index.json") // api for the get request
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    handleQuestion(currentQuestionIndex);
  });

  console.log(questions)