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
    correct: [1,2,1,0,0,1,2,0,1,1],
    selected: []
};
// show diffrent auestion every time
for (let i = 0; i < questAns.quests.length;i++){
    // shuffle quests
        let rendomPlace = Math.floor(Math.random()*questAns.quests.length);
        // shuffle quests
        let tempQuest = questAns.quests[i];
        questAns.quests[i] = questAns.quests[rendomPlace];
        questAns.quests[rendomPlace] = tempQuest;
        // shuffle quest answers
        let tempAns = questAns.answers[i];
        questAns.answers[i] = questAns.answers[rendomPlace];
        questAns.answers[rendomPlace] = tempAns;
        // shuffle quest correct
        let tempCorrect = questAns.correct[i];
        questAns.correct[i] = questAns.correct[rendomPlace];
        questAns.correct[rendomPlace] = tempCorrect;
}
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
    // asynchrones function to show quest after click on suivant
    async function showQuests(index){
        counter = 20;
        // show questt and answers
        htmlQuest.textContent = questAns.quests[index];
        htmlAnswers.forEach((ansHtml,ansIndex)=>{
            ansHtml.textContent = questAns.answers[index][ansIndex];
            ansHtml.style.backgroundColor = "#004BAC";
        })
        // update the score and question number
        score.innerHTML = `${correctAns}/10`;
        calQest.innerHTML = `Question ${num+1}/10`;
        // clear the inteval to start the counter again
        clearInterval(interval);
        // set the new total score to loca storage
        localStorage.setItem("totalScore",correctAns);
        // wait till suivant/ question complete and switch to nex quests;
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
                        // add the selected answer to selected in object
                        questAns.selected.push(ansIndex);
                    } else{
                        ans.style.backgroundColor = "red";
                        htmlAnswers[questAns.correct[num]].style.backgroundColor = "green";
                        // add the selected answer to selected in object
                        questAns.selected.push(ansIndex);
                    }
                    // add the selected answer to the local storage
                    localStorage.setItem("allQuests",JSON.stringify(questAns));
                    console.log(JSON.parse(localStorage.getItem("allQuests")));
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
                    clicked = true;
                    clearInterval(interval);
                    htmlAnswers[questAns.correct[num]].style.backgroundColor = "green";
                    next.style.cursor = "pointer";
                    next.style.backgroundColor = "#004BAC";
                    if (questAns.selected[num] == undefined || questAns.selected[num == null]) {
                        questAns.selected[num] = -1;
                    }
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
                        window.location.href = "./fin.html";
                    })
                }
             }
       }
       start();
})
