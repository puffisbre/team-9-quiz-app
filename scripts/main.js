const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const keepScore = document.getElementById("keepScore");
const highScore = document.getElementById("highScore");
const resultScore = document.getElementById("resultScore");
const highScoreBtn = document.getElementById("highScoreBtn");
const modalContainer = document.getElementById("modalContainer");
const highScoreParent = document.getElementById("highScoreParent");
// const resetStore = document.getElementById("resetLocal");
const stopWatch = document.querySelector(".stopwatch");
const resultTime = document.querySelector(".resultTime");
const infoContainer = document.querySelector(".info-container");



let currentQuestionIndex = 0;
let questions = {};
const answersArray = [];
let score = 0;
let totalTime = 90;
let timeResult = 0;
let gameStart = false;
let newInterval = null;






highScore.style.color = "white";
highScore.style.listStyle = "none";
resultScore.style.listStyle = "none";
infoContainer.style.display = "none";

const removeQuiz = () => {
  keepScore.style.visibility = "hidden";
  quizProgress.style.visibility = "hidden";
  questionContainer.style.display = "none";
  answerContainer.style.display = "none";
};
removeQuiz();

const startAgain = () => {
  startButton.style.display = "flex";
  startScreen.style.display = "flex";
  infoContainer.style.display = "none";
  resultScore.innerHTML = "";
 
};



startButton.addEventListener("click", function () {
  startButton.style.display = "none";
  startScreen.style.display = "none";
  keepScore.style.visibility = "visible";
  quizProgress.style.visibility = "visible";
  questionContainer.style.display = "block";
  answerContainer.style.display = "grid";
  newInterval = setInterval(timer, 1000);
  modalContainer.classList.remove("show");
});

function renderResult() {
  const inputField = document.createElement("input");
  const addScorebutton = document.createElement("button");

  inputField.type = "text";
  inputField.placeholder = "Your name here plz!";
  inputField.id = "inputName";
  inputField.name = "inputName";
  addScorebutton.textContent = "Save score";

  addScorebutton.addEventListener("click", addHighScore);

  result.classList.add("active");
  resetButton.classList.add("active");
  const correct = questions.filter((q, i) => {
    return q.correctAnswer === answersArray[i];
  });



  highScoreParent.innerHTML = "";

  result.innerHTML = `
  <h1>${correct.length} / ${questions.length}</h1>
  `;
  resetButton.innerHTML = `<button class="resetTheButton"> Play again </button>`;

  resetButton.addEventListener("click", () => {
    highScoreParent.innerHTML = "";
    score = 0;
    console.log("klick");
    currentQuestionIndex = 0;
    answersArray.length = 0;
    handleQuestion(currentQuestionIndex);
    resetButton.classList.remove("active");
    result.classList.remove("active");
    console.clear();
    startAgain();
  
    
    
  });
  stopTimer();
  resultTime.innerHTML = `Time left: ${totalTime}s`;
  stopWatch.style.display = "none";
  totalTime = 90;
  highScoreParent.appendChild(inputField);
  highScoreParent.appendChild(addScorebutton);
  infoContainer.style.display = "flex";
}

function handleQuestion(index) {
  keepScore.innerHTML = `<div id="keepScore">Score ${score}</div>`;
  quizProgress.innerHTML = "";
  questions.forEach((question) => {
    quizProgress.innerHTML += "<span></span>";
  });

  const colorSpan = () => {
    let spans = document.querySelectorAll("span")

    for (let i = 0; i <= index; i++) {
      const span = spans[i]; 
  
      if (answersArray[i] === questions[i].correctAnswer) {
        span.classList.add("correct");
      
      } else if (answersArray[i])  {
        span.classList.add("fail"); 
       
    }else {
        span.classList.add("seen")
      }
     }
    }
  
// let spans = document.querySelectorAll("span")
//   for (let i = 0; i <= index; i++) {
//     const span = spans[i]; 

//     if (answersArray[i] === questions[i].correctAnswer) {
//       span.classList.add("correct");
    
//     }  else if (answersArray[i])  {
//       span.classList.add("fail");
     
//     } else {
      
//       span.classList.add("seen")
//     }
//    }


  // topic/question
  questionContainer.innerHTML = `
    <div>
      <p>${questions[index].topic}</p>
      <p>${questions[index].question}</p>
    </div>
      `;

  // answers
  answerContainer.innerHTML = "";
  questions[index].possibleAnswers.forEach((answer) => {
    answerContainer.innerHTML += `<button id="answerBtn">${answer}</button>`;
  });
  colorSpan()
  let answers = document.querySelectorAll("#answerBtn");
  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      answersArray.push(e.target.textContent);
      if (e.target.textContent === questions[index].correctAnswer) {
        score++;
        console.log("correct");
        answer.classList.add("right");
      } else {
        answer.classList.add("wrong");
        
      }
      if (currentQuestionIndex === questions.length - 1) {
        currentQuestionIndex = 0;
      } else {
        currentQuestionIndex++;
      }
      
      if (questions.length - 1 !== index) {
        // answer.disabled = true;
        setTimeout(() => {
          handleQuestion(currentQuestionIndex);
        }, 1_000);
      } else if (true) {
        removeQuiz();
        setTimeout(() => {
          renderResult();
        }, "500");
      }
    });
  });
}

const addHighScore = () => {
  let uniqueKey = "id" + Math.random().toString(16).slice(2);
  let playerName = document.getElementById("inputName");
  let valueArray = [];
  //let sortAscending = valueArray.sort((a,b) => a.score - b.score);
  if (playerName.value != "") {
    valueArray[0] = `Player name: ${playerName.value}`;
    valueArray[1] = `Score: ${score}`;
    highScore.innerHTML = "";
    highScoreParent.innerHTML = "";
    let newString = JSON.stringify(valueArray)
      .replace(/[ [ () "-]/g, " ")
      .replace("]", " ");
    localStorage.setItem(uniqueKey, newString);
    for (const item in localStorage) {
      if (localStorage.hasOwnProperty(item)) {
        const li = document.createElement("li");
        li.textContent = localStorage.getItem(item);
        highScore.appendChild(li);
        resultScore.appendChild(li);
      }
    }
  } else {
    alert("Please type a name!");
  }
};
const seeHighScore = () => {
  // highScore.innerHTML = "";
  // highScoreParent.innerHTML = "";
  for (const item in localStorage) {
    if (localStorage.hasOwnProperty(item)) {
      const li = document.createElement("li");
      li.textContent = localStorage.getItem(item);
      highScore.appendChild(li);
    }
  }
};

const clearLoc = () => {
  localStorage.clear();
  highScore.innerHTML = "";
};
// resetStore.addEventListener("click", clearLoc);

function timer() {
  if (totalTime > 0) {
    totalTime--;
    stopWatch.innerHTML = "Time left: " + totalTime.toString() + "s";
  } else {
    removeQuiz();
    stopWatch.innerHTML = "";
    setTimeout(() => {
      renderResult();
    }, "500");
  }
}

function stopTimer() {
  clearInterval(newInterval);
}

fetch("../json/index.json") // api for the get request
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    handleQuestion(currentQuestionIndex);
  });

console.log(questions);

function openModal() {
  seeHighScore();
  modalContainer.classList.add("show");
}

function closeModal() {
  modalContainer.classList.remove("show");
}

function closeContainer(event) {
  if (event.target === modalContainer) {
    closeModal();
  }
}

highScoreBtn.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeContainer);
