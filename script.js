 
const quizData = [
  {
      question: "Grand Central Terminal, Park Avenue, New York is the world's",
      a: "largest railway station",
      b: "highest railway station",
      c: "longest railway station",
      d: "none of the above",
      correct: "a",
  },
  {
      question: "Entomology is the science that studies",
      a: "behaviour of human being",
      b: "insects",
      c: "The origin and history of technical and scientific terms",
      d: "the formation of rocks",
      correct: "b",
  },
  {
      question: "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
      a: "Asia",
      b: "Africa",
      c: "Europe",
      d: "Australia",
      correct: "b",
  },
  {
      question: "Garampani sanctuary is located at",
      a: "Junagarh, Gujarat",
      b: "Diphu,Assam",
      c: "Kohima,Nagaland",
      d: "none of the above",
      correct: "b",
  },
];
const quiz= document.getElementById("right");
const ques = document.getElementById("ques")
const answer = document.querySelectorAll(".answer");
const a_opt = document.getElementById("a_opt");
const b_opt = document.getElementById("b_opt");
const c_opt = document.getElementById("c_opt");
const d_opt = document.getElementById("d_opt");
const btn = document.getElementById("btn");
let currentquiz=0;
let score=0;
let timer=60;
loadquiz();
startTimer();
function startTimer() {
  const timerElement = document.getElementById("timer");
  const countdown = setInterval(function() {
      timerElement.innerText = timer;
      
      
      if (timer <= 0) {
          currentquiz++;
          if (currentquiz < quizData.length) {
              clearInterval(countdown);
              loadquiz();
              startTimer(timer=60);
          } else {
            
              quiz.innerHTML = `
                  <h2>you have achieved ${score}/16 marks.</h2><br><br>
                  
                  <button onclick="location.reload()" style= "width:'100%'">Reload</button>
              `;
          }
      }
      timer--;
      }, 1000);
}

var storedInput = localStorage.getItem("name");
function loadquiz(){
  deselectAnswers();
  const currentquizdata = quizData[currentquiz];
  ques.innerHTML = currentquizdata.question;
  a_opt.innerHTML = currentquizdata.a;
  b_opt.innerHTML = currentquizdata.b;
  c_opt.innerHTML = currentquizdata.c;
  d_opt.innerHTML = currentquizdata.d;
  
}

function getSelected() {
  let selectedAnswer = undefined;

  answer.forEach((answerEl) => {
      if (answerEl.checked) {
          selectedAnswer = answerEl.id;
      }
  });

  return selectedAnswer;
}

function deselectAnswers() {
  answer.forEach((answerEl) => {
      answerEl.checked = false;
  });
}
skip.addEventListener("click",()=> {
  if (currentquiz < quizData.length) {
      currentquiz++;
     loadquiz();
  }else{
      quiz.innerHTML = `
      <h2>You have achieved ${score}/16 marks.</h2><br><br>
      
      <button onclick="location.reload()" style= "width:'100%'">Reload</button>
  `;
  }
}
);
next.addEventListener("click", () => {
  // check to see the answer
   const selectedAnswer = getSelected();

  if (selectedAnswer) {
      if (selectedAnswer === quizData[currentquiz].correct) {
          score+=4;
      }else{
          score--;
      }

      currentquiz++;
      if (currentquiz < quizData.length) {
      
          loadquiz();
      } else {
        
          quiz.innerHTML = `
              <h2>you have achieved ${score}/16 marks.</h2><br><br>
              
              <button onclick="location.reload()" style= "width:'100%'">Reload</button>
          `;
      }
  }
});