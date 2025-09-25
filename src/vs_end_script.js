const sco = document.querySelector('.score');
let score = sessionStorage.getItem("reachedPoints");
sco.innerHTML = "Score: "+ score;