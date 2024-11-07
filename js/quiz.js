// quiz questions
let questAns = {
    quests: [
        "Complétez la phrase :Je ___ à la maison",
         "Quel est l'article correct pour 'chat' ?",
         "Comment dit-on 'Good morning' en français ?",
         'Choisissez le bon pronom : "Marie et ___ partons demain."',
         'Complétez la phrase : "Il est huit heures ___."',
         "Traduisez 'I like apples':",
         "Complétez : Si j'avais de l'argent, je ___ en voyage.",
         "Quel mot est correct ? C'est un ___ important pour le projet.",
         "Complétez la phrase : Il pleut ___ nous restons à l'intérieur.",
         "Quel est le synonyme de 'rapide' ?"
    ],
    answers: [
        ["a) va", "b) vais","c) vont"],
        ["a) La","b) Les","c) Le"],
        ["a) Bonsoir","b) Bonjour","c) Bonne nuit"],
        ["a) moi","b) je","c) nous"],
        ["a) et demie","b) du soir","c) de soir"],
        ["a) J’aime des pommes","b) J’aime les pommes","c) Je mange des pommes"],
        ["a) vais","b) irai","c) irais"],
        ["a) sujet","b) sujette","c) sujété"],
        ["a) et","b) donc","c) mais"],
        ["a) lent","b) vite ","c) tard"]
],
    correct: [1,2,1,0,0,1,2,0,1,1]
};

// i let this global cause i gonna ue it to store it in local storage
// start quiz
document.addEventListener("DOMContentLoaded",()=>{
    // variables
    let htmlQuest = document.querySelector(".quest-quest");
    let htmlAnswers = document.querySelectorAll(".reponse");
    let next = document.querySelector(".suivant");
    let num=0;
    let score = document.querySelector(".score-counter");
    let calQest = document.querySelector(".quest-num");
let correctAns = 0;
    let clicked = false;
    let counter = 19;
    let htmlCounter = document.querySelector(".counter");
    let interval;
    let back = document.querySelector(".back");
    // asynchrones function to show quest after click on suivant
    async function showQuests(index){
        counter = 20;
        htmlQuest.textContent = questAns.quests[index];
        htmlAnswers.forEach((ansHtml,ansIndex)=>{
            ansHtml.textContent = questAns.answers[index][ansIndex];
            ansHtml.style.backgroundColor = "#004BAC";
        })
        score.innerHTML = `${correctAns}/15`;
        calQest.innerHTML = `Question ${num+1}/10`;
        clearInterval(interval);
        localStorage.setItem("totalScore",correctAns);
        // wait till suivant/ question complete and switch to nex quest
        await ansChosed();

    }
    // function clicked answer and check if it correct...
    function ansChosed(){
      return  new Promise((resolve) => {
            htmlAnswers.forEach((ans,ansIndex)=>{{
                // remove the old clicks
                ans.removeEventListener("click",()=>{});
                // make this chages when click the answer
                ans.addEventListener("click",()=>{
                    // check if clicked is false to skip getting multiple correct answs
                   if (clicked == false){
        clearInterval(interval);
                    // ans.style.backgroundColor = "#ddd";
                    // check if the answer is correct
                    if (ansIndex == questAns.correct[num]){
                        ans.style.backgroundColor = "green";
                        correctAns++;
                    } else{
                        ans.style.backgroundColor = "red";
                        htmlAnswers[questAns.correct[num]].style.backgroundColor = "green";
                    }
                    // get clicked to true to not click the answer another time
                    clicked = true;
                    next.style.cursor = "pointer";
                    next.style.backgroundColor = "#004BAC";
                   }
                })
            }})
            // get clicked to false to can answer to the next question and disable suivant button
            clicked= false;
            next.style.cursor = "no-drop";
            next.style.backgroundColor = "#ddd";
            // counter to go to the next question if the time  is out
             interval = setInterval(()=>{
                htmlCounter.textContent = `${counter} Sec`;
                counter--;
                if (counter < 0){
                    counter = 19;
                    resolve();
                }
            },1000);
            // go the next question
            next.addEventListener("click",()=>{
                // achieve the promise to go to the next question
                if (clicked == true) {
                    resolve();
                }
            })
        })
    }
    // show questions
    // function to start the quiz and show question one by one
       async function start(){
        while(num < questAns.quests.length){
            await showQuests(num);
                 num++;
                //  show fin page
                if (num == questAns.quests.length -1){
                    next.textContent = "See Result";
                    next.style.cursor = "pointer";
                    next.style.backgroundColor = "#004BAC";
                    next.addEventListener("click",()=>{
                        window.location.href = "../fin.html";
                    })
                }
             }
       }
       start();
})
