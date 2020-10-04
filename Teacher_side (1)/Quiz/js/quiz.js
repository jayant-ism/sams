window.onload = function () {
  show(0);
};

let questions = [
  {
    id: 1,
    question: "Here will come the question",
    answer: "True",
    options: ["True", "False", "None", "I am mad"],
  },
  {
    id: 1,
    question: "Here will come second question",
    answer: "True",
    options: ["True", "False", "None", "I am mad"],
  },
  {
    id: 1,
    question: "Here will come third question",
    answer: "True",
    options: ["True", "False", "None", "I am mad"],
  },
  {
    id: 1,
    question: "Here will come fourth question",
    answer: "True",
    options: ["True", "False", "None", "I am mad"],
  },
];

function startQuiz(e) {
  e.preventDefault();
  let name = document.forms["welcome_form"]["fname"].value;
  let addmissionNo = document.forms["welcome_form"]["faddno"].value;
  sessionStorage.setItem("name", name);

  location.href = "questions.html";
}

let ques_count = 0;
let score = 0;
function next() {
  let userAnswer = document.querySelector("li.option.active").innerHTML;
  if (userAnswer === questions[ques_count].answer && userAnswer != null) {
    score += 2;
    sessionStorage.setItem("point", score);
  }
  if (ques_count == questions.length - 1) {
    location.href = "end.html";
    return;
  }

  ques_count++;
  show(ques_count);
}

function show(count) {
  let question = document.getElementById("questions");

  question.innerHTML = `
  <h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="options_group ">
              <li class="option">${questions[count].options[0]}</li>
              <li class="option">${questions[count].options[1]}</li>
              <li class="option">${questions[count].options[2]}</li>
              <li class="option">${questions[count].options[3]}</li>
            </ul>
            
            `;

  toggleActive();
}

function toggleActive() {
  let option = document.querySelectorAll("li.option");

  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function () {
      for (let j = 0; j < option.length; j++) {
        if (option[j].classList.contains("active")) {
          option[j].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}
