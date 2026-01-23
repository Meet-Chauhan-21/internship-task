let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissor = document.getElementById("scissor");
let you_result = document.getElementById("you-result");
let computer_result = document.getElementById("computer-result");

let user_result = 0;
let com_result = 0;

const computerChoice = () => {
  let choice = ["rock", "paper", "scissor"];
  let index = Math.floor(Math.random() * 3);
  return choice[index];
};

const check = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    let mess = document.getElementById("dis_message");
    mess.innerHTML = `Match Drow because your choice ${userChoice} and computer choice ${computerChoice}`;
    mess.style.backgroundColor = "black";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissor" && computerChoice === "paper")
  ) {
    user_result++;
    document.getElementById("you-result").innerHTML = user_result;
    let mess = document.getElementById("dis_message");
    mess.innerHTML = `you win because your choice ${userChoice} and computer choice ${computerChoice}`;
    mess.style.backgroundColor = "green";
  } else {
    com_result++;
    document.getElementById("computer-result").innerHTML = com_result;
    let mess = document.getElementById("dis_message");
    mess.innerHTML = `you lost because your choice ${userChoice} and computer choice ${computerChoice}`;
    mess.style.backgroundColor = "red";
  }
};

rock.addEventListener("click", () => {
  let userChoice = "rock";
  let computer = computerChoice();
  check(userChoice, computer);
});
paper.addEventListener("click", () => {
  let userChoice = "paper";
  let computer = computerChoice();
  check(userChoice, computer);
});
scissor.addEventListener("click", () => {
  let userChoice = "scissor";
  let computer = computerChoice();
  check(userChoice, computer);
});
